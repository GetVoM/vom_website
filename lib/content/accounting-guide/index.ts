import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ComponentType, ReactNode } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { mdxOutline, type MdxOutline } from "@/lib/content/mdx-outline";
import { accountingGuide } from "./copy";

export { accountingGuide } from "./copy";

const SOURCE = "content/accounting-guide.mdx";

/**
 * The guide's eight parts (its H2s: the summary, six chapters and the closing
 * word) with their reading times, read from the MDX source so the thumb index
 * and the contents sheet can never drift from the body.
 */
export async function getAccountingGuideOutline(): Promise<MdxOutline> {
  "use cache";
  cacheLife("max");
  cacheTag("accounting-guide");
  return mdxOutline(await readFile(join(process.cwd(), SOURCE), "utf8"));
}

export interface AccountingGuideModule {
  Body: ComponentType;
  /** The closing word, shown on the page's teal close band. */
  closing: ReactNode;
  /** The closing paragraph's trial link, shown as the band's button. */
  closingCta: string;
}

export async function getAccountingGuideBody(): Promise<AccountingGuideModule> {
  const mod = (await import("@/content/accounting-guide.mdx")) as {
    default: ComponentType;
    closing: ReactNode;
    closingCta: string;
  };
  return { Body: mod.default, closing: mod.closing, closingCta: mod.closingCta };
}

/** True when the catch-all segments are this page's (Arabic only; segments arrive percent-encoded). */
export function isAccountingGuidePath(segments: string[]): boolean {
  if (segments.length !== 1) return false;
  try {
    return decodeURIComponent(segments[0]) === accountingGuide.segment;
  } catch {
    return segments[0] === accountingGuide.segment;
  }
}

/** The tab number of a part: «00» for the summary, then «01» to «07». */
export const partNumber = (index: number) => String(index).padStart(2, "0");
