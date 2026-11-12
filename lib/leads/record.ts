import { SeverityNumber } from "@opentelemetry/api-logs";
import { createClient } from "@supabase/supabase-js";
import { flushPostHogLogs, posthogLogger } from "@/instrumentation";
import { isLeadForm, leadForms, type LeadFields } from "./forms.ts";

/**
 * Saves one lead: validates it against its form's schema, checks the Turnstile
 * token with Cloudflare, inserts the row with the secret key (the public key
 * cannot write to `leads`), then sends the notification email if one is
 * configured. The insert comes first, so an email failure never loses a lead.
 *
 * It fails closed: with no Turnstile secret or no token, nothing is saved.
 */
export type LeadOutcome = { ok: true } | { ok: false; reason: "invalid" | "turnstile" | "unavailable"; fields?: string[] };

export interface LeadContext {
  token: string | null;
  ip?: string | null;
  locale?: "ar" | "en";
  pagePath?: string | null;
  utm?: Record<string, string> | null;
  userAgent?: string | null;
}

async function verifyTurnstile(token: string, ip?: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const result: unknown = await response.json();
    return typeof result === "object" && result !== null && "success" in result && result.success === true;
  } catch {
    return false;
  }
}

async function notify(form: string, lead: Record<string, unknown>) {
  const { RESEND_API_KEY, LEADS_NOTIFY_EMAIL, LEADS_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEADS_NOTIFY_EMAIL || !LEADS_FROM_EMAIL) return;
  const lines = Object.entries(lead)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: LEADS_FROM_EMAIL, to: [LEADS_NOTIFY_EMAIL], subject: `New lead: ${form}`, text: lines.join("\n") }),
    });
    if (!response.ok) console.error(`Lead saved, but the notification email failed (${response.status}).`);
  } catch (error) {
    console.error("Lead saved, but the notification email failed.", error);
  }
}

export async function recordLead(form: string, data: unknown, context: LeadContext): Promise<LeadOutcome> {
  if (!isLeadForm(form)) return { ok: false, reason: "invalid" };
  const parsed = leadForms[form].schema.safeParse(data);
  // A payload field is reported by its own name ("sector"), as the form knows it.
  const fieldOf = (path: PropertyKey[]) => String(path[0] === "payload" && path.length > 1 ? path[1] : path[0]);
  if (!parsed.success) return { ok: false, reason: "invalid", fields: [...new Set(parsed.error.issues.map((issue) => fieldOf(issue.path)))] };

  if (!context.token || !(await verifyTurnstile(context.token, context.ip))) {
    posthogLogger?.emit({
      body: "Lead submission rejected by Turnstile",
      severityNumber: SeverityNumber.WARN,
      attributes: { form, outcome: "turnstile_rejected" },
    });
    await flushPostHogLogs();
    return { ok: false, reason: "turnstile" };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false, reason: "unavailable" };
  const fields: LeadFields = parsed.data;
  const payload = Object.fromEntries(Object.entries(fields.payload ?? {}).filter(([, value]) => value));
  const row = {
    form,
    name: fields.name || null,
    email: fields.email || null,
    phone: fields.phone || null,
    company: fields.company || null,
    message: fields.message || null,
    payload: Object.keys(payload).length > 0 ? payload : null,
    locale: context.locale ?? null,
    page_path: context.pagePath?.slice(0, 500) ?? null,
    utm: context.utm && Object.keys(context.utm).length > 0 ? context.utm : null,
    user_agent: context.userAgent?.slice(0, 500) ?? null,
  };
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await db.from("leads").insert(row);
  if (error) {
    console.error("Could not save a lead:", error.message);
    posthogLogger?.emit({
      body: "Lead submission storage failed",
      severityNumber: SeverityNumber.ERROR,
      attributes: { form, outcome: "storage_unavailable" },
    });
    await flushPostHogLogs();
    return { ok: false, reason: "unavailable" };
  }
  await notify(form, row);
  posthogLogger?.emit({
    body: "Lead submission stored",
    severityNumber: SeverityNumber.INFO,
    attributes: { form, locale: context.locale ?? "unknown", outcome: "stored" },
  });
  await flushPostHogLogs();
  return { ok: true };
}
