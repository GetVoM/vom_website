import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n/config";
import {
  aboutPaths,
  contactPaths,
  growthPaths,
  integrationPaths,
  sectorPaths,
  studentPaths,
  termsPaths,
  type PagePair,
} from "@/lib/i18n/routes";
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
  {
    pair: studentPaths,
    lastModified: "2026-11-10",
    changeFrequency: "monthly",
    priority: { ar: 0.5, en: 0.4 },
  },
  ...Object.values(integrationPaths).map(
    (pair): SitemapPage => ({
      pair,
      lastModified: "2026-11-10",
      changeFrequency: "monthly",
      priority: { ar: 0.5, en: 0.4 },
    }),
  ),
  // The vertical landing pages rank above the company pages.
  ...Object.values(sectorPaths).map(
    (pair): SitemapPage => ({
      pair,
      lastModified: "2026-11-10",
      changeFrequency: "monthly",
      priority: { ar: 0.6, en: 0.5 },
    }),
  ),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ pair, lastModified, changeFrequency, priority }) => {
    // Arabic paths are percent-encoded, as the sitemap protocol asks.
    const ar = encodeURI(`${site.url}${localePath("ar", pair.ar)}`);
    const en = encodeURI(`${site.url}${localePath("en", pair.en)}`);
    const languages = { ar, en, "x-default": ar };
    return [
      { url: ar, lastModified: new Date(lastModified), changeFrequency, priority: priority.ar, alternates: { languages } },
      { url: en, lastModified: new Date(lastModified), changeFrequency, priority: priority.en, alternates: { languages } },
    ];
  });
}
