import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { ToolPage, toolMetadata } from "@/components/tools/ToolPage";
import { toolFromSlug, toolStaticParams, type ToolId } from "@/lib/content/tools";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

/**
 * The seven calculator pages at /tools/<arabic-slug>/ (url-map.csv keep rows),
 * Arabic only: /en/tools/… 404s. Their own segment keeps the calculators'
 * client code out of the catch-all's pages.
 */
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  // At least one entry is required; English lists one tool, which 404s (as /blog/page/[n] does).
  return params.lang === "ar" ? toolStaticParams() : toolStaticParams().slice(0, 1);
}

async function resolve(params: Props["params"]): Promise<ToolId> {
  if ((await lang()) !== "ar") notFound();
  const id = toolFromSlug((await params).slug);
  if (!id) notFound();
  return id;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return toolMetadata(await resolve(params));
}

export default async function ToolRoute({ params }: Props) {
  return <ToolPage id={await resolve(params)} />;
}
