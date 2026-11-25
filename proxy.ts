import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Two jobs, each on its own matcher entry (`config.matcher`).
 *
 * 1. Old image-optimizer addresses. From launch (2026-11-24) until images became
 *    static files (2026-11-25), every page image was /_next/image/?url=<image>&w=..;
 *    the optimizer is now off (next.config.ts) and Next answers those with a 404
 *    before any redirect in next.config.ts runs. An address a search engine kept is
 *    sent here to the image itself: a file in public/, or a blog image on the media
 *    domain. Nothing else is followed, so this is no open redirect.
 *
 * 2. Keeps an admin's Supabase session fresh. It runs only for requests that carry
 * the `vom_admin` cookie, which signing in sets (see `config.matcher`), so the
 * public never passes through it and public pages stay static. It does not
 * guard anything: every admin page and action checks the session and the
 * `admins` list itself on the server (lib/admin/auth.ts), and sends anyone
 * else to the login page.
 *
 * The matcher has to be a constant, so it cannot name the admin's address,
 * which ADMIN_PATH can change; the address is checked here instead.
 */
const configured = (process.env.ADMIN_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");
const ADMIN_BASE = `/${/^[a-z0-9][a-z0-9-]{1,62}$/.test(configured) ? configured : "admin"}`;
const MEDIA_URL = (process.env.MEDIA_BASE_URL || "https://media.getvom.com").replace(/\/$/, "");

function oldImageAddress(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url") ?? "";
  // A path on this site (not "//host", which a browser would read as another site), or the media domain.
  const local = target.startsWith("/") && !target.startsWith("//") && !target.startsWith("/\\");
  if (local) return NextResponse.redirect(new URL(target, request.nextUrl.origin), 301);
  if (target.startsWith(`${MEDIA_URL}/`)) return NextResponse.redirect(target, 301);
  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/_next/image" || pathname === "/_next/image/") return oldImageAddress(request);
  if (pathname !== ADMIN_BASE && !pathname.startsWith(`${ADMIN_BASE}/`)) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => {
        for (const { name, value } of cookies) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookies) response.cookies.set(name, value, options);
      },
    },
  });
  // Reading the claims refreshes an expired session and writes the new cookies.
  await supabase.auth.getClaims();
  return response;
}

export const config = {
  matcher: [
    "/_next/image",
    {
      source: "/((?!_next/|api/|.*\\..*).*)",
      has: [{ type: "cookie", key: "vom_admin" }],
    },
  ],
};
