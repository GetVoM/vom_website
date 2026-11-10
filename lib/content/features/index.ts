import "server-only";
import type { Locale } from "@/lib/i18n/config";
import { featuresAr } from "./ar";
import { featuresEn } from "./en";
import type { FeaturesCopy } from "./types";

export * from "./assets";
export type { FeatureEntry, FeatureModule, FeaturesCopy, FeaturedReport } from "./types";

/**
 * The features page's copy. Pages read it only through this layer, so the storage
 * behind it (TypeScript modules now, a CMS later) can change without them.
 */
export function getFeatures(locale: Locale): FeaturesCopy {
  return locale === "ar" ? featuresAr : featuresEn;
}
