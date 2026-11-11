/**
 * Where the admin is served. The route folder is always app/(admin)/admin, but
 * the public address is /admin only by default: set ADMIN_PATH (a private
 * variable, one path segment of letters, digits and hyphens) and the admin
 * answers at /<ADMIN_PATH>/ instead, while /admin/ returns a 404
 * (next.config.ts rewrites). The value is read on the server and handed to
 * client components through AdminBaseProvider, so it is never a NEXT_PUBLIC_
 * variable.
 */
const configured = (process.env.ADMIN_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");

export const ADMIN_SEGMENT = /^[a-z0-9][a-z0-9-]{1,62}$/.test(configured) ? configured : "admin";
export const ADMIN_BASE = `/${ADMIN_SEGMENT}`;

/** An admin address: `adminHref("posts/")` is `/admin/posts/` by default. */
export function adminHref(path = ""): string {
  return `${ADMIN_BASE}/${path.replace(/^\/+/, "")}`;
}
