import type { MetadataRoute } from "next";
import { site } from "@/lib/seo/site";

/** What no crawler should fetch: the server's endpoints and the admin. */
const disallow = ["/api/", "/admin/"];
/** Crawlers named so their access is stated, not assumed; each keeps the same closed doors as everyone else. */
const named = ["OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

/**
 * A crawler that finds a group for its own name ignores the `*` group, so each
 * named group repeats the disallows. On a Vercel preview or development
 * deployment nothing may be crawled (docs/seo/strategy.md §7.2); next.config.ts
 * also sends `X-Robots-Tag: noindex` there.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, ...named.map((userAgent) => ({ userAgent, allow: "/", disallow }))],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
