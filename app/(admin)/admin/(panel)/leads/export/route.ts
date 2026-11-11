import { assertAdmin } from "@/lib/admin/auth";
import { leadsQuery } from "@/lib/admin/leads";

/** Cells that start like a formula are prefixed, so a spreadsheet shows them as text. */
const cell = (value: unknown) => {
  const text = value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
};

const COLUMNS = ["created_at", "form", "name", "email", "phone", "company", "message", "locale", "page_path", "utm", "payload", "user_agent"] as const;

/** The leads list as a CSV file, with the same filters as the page. Admins only. */
export async function GET(request: Request) {
  let supabase;
  try {
    ({ supabase } = await assertAdmin());
  } catch {
    return new Response("Not authorised", { status: 401 });
  }
  const params = new URL(request.url).searchParams;
  const { data, error } = await leadsQuery(supabase, {
    form: params.get("form") ?? undefined,
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
  }).limit(10000);
  if (error) return new Response(error.message, { status: 500 });
  const lines = [COLUMNS.join(","), ...data.map((lead) => COLUMNS.map((column) => cell(lead[column])).join(","))];
  // The byte-order mark makes Excel read the Arabic as UTF-8.
  return new Response(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="vom-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
