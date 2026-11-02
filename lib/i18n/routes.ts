import { localePath, otherLocale, type Locale } from "./config";

export interface PagePair {
  ar: string;
  en: string;
}

export const contactPaths: PagePair = { ar: "/contact-us/", en: "/contact-us-2/" };

/**
 * Locale-free paths of the pages that exist in both languages. WordPress gave
 * many English twins a different slug, so the pair has to be stated.
 */
const pagePairs: PagePair[] = [contactPaths];

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
