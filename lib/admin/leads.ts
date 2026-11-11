import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export interface LeadFilters {
  form?: string;
  from?: string;
  to?: string;
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Leads, newest first, filtered by form and by day (Riyadh time), for the list and the CSV export. */
export function leadsQuery(supabase: SupabaseClient<Database>, { form, from, to }: LeadFilters) {
  let query = supabase.from("leads").select("*", { count: "exact" }).order("created_at", { ascending: false });
  if (form) query = query.eq("form", form);
  if (from && DAY.test(from)) query = query.gte("created_at", `${from}T00:00:00+03:00`);
  if (to && DAY.test(to)) query = query.lte("created_at", `${to}T23:59:59.999+03:00`);
  return query;
}
