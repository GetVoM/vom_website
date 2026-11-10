import { localePath, otherLocale, type Locale } from "./config";
import type { IntegrationId } from "./dictionaries/types";

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

/** WordPress gave the English twins a "-2" slug; those now redirect here (next.config.ts). */
export const integrationPaths: Record<IntegrationId, PagePair> = {
  foodics: { ar: "/vom-foodics/", en: "/vom-foodics/" },
  marn: { ar: "/vom-marn/", en: "/vom-marn/" },
  zid: { ar: "/vom-zid/", en: "/vom-zid/" },
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
  ...Object.values(integrationPaths),
];

/**
 * Where the language switch leads from the current page. `segments` are the
 * route segments below `app/[lang]`. They come from the router, not the browser
 * URL, so the Arabic rewrites cannot cause a hydration mismatch.
 */
export function alternateHref(locale: Locale, segments: string[]): string {
  const other = otherLocale(locale);
  const current = `/${segments.join("/")}/`;
  const pair = pagePairs.find((candidate) => candidate[locale] === current);
  return localePath(other, pair ? pair[other] : "/");
}
