import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SectorPage, sectorMetadata } from "@/components/sectors/SectorPage";
import { sectorFromSlug, sectorStaticParams } from "@/lib/content/sectors";
import { isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Preserved WordPress paths that have no route of their own resolve here through
 * the content layer (docs/architecture.md §3). Today that is the 15 sector pages,
 * at /<arabic-slug>/ and /en/accounting-software-for-<sector>/; anything else 404s.
 */
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return sectorStaticParams(isLocale(params.lang) ? params.lang : "ar");
}

interface Props {
  params: Promise<{ lang: string; slug: string[] }>;
}

async function resolve(params: Props["params"]) {
  const value = await lang();
  const locale: Locale = isLocale(value) ? value : "ar";
  const { slug } = await params;
  const id = sectorFromSlug(locale, slug);
  if (!id) notFound();
  return { id, locale };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await resolve(params);
  return sectorMetadata(id, locale);
}

export default async function PreservedPathRoute({ params }: Props) {
  const { id, locale } = await resolve(params);
  return <SectorPage id={id} locale={locale} />;
}
