import "server-only";
import type { Locale } from "@/lib/i18n/config";
import { pricingAr } from "./ar";
import { pricingEn } from "./en";
import type { PricingCopy } from "./types";

export * from "./plans";
export type { PlanCopy, PricingCopy, PricingQuestion } from "./types";

/**
 * The pricing page's copy. Pages read it only through this layer, so the storage
 * behind it (TypeScript modules now, a CMS later) can change without them.
 */
export function getPricing(locale: Locale): PricingCopy {
  return locale === "ar" ? pricingAr : pricingEn;
}
