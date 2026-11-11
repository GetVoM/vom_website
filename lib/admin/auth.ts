import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { serverSupabase } from "@/lib/supabase/server";
import { adminHref } from "./path";

/**
 * The signed-in user, if they are on the `admins` list; otherwise null. Row
 * level security lets only an admin read that list, so a row coming back is the
 * proof. `getClaims()` verifies the session token's signature against the
 * project's public keys, without a round trip to Supabase on every page; the
 * query that follows runs as that user, so a revoked session still fails there.
 */
// Cached for the length of one request: the layout and the page both ask.
const currentAdmin = cache(async () => {
  const supabase = await serverSupabase();
  const { data: session } = await supabase.auth.getClaims();
  const userId = session?.claims.sub;
  if (!userId) return null;
  const { data } = await supabase.from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  return data ? { supabase, userId } : null;
});

/** For admin pages: sends anyone who is not an admin to the login page. */
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect(adminHref("login/?denied=1"));
  return admin;
}

/** For server actions and route handlers: throws for anyone who is not an admin. */
export async function assertAdmin() {
  const admin = await currentAdmin();
  if (!admin) throw new Error("Not authorised");
  return admin;
}
