import type { MetadataRoute } from "next";
import { site } from "@/lib/seo/site";
import { sitemapIds } from "./sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: sitemapIds.map((id) => `${site.url}/sitemap/${id}.xml`),
    host: site.url,
  };
}
