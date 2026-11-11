import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * The Supabase client for the admin: it carries the signed-in user's session
 * from the request's cookies, so row level security sees who is asking. Never
 * use it in the public content layer (cookies cannot be read inside
 * `'use cache'`); that uses lib/supabase/public.ts.
 */
export async function serverSupabase() {
  const store = await cookies();
  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // A Server Component cannot set cookies; proxy.ts refreshes the session instead.
        }
      },
    },
  });
}
