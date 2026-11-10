import "server-only";
import type { Locale } from "@/lib/i18n/config";
import { sectorPaths } from "@/lib/i18n/routes";
import { sectorsAr } from "./ar";
import { sectorsEn } from "./en";
import type { SectorCopy, SectorId } from "./types";

export type { SectorArticle, SectorCopy, SectorFeature, SectorId, SectorQuestion } from "./types";
export { readingImage, sectorClients, sectorPhotos } from "./assets";

/** Page order, which is also the order of the sector register that links the pages together. */
export const sectorIds = Object.keys(sectorPaths) as SectorId[];

/**
 * One sector page's copy. Pages read sector content only through this layer, so the
 * storage behind it (TypeScript modules now, a CMS later) can change without them.
 */
export function getSector(id: SectorId, locale: Locale): SectorCopy {
  return (locale === "ar" ? sectorsAr : sectorsEn)[id];
}

/** Route segments arrive percent-encoded for Arabic paths. */
function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** The sector at a catch-all path, or null when the path is not a sector page. */
export function sectorFromSlug(locale: Locale, segments: string[]): SectorId | null {
  const path = `/${segments.map(decode).join("/")}/`;
  return sectorIds.find((id) => sectorPaths[id][locale] === path) ?? null;
}

/** The catch-all's static params for one locale: each sector's slug as a single segment. */
export function sectorStaticParams(locale: Locale): { slug: string[] }[] {
  return sectorIds.map((id) => ({ slug: [sectorPaths[id][locale].slice(1, -1)] }));
}
