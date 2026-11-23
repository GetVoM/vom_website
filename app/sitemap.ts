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
  zatcaPhase2Paths,
  type PagePair,
} from "@/lib/i18n/routes";
import { site } from "@/lib/seo/site";
import { accountingGuide } from "@/lib/content/accounting-guide/copy";
import { guidePath, guides } from "@/lib/content/einvoicing/catalogue";
import { postPaths } from "@/lib/content/posts";
import { toolPath, tools, toolsIndex, toolsModified } from "@/lib/content/tools/catalogue";

interface SitemapPage {
  pair: PagePair;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: { ar: number; en: number };
}

/** The code-owned pages that exist in both languages, each with the date it was last rebuilt. */
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
 * The e-invoicing hub and its guides are Arabic. The guides carry no English
 * alternate; the hub's is the English-only ZATCA Phase 2 page (owner,
 * 2026-11-12), listed here as its pair. lastModified is the WordPress page's own
 * modified date, or the rebuild's for the English page. The hub is the
 * e-invoicing pillar, just under pricing.
 */
function einvoicingEntries(): MetadataRoute.Sitemap {
  const english = encodeURI(`${site.url}${localePath("en", zatcaPhase2Paths.en)}`);
  return guides.flatMap((guide) => {
    const url = encodeURI(`${site.url}${guidePath(guide.id)}`);
    if (guide.id !== "hub") {
      return [{ url, lastModified: new Date(guide.modified), changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages: { ar: url, "x-default": url } } }];
    }
    const languages = { ar: url, en: english, "x-default": url };
    return [
      { url, lastModified: new Date(guide.modified), changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages } },
      { url: english, lastModified: new Date("2026-11-12"), changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages } },
    ];
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

/**
 * The financial tools: the index and its seven calculators, Arabic only.
 * lastModified is each WordPress page's own modified date; the index carries
 * the newest of them.
 */
function toolEntries(): MetadataRoute.Sitemap {
  const entry = (path: string, modified: string, priority: number) => {
    const url = encodeURI(`${site.url}${path}`);
    return { url, lastModified: new Date(modified), changeFrequency: "monthly" as const, priority, alternates: { languages: { ar: url, "x-default": url } } };
  };
  return [entry(toolsIndex.path, toolsModified, 0.7), ...tools.map((tool) => entry(toolPath(tool.id), tool.modified, 0.6))];
}

/**
 * The sitemap is split by type (docs/seo/strategy.md §5): /sitemap/pages.xml,
 * /sitemap/posts.xml, /sitemap/news.xml, /sitemap/templates.xml and
 * /sitemap/tools.xml. /sitemap.xml (app/api/sitemap-index/route.ts) is their index,
 * and the one address robots.ts names.
 */
export const sitemapIds = ["pages", "posts", "news", "templates", "tools"] as const;

export function generateSitemaps() {
  return sitemapIds.map((id) => ({ id }));
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const which = await id;
  if (which === "posts") return blogEntries("post");
  if (which === "news") return blogEntries("news");
  if (which === "templates") return blogEntries("template");
  if (which === "tools") return toolEntries();
  return [...pagePairEntries(), ...einvoicingEntries(), ...accountingGuideEntry()];
}

/**
 * Posts with the blog index, the category archives and the author pages; or the
 * news items with their index. lastModified is each record's own modified date;
 * a list page carries the date of the newest record it lists, in its own
 * language. A list with nothing in it (an author who has written nothing yet,
 * the English news) is noindex on the page and so is left out here.
 */
async function blogEntries(type: "post" | "news" | "template"): Promise<MetadataRoute.Sitemap> {
  const index = await postPaths();
  const absolute = (path: string) => encodeURI(`${site.url}${path}`);
  const newestOf = (posts: { modifiedAt: string }[]) => {
    const latest = posts.map((post) => post.modifiedAt).sort().at(-1);
    return latest ? new Date(latest) : null;
  };
  const single = (path: string, lang: string, lastModified: Date, priority: number, changeFrequency: "weekly" | "monthly") => {
    const url = absolute(path);
    return { url, lastModified, changeFrequency, priority, alternates: { languages: lang === "ar" ? { ar: url, "x-default": url } : { en: url, "x-default": url } } };
  };
  // A post names its twin in the other language as the page itself does (alternate_post_id, either way round).
  const record = (post: (typeof index.posts)[number]) => {
    const twin = index.posts.find((other) => other.id === post.alternateId || other.alternateId === post.id);
    if (!twin || twin.lang === post.lang) return single(post.path, post.lang, new Date(post.modifiedAt), 0.6, "monthly");
    const [ar, en] = post.lang === "ar" ? [post, twin] : [twin, post];
    const languages = { ar: absolute(ar.path), en: absolute(en.path), "x-default": absolute(ar.path) };
    return { url: absolute(post.path), lastModified: new Date(post.modifiedAt), changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages } };
  };
  const records = index.posts.filter((post) => post.type === type);
  // The templates and their index are Arabic only; /en/templates/ is another page, listed with the pages.
  if (type === "template") {
    const newest = newestOf(records);
    return [...(newest ? [single("/templates/", "ar", newest, 0.7, "weekly")] : []), ...records.map(record)];
  }
  const home = type === "post" ? "/blog/" : "/news/";
  const newest = { ar: newestOf(records.filter((post) => post.lang === "ar")), en: newestOf(records.filter((post) => post.lang === "en")) };
  // Each language's index is listed while it has entries, and paired with the other only when both do.
  const paired = newest.ar && newest.en;
  const indexes = (["ar", "en"] as const).flatMap((lang) => {
    const lastModified = newest[lang];
    if (!lastModified) return [];
    const url = absolute(lang === "ar" ? home : `/en${home}`);
    const languages = paired ? { ar: absolute(home), en: absolute(`/en${home}`), "x-default": absolute(home) } : lang === "ar" ? { ar: url, "x-default": url } : { en: url, "x-default": url };
    return [{ url, lastModified, changeFrequency: "weekly" as const, priority: lang === "ar" ? 0.7 : 0.4, alternates: { languages } }];
  });
  const lists =
    type === "post"
      ? [
          ...index.categories.flatMap((category) => {
            const lastModified = newestOf(index.posts.filter((post) => post.categoryId === category.id)) ?? newest[category.lang];
            return lastModified ? [single(category.path, category.lang, lastModified, 0.6, "weekly")] : [];
          }),
          // The author page lists that person's Arabic entries only, so only those count: a byline with
          // English entries alone has an empty, noindex page, which must stay out of the sitemap.
          ...index.authors.flatMap((author) => {
            const lastModified = newestOf(index.posts.filter((post) => post.lang === "ar" && (post.authorId === author.id || post.reviewerId === author.id)));
            return lastModified ? [single(`/author/${author.slug}/`, "ar", lastModified, 0.3, "monthly")] : [];
          }),
        ]
      : [];
  return [...indexes, ...lists, ...records.map(record)];
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
