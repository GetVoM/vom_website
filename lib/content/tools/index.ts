import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ComponentType } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { mdxOutline } from "@/lib/content/mdx-outline";
import { tools, toolIds, type ToolId } from "./catalogue";

export * from "./catalogue";
export { toolCovers, type ToolCover } from "./covers";

export interface ToolSection {
  id: string;
  heading: string;
}

export interface ToolOutline {
  sections: ToolSection[];
  words: number;
  minutes: number;
}

/** The page's H2 sections and its length, read from the MDX source so they never drift from the body. */
export async function getToolOutline(id: ToolId): Promise<ToolOutline> {
  "use cache";
  cacheLife("max");
  cacheTag("tools", `tool-${id}`);
  const source = await readFile(join(process.cwd(), "content/tools", `${id}.mdx`), "utf8");
  const { sections, words, minutes } = mdxOutline(source);
  return { sections: sections.map((section) => ({ id: section.id, heading: section.heading })), words, minutes };
}

type MdxBody = ComponentType<{ components?: Record<string, unknown> }>;

/**
 * A tool page's two compiled MDX parts: the lead (everything up to its last
 * calculator, shown full width as the poster bands) and the article after it.
 */
export async function getToolBody(id: ToolId): Promise<{ Lead: MdxBody; Body: MdxBody }> {
  const [lead, body] = await Promise.all([
    import(`@/content/tools/${id}.lead.mdx`) as Promise<{ default: MdxBody }>,
    import(`@/content/tools/${id}.mdx`) as Promise<{ default: MdxBody }>,
  ]);
  return { Lead: lead.default, Body: body.default };
}

/** Route segments arrive percent-encoded for Arabic paths. */
function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** The tool at /tools/<slug>/, or null. */
export function toolFromSlug(slug: string): ToolId | null {
  const decoded = decode(slug);
  return tools.find((tool) => tool.slug === decoded)?.id ?? null;
}

/** Static params for app/[lang]/tools/[slug]: every tool's slug, unencoded. */
export function toolStaticParams(): { slug: string }[] {
  return toolIds.map((id) => ({ slug: tools.find((tool) => tool.id === id)!.slug }));
}
