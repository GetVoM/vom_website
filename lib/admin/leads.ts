import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/lib/supabase/types";
import { isLeadForm, leadForms, type LeadFormDefinition, type SharedField } from "@/lib/leads/forms";

export interface LeadFilters {
  form?: string;
  from?: string;
  to?: string;
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** The chosen days as timestamps, Riyadh time; a malformed day is ignored. */
function dayBounds({ from, to }: LeadFilters) {
  return {
    start: from && DAY.test(from) ? `${from}T00:00:00+03:00` : null,
    end: to && DAY.test(to) ? `${to}T23:59:59.999+03:00` : null,
  };
}

/** Leads, newest first, filtered by form and by day (Riyadh time), for the list and the CSV export. */
export function leadsQuery(supabase: SupabaseClient<Database>, filters: LeadFilters) {
  const { start, end } = dayBounds(filters);
  let query = supabase.from("leads").select("*", { count: "exact" }).order("created_at", { ascending: false });
  if (filters.form) query = query.eq("form", filters.form);
  if (start) query = query.gte("created_at", start);
  if (end) query = query.lte("created_at", end);
  return query;
}

/**
 * The forms to filter by, each with its number of leads in the chosen days:
 * every form in lib/leads/forms.ts (so a new form shows before its first lead),
 * then any other name found in the table.
 */
export async function leadFormCounts(supabase: SupabaseClient<Database>, filters: LeadFilters) {
  const { start, end } = dayBounds(filters);
  let query = supabase.from("leads").select("form");
  if (start) query = query.gte("created_at", start);
  if (end) query = query.lte("created_at", end);
  const { data, error } = await query.limit(10000);
  if (error) throw new Error(error.message);
  const counts = new Map<string, number>(Object.keys(leadForms).map((name) => [name, 0]));
  for (const { form } of data) counts.set(form, (counts.get(form) ?? 0) + 1);
  return { total: data.length, forms: [...counts].map(([name, count]) => ({ name, count })) };
}

const SHARED: SharedField[] = ["name", "email", "phone", "company", "message"];

/**
 * What a form collects, for the admin's columns: the shared fields it uses and
 * its extra fields with their headings. With no form chosen, every shared field.
 */
export function formShape(form: string | undefined) {
  const definition: LeadFormDefinition | undefined = form && isLeadForm(form) ? leadForms[form] : undefined;
  return {
    shared: SHARED.filter((field) => !definition?.unused?.includes(field)),
    payload: Object.entries(definition?.payloadFields ?? {}),
  };
}

/** The heading of a form's extra field, or its own name when the form does not list it. */
export function payloadLabel(form: string, key: string) {
  const definition: LeadFormDefinition | undefined = isLeadForm(form) ? leadForms[form] : undefined;
  return definition?.payloadFields?.[key] ?? key;
}

/** A jsonb object column (`payload`, `utm`) as plain text pairs. */
export function textRecord(value: Json | null): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => (typeof item === "string" || typeof item === "number" ? [[key, String(item)]] : [])));
}
