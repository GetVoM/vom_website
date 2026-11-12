"use server";

import { headers } from "next/headers";
import { attributionKeys } from "./attribution";
import { recordLead } from "./record";
import { leadForms, type LeadForm, type LeadFormDefinition } from "./forms";

export interface LeadState {
  ok: boolean;
  message: string;
  /** Names of the fields that need fixing. */
  fields?: string[];
}

const messages = {
  ar: {
    ok: "وصلتنا رسالتك، وسنتواصل معك قريباً.",
    invalid: "راجع الحقول المحددة ثم أرسل من جديد.",
    turnstile: "تعذّر التحقق من أنك لست برنامجاً آلياً. حدّث الصفحة وحاول مرة أخرى.",
    unavailable: "تعذّر إرسال رسالتك الآن. حاول بعد قليل، أو راسلنا على واتساب.",
  },
  en: {
    ok: "We have your message and will be in touch soon.",
    invalid: "Check the marked fields and send again.",
    turnstile: "We could not confirm you are not a bot. Refresh the page and try again.",
    unavailable: "We could not send your message just now. Try again shortly, or reach us on WhatsApp.",
  },
};


/**
 * The one server action every lead form posts to:
 *
 *   const [state, action] = useActionState(submitLead.bind(null, "contact"), null);
 *
 * The form sends its fields (the shared ones and its `payloadFields`), a hidden
 * `locale` and `page_path`, any `utm_*`, `gclid` and `fbclid` fields, and the
 * Turnstile widget's `cf-turnstile-response` (components/forms/Turnstile.tsx).
 * The work is in lib/leads/record.ts.
 */
export async function submitLead(form: LeadForm, _previous: LeadState | null, data: FormData): Promise<LeadState> {
  const locale = data.get("locale") === "en" ? "en" : "ar";
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
  };
  const request = await headers();
  const extra = Object.keys((leadForms[form] as LeadFormDefinition).payloadFields ?? {});
  const payload = Object.fromEntries(extra.map((name) => [name, text(name)]));
  const outcome = await recordLead(
    form,
    {
      name: text("name"),
      email: text("email"),
      phone: text("phone"),
      company: text("company"),
      message: text("message"),
      ...(extra.length > 0 && { payload }),
    },
    {
      token: text("cf-turnstile-response") ?? null,
      ip: request.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      locale,
      pagePath: text("page_path") ?? null,
      utm: Object.fromEntries(attributionKeys.flatMap((name) => (text(name) ? [[name, text(name)!.slice(0, 200)]] : []))),
      userAgent: request.get("user-agent"),
    },
  );
  if (outcome.ok) return { ok: true, message: messages[locale].ok };
  return { ok: false, message: messages[locale][outcome.reason], fields: outcome.fields };
}
