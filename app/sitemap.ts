import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n/config";
import { aboutPaths, contactPaths, growthPaths, termsPaths, type PagePair } from "@/lib/i18n/routes";
import { site } from "@/lib/seo/site";

interface SitemapPage {
  pair: PagePair;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: { ar: number; en: number };
}

/**
 * The pages built so far. The content layer will add every row of
 * docs/content/url-map.csv marked "keep" as pages come online.
 */
const pages: SitemapPage[] = [
  {
    pair: { ar: "/", en: "/" },
    lastModified: "2026-10-25",
    changeFrequency: "weekly",
    priority: { ar: 1, en: 0.9 },
  },
  {
    pair: contactPaths,
    lastModified: "2026-11-02",
    changeFrequency: "monthly",
    priority: { ar: 0.5, en: 0.4 },
  },
  {
    pair: aboutPaths,
    lastModified: "2026-11-02",
    changeFrequency: "monthly",
    priority: { ar: 0.5, en: 0.4 },
  },
  {
    pair: termsPaths,
    lastModified: "2026-11-09",
    changeFrequency: "yearly",
    priority: { ar: 0.3, en: 0.2 },
  },
  {
    pair: growthPaths,
    lastModified: "2026-11-10",
    changeFrequency: "monthly",
    priority: { ar: 0.5, en: 0.4 },
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ pair, lastModified, changeFrequency, priority }) => {
    const ar = `${site.url}${localePath("ar", pair.ar)}`;
    const en = `${site.url}${localePath("en", pair.en)}`;
    const languages = { ar, en, "x-default": ar };
    return [
      { url: ar, lastModified: new Date(lastModified), changeFrequency, priority: priority.ar, alternates: { languages } },
      { url: en, lastModified: new Date(lastModified), changeFrequency, priority: priority.en, alternates: { languages } },
    ];
  });
}
