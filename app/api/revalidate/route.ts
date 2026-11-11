import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

/**
 * Revalidates cached content by tag, for scripts (the WordPress import, a
 * manual fix in the database). The admin's own save and publish actions do not
 * need it.
 *
 *   curl -X POST https://getvom.com/api/revalidate \
 *     -H "Authorization: Bearer $REVALIDATE_SECRET" \
 *     -H "Content-Type: application/json" -d '{"tags":["posts","categories"]}'
 *
 * Tags: posts, post-<id>, categories, category-<id>, authors (lib/content/posts).
 */
const TAG = /^(posts|categories|authors|post-[0-9a-f-]{36}|category-[0-9a-f-]{36})$/;

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(secret ?? "");
  if (!secret || a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body: unknown = await request.json().catch(() => null);
  const tags = body && typeof body === "object" && "tags" in body && Array.isArray(body.tags) ? body.tags : null;
  if (!tags || tags.length === 0 || tags.length > 50 || !tags.every((tag): tag is string => typeof tag === "string" && TAG.test(tag))) {
    return Response.json({ error: "Send {\"tags\": [...]} with known tags" }, { status: 400 });
  }
  for (const tag of tags) revalidateTag(tag, "max");
  return Response.json({ revalidated: tags });
}
