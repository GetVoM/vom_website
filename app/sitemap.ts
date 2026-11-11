import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n/config";
import {
  aboutPaths,
  contactPaths,
  featuresPaths,
  growthPaths,
  integrationPaths,
  invoiceTemplatesPaths,
  pricingPaths,
  sectorPaths,
  studentPaths,
  termsPaths,
  type PagePair,
} from "@/lib/i18n/routes";
import { site } from "@/lib/seo/site";
import { accountingGuide } from "@/lib/content/accounting-guide/copy";
import { guidePath, guides } from "@/lib/content/einvoicing/catalogue";

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
  // Pricing sits just under the homepage: it answers "أسعار ڤوم" and converts.
  {
    pair: pricingPaths,
    lastModified: "2026-11-10",
    changeFrequency: "monthly",
    priority: { ar: 0.8, en: 0.7 },
  },
  // Features is a pillar the homepage, header and sector pages all link to.
  {
    pair: featuresPaths,
    lastModified: "2026-11-10",
    changeFrequency: "monthly",
    priority: { ar: 0.7, en: 0.6 },
  },
  // The free invoice templates: a download hub that draws template searches.
  {
    pair: invoiceTemplatesPaths,
    lastModified: "2026-11-11",
    changeFrequency: "monthly",
    priority: { ar: 0.7, en: 0.5 },
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

/**
 * The e-invoicing hub and its guides are Arabic only, so they carry no English
 * alternate. lastModified is the WordPress page's own modified date. The hub is
 * the e-invoicing pillar, just under pricing.
 */
function einvoicingEntries(): MetadataRoute.Sitemap {
  return guides.map((guide) => {
    const url = encodeURI(`${site.url}${guidePath(guide.id)}`);
    return {
      url,
      lastModified: new Date(guide.modified),
      changeFrequency: "monthly" as const,
      priority: guide.number === 0 ? 0.8 : 0.6,
      alternates: { languages: { ar: url, "x-default": url } },
    };
  });
}

/** The accounting-software pillar: Arabic only, ranked with the e-invoicing pillar. */
function accountingGuideEntry(): MetadataRoute.Sitemap {
  const url = encodeURI(`${site.url}${accountingGuide.path}`);
  return [
    {
      url,
      lastModified: new Date(accountingGuide.modified),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { ar: url, "x-default": url } },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pagePairEntries(), ...einvoicingEntries(), ...accountingGuideEntry()];
}

function pagePairEntries(): MetadataRoute.Sitemap {
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
