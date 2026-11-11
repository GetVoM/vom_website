import { localePath, otherLocale, type Locale } from "./config";
import type { IntegrationId, SectorId } from "./dictionaries/types";

export interface PagePair {
  ar: string;
  en: string;
}

export const contactPaths: PagePair = { ar: "/contact-us/", en: "/contact-us/" };
export const aboutPaths: PagePair = { ar: "/about-us/", en: "/about-us/" };
export const termsPaths: PagePair = { ar: "/terms-and-conditions/", en: "/terms-and-conditions/" };
export const growthPaths: PagePair = { ar: "/growth-plan/", en: "/growth-plan/" };
/** The English twin was /en/student-package-2/; it now redirects here (next.config.ts). */
export const studentPaths: PagePair = { ar: "/student-package/", en: "/student-package/" };
/** The English twin was /en/pricing-en/; it now redirects here (next.config.ts). */
export const pricingPaths: PagePair = { ar: "/pricing/", en: "/pricing/" };
/** The English twin was /en/features-en/; it now redirects here (next.config.ts). */
export const featuresPaths: PagePair = { ar: "/features/", en: "/features/" };
/**
 * The free invoice templates. Arabic is back at its WordPress path and English
 * stays at /en/templates/ (owner, 2026-11-11): the Arabic /templates/ is the
 * index of the 44 downloadable templates, which exist in Arabic only. The old
 * /en/sales-invoices/ redirects to the English page (next.config.ts).
 */
export const invoiceTemplatesPaths: PagePair = { ar: "/نماذج-فواتير/", en: "/templates/" };

/** WordPress gave the English twins a "-2" slug; those now redirect here (next.config.ts). */
export const integrationPaths: Record<IntegrationId, PagePair> = {
  foodics: { ar: "/vom-foodics/", en: "/vom-foodics/" },
  marn: { ar: "/vom-marn/", en: "/vom-marn/" },
  zid: { ar: "/vom-zid/", en: "/vom-zid/" },
};

/**
 * The 15 sector pages. The Arabic slugs are the ranked WordPress URLs, kept byte
 * for byte (printing's is cut short at "…والاعلا"); WordPress gave most English
 * twins a "-2" or "-en" slug, and those now redirect here (next.config.ts).
 */
export const sectorPaths: Record<SectorId, PagePair> = {
  restaurants: { ar: "/برنامج-محاسبة-للمطاعم/", en: "/accounting-software-for-food-and-beverages/" },
  beauty: { ar: "/برنامج-محاسبة-لمراكز-التجميل/", en: "/accounting-software-for-beauty-salons/" },
  gyms: { ar: "/برنامج-محاسبة-للنوادي-الرياضية/", en: "/accounting-software-for-gym-and-fitness-centers/" },
  law: { ar: "/برنامج-محاسبة-لمكاتب-المحاماة/", en: "/accounting-software-for-law-firms/" },
  design: { ar: "/برنامج-محاسبة-مكاتب-التصميم/", en: "/accounting-software-for-design-offices/" },
  marketing: { ar: "/برنامج-محاسبة-لوكالات-التسويق/", en: "/accounting-software-for-marketing-agencies/" },
  logistics: { ar: "/برنامج-محاسبة-الخدمات-اللوجستية/", en: "/accounting-software-for-logistical-services/" },
  travel: { ar: "/برنامج-محاسبة-لشركات-السفر-والسياحة/", en: "/accounting-software-for-travel-and-tourism/" },
  "car-care": { ar: "/برنامج-محاسبة-لصيانة-السيارات/", en: "/accounting-software-for-car-maintenance-centers/" },
  ecommerce: { ar: "/برنامج-محاسبة-والمتاجر-الالكترونية/", en: "/accounting-software-for-applications-and-ecommerce/" },
  perfume: { ar: "/برنامج-محاسبة-للعطور/", en: "/accounting-software-for-perfume-stores/" },
  "real-estate": { ar: "/برنامج-محاسبة-للعقارات-والمقاولات/", en: "/accounting-software-for-real-estate-and-construction/" },
  investment: { ar: "/برنامج-محاسبة-لشركات-الاستثمار/", en: "/accounting-software-for-investment-firms/" },
  printing: { ar: "/برنامج-محاسبة-لشركات-الطباعة-والاعلا/", en: "/accounting-software-for-printing-and-advertising-agencies/" },
  childcare: { ar: "/برنامج-محاسبة-للاطفال/", en: "/accounting-software-for-day-care-centers/" },
};

/**
 * Locale-free paths of the pages that exist in both languages. WordPress gave
 * many English twins a different slug, so the pair has to be stated.
 */
const pagePairs: PagePair[] = [
  contactPaths,
  aboutPaths,
  termsPaths,
  growthPaths,
  studentPaths,
  pricingPaths,
  featuresPaths,
  invoiceTemplatesPaths,
  ...Object.values(integrationPaths),
  ...Object.values(sectorPaths),
];

/** Router segments arrive percent-encoded for Arabic paths; a bad escape stays as it is. */
function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/**
 * Where the language switch leads from the current page. `segments` are the
 * route segments below `app/[lang]`. They come from the router, not the browser
 * URL, so the Arabic rewrites cannot cause a hydration mismatch.
 */
export function alternateHref(locale: Locale, segments: string[]): string {
  const other = otherLocale(locale);
  const current = `/${segments.map(decodeSegment).join("/")}/`;
  const pair = pagePairs.find((candidate) => candidate[locale] === current);
  return localePath(other, pair ? pair[other] : "/");
}
