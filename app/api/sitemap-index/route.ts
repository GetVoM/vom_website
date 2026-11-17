import { site } from "@/lib/seo/site";
import { sitemapIds } from "@/app/sitemap";

/**
 * The sitemap index, served at /sitemap.xml (a rewrite in next.config.ts): one address that names the five sitemaps app/sitemap.ts
 * builds (/sitemap/pages.xml and the rest). This is the address in robots.txt
 * and the one to submit in Search Console.
 */
export function GET() {
  const entries = sitemapIds.map((id) => `  <sitemap><loc>${site.url}/sitemap/${id}.xml</loc></sitemap>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
