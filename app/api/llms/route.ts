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
} from "@/lib/i18n/routes";
import { guidePath, guides } from "@/lib/content/einvoicing/catalogue";
import { toolPath, tools } from "@/lib/content/tools/catalogue";
import { getSector, sectorIds } from "@/lib/content/sectors";
import { listCategories, postPaths } from "@/lib/content/posts";
import { integrationIds, integrations } from "@/lib/integrations";
import { site } from "@/lib/seo/site";

/** An absolute, percent-encoded address, as the sitemaps and canonicals spell it. */
const url = (path: string) => encodeURI(`${site.url}${path}`);
const ar = (path: string) => url(localePath("ar", path));
const en = (path: string) => url(localePath("en", path));
/** A page's title without the brand suffix the browser tab carries. */
const bare = (title: string) => title.replace(/\s*[|\-–]\s*(ڤوم|VoM|Vom)\s*$/u, "");
const item = (name: string, href: string, note?: string) => `- [${name}](${href})${note ? `: ${note}` : ""}`;

/**
 * /llms.txt (llmstxt.org), served from here behind a rewrite in next.config.ts:
 * what the site is, for language models and answer engines, then every page
 * worth citing, read from the same catalogues the pages and the sitemaps are
 * built from, so a new guide, tool, sector or topic is listed without editing
 * this file. The opening and the first sections are the hand-written file of
 * 2026-11-17, kept word for word; the lists after them are the pages' own
 * titles and descriptions.
 */
export async function GET() {
  const [index, categories] = await Promise.all([postPaths(), listCategories()]);
  const usedCategories = new Set(index.posts.map((post) => post.categoryId));
  const topics = categories.filter((category) => category.lang === "ar" && usedCategories.has(category.id));

  const lines = [
    "# VoM (ڤوم)",
    "",
    "> VoM is a Saudi cloud accounting product: e-invoicing approved by ZATCA (the Zakat, Tax and Customs Authority), sales, purchases, inventory and financial reports. This site describes the product and hosts an Arabic library on accounting, e-invoicing, zakat and tax in Saudi Arabia. Arabic is the primary language, at the root; English pages are under /en/. The product itself, with sign-up and login, is at https://app.getvom.com.",
    "",
    "## Product",
    "",
    "- [Homepage (Arabic)](https://getvom.com/): what VoM does and who it is for",
    "- [Homepage (English)](https://getvom.com/en/)",
    "- [Features](https://getvom.com/features/): every module of the product",
    "- [Pricing](https://getvom.com/pricing/): plans and prices in Saudi riyals, before VAT",
    "- [About VoM](https://getvom.com/about-us/)",
    "- [Contact](https://getvom.com/contact-us/)",
    "",
    "## Guides (Arabic)",
    "",
    "- [E-invoicing in Saudi Arabia](https://getvom.com/الفوترة-الإلكترونية/): the full guide to ZATCA e-invoicing, with twelve detailed guides",
    "- [Accounting software guide](https://getvom.com/برنامج-محاسبة/): how to choose accounting software in Saudi Arabia",
    "- [ZATCA e-invoicing Phase 2 (English)](https://getvom.com/en/zatca-e-invoicing-phase-2/)",
    "- [Blog](https://getvom.com/blog/): articles on accounting, tax, zakat and business, reviewed by a chartered accountant",
    "",
    "## Tools and templates (Arabic)",
    "",
    "- [Financial calculators](https://getvom.com/tools/): VAT, profit margin, discount, salary and zakat calculators",
    "- [Free invoice templates](https://getvom.com/نماذج-فواتير/): invoice templates to download",
    "- [Accounting templates](https://getvom.com/templates/): downloadable accounting and administrative forms",
    "",
    "## E-invoicing guides (Arabic)",
    "",
    ...guides.filter((guide) => guide.slug !== "").map((guide) => item(guide.cardTitle, url(guidePath(guide.id)), guide.description)),
    "",
    "## Financial calculators (Arabic)",
    "",
    ...tools.map((tool) => item(tool.cardTitle, url(toolPath(tool.id)), tool.description)),
    "",
    "## Accounting software by sector",
    "",
    ...sectorIds.map((id) => {
      const page = getSector(id, "ar");
      return item(bare(page.seo.title), ar(sectorPaths[id].ar), page.seo.description);
    }),
    "",
    "## Integrations",
    "",
    ...integrationIds.map((id) => item(`VoM and ${integrations[id].name}`, ar(integrationPaths[id].ar), `in English at ${en(integrationPaths[id].en)}`)),
    "",
    "## Programs and policies",
    "",
    item("Growth program", ar(growthPaths.ar), `in English at ${en(growthPaths.en)}`),
    item("Student package", ar(studentPaths.ar), `in English at ${en(studentPaths.en)}`),
    item("Terms and conditions", ar(termsPaths.ar), `in English at ${en(termsPaths.en)}`),
    "",
    "## English pages",
    "",
    item("Features", en(featuresPaths.en)),
    item("Pricing", en(pricingPaths.en)),
    item("ZATCA e-invoicing Phase 2", en(zatcaPhase2Paths.en)),
    item("Free invoice templates", en(invoiceTemplatesPaths.en)),
    item("About VoM", en(aboutPaths.en)),
    item("Contact", en(contactPaths.en)),
    item("Blog", en("/blog/")),
    ...sectorIds.map((id) => {
      const page = getSector(id, "en");
      return item(bare(page.seo.title), en(sectorPaths[id].en), page.seo.description);
    }),
    "",
    "## Blog topics (Arabic)",
    "",
    ...topics.map((topic) => item(topic.name, url(topic.path), topic.seoDescription ?? undefined)),
    "",
    "## Feeds",
    "",
    "- [Sitemap index](https://getvom.com/sitemap.xml)",
    "- [Blog RSS feed](https://getvom.com/feed/)",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
