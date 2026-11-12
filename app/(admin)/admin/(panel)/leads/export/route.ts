import { assertAdmin } from "@/lib/admin/auth";
import { formShape, leadsQuery, textRecord } from "@/lib/admin/leads";
import { attributionKeys } from "@/lib/leads/attribution";
import type { Tables } from "@/lib/supabase/types";

/** Cells that start like a formula are prefixed, so a spreadsheet shows them as text. */
const cell = (value: unknown) => {
  const text = value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
};

type Lead = Tables<"leads">;
type Column = [heading: string, value: (lead: Lead) => unknown];

const ALL: Column[] = (["created_at", "form", "name", "email", "phone", "company", "message", "locale", "page_path", "utm", "payload", "user_agent"] as const).map((key) => [key, (lead) => lead[key]]);

/**
 * One form's columns: its own fields, then its extra fields and each
 * attribution key in a column of its own, so a spreadsheet can sort by sector
 * or campaign without unpacking JSON.
 */
function formColumns(form: string): Column[] {
  const { shared, payload } = formShape(form);
  return [
    ["created_at", (lead) => lead.created_at],
    ["form", (lead) => lead.form],
    ...shared.map((field): Column => [field, (lead) => lead[field]]),
    ...payload.map(([key]): Column => [key, (lead) => textRecord(lead.payload)[key]]),
    ...attributionKeys.map((key): Column => [key, (lead) => textRecord(lead.utm)[key]]),
    ["locale", (lead) => lead.locale],
    ["page_path", (lead) => lead.page_path],
    ["user_agent", (lead) => lead.user_agent],
  ];
}

/** The leads list as a CSV file, with the same filters as the page. Admins only. */
export async function GET(request: Request) {
  let supabase;
  try {
    ({ supabase } = await assertAdmin());
  } catch {
    return new Response("Not authorised", { status: 401 });
  }
  const params = new URL(request.url).searchParams;
  const form = params.get("form") || undefined;
  const { data, error } = await leadsQuery(supabase, {
    form,
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
  }).limit(10000);
  if (error) return new Response(error.message, { status: 500 });
  const columns = form ? formColumns(form) : ALL;
  const lines = [columns.map(([heading]) => heading).join(","), ...data.map((lead) => columns.map(([, value]) => cell(value(lead))).join(","))];
  // Only ASCII letters, digits and dashes go into the header's file name.
  const name = ["vom-leads", form?.replace(/[^\w-]/g, "")].filter(Boolean).join("-");
  // The byte-order mark makes Excel read the Arabic as UTF-8.
  return new Response(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
