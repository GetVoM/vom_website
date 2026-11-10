import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ComponentType, ReactNode } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { HUB_SEGMENT, guideIds, guidePath, type GuideId } from "./catalogue";

export * from "./catalogue";
export { einvoicingCopy, guideDate, readingTime } from "./copy";

/** Arabic reading pace used for the reading time on every card. */
const WORDS_PER_MINUTE = 200;

export interface GuideSection {
  id: string;
  heading: string;
}

export interface GuideOutline {
  sections: GuideSection[];
  words: number;
  minutes: number;
}

/**
 * The page's H2 sections (for the catalogue rail) and its length, read from the
 * MDX source so they can never drift from the body.
 */
export async function getGuideOutline(id: GuideId): Promise<GuideOutline> {
  "use cache";
  cacheLife("max");
  cacheTag("einvoicing", `einvoicing-${id}`);
  const source = await readFile(join(process.cwd(), "content/e-invoicing", `${id}.mdx`), "utf8");
  const sections = [...source.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((match) => ({
    id: match[1],
    heading: match[2].replace(/<[^>]+>/g, "").trim(),
  }));
  const text = source
    .replace(/^export const lede = \(\s*<>|<\/>\s*\);/gm, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<Figure[^>]*\/>/g, " ")
    .replace(/<[^>]+>|\]\([^)]*\)|[[\]*#>{}]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return { sections, words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}

export interface GuideModule {
  Body: ComponentType;
  lede: ReactNode | null;
}

/** The compiled MDX body and its lede (the page's first paragraph, shown under the H1). */
export async function getGuideBody(id: GuideId): Promise<GuideModule> {
  const mod = (await import(`@/content/e-invoicing/${id}.mdx`)) as { default: ComponentType; lede: ReactNode | null };
  return { Body: mod.default, lede: mod.lede };
}

/** Route segments arrive percent-encoded for Arabic paths. */
function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** The guide at a catch-all path (Arabic only), or null when the path is not one. */
export function guideFromSlug(segments: string[]): GuideId | null {
  if (segments.length < 1 || segments.length > 2 || decode(segments[0]) !== HUB_SEGMENT) return null;
  const path = `/${segments.map(decode).join("/")}/`;
  return guideIds.find((id) => guidePath(id) === path) ?? null;
}

/** The catch-all's static params for Arabic: the hub and each guide. */
export function guideStaticParams(): { slug: string[] }[] {
  return guideIds.map((id) => ({ slug: guidePath(id).slice(1, -1).split("/") }));
}
