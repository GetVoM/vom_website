import "server-only";
import type { Locale } from "@/lib/i18n/config";
import { termsAr } from "./terms-ar";
import { termsEn } from "./terms-en";
import type { LegalSection } from "./types";

export type { LegalClause, LegalSection } from "./types";

/**
 * The terms and conditions in one locale. Pages read legal text only through
 * this layer, so the storage behind it (TypeScript modules now, a CMS later)
 * can change without touching them.
 */
export function getTerms(locale: Locale): LegalSection[] {
  return locale === "ar" ? termsAr : termsEn;
}
