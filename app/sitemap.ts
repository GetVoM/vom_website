import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n/config";
import { site } from "@/lib/seo/site";

/**
 * Only the homepage exists on the new site today. The content layer will add
 * every row of docs/content/url-map.csv marked "keep" as pages come online.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-25");
  return [
    {
      url: `${site.url}${localePath("ar", "/")}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ar: `${site.url}${localePath("ar", "/")}`,
          en: `${site.url}${localePath("en", "/")}`,
          "x-default": `${site.url}${localePath("ar", "/")}`,
        },
      },
    },
    {
      url: `${site.url}${localePath("en", "/")}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${site.url}${localePath("ar", "/")}`,
          en: `${site.url}${localePath("en", "/")}`,
          "x-default": `${site.url}${localePath("ar", "/")}`,
        },
      },
    },
  ];
}
