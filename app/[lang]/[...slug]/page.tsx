import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { GuidePage, guideMetadata } from "@/components/einvoicing/GuidePage";
import { SectorPage, sectorMetadata } from "@/components/sectors/SectorPage";
import { guideFromSlug, guideStaticParams, type GuideId } from "@/lib/content/einvoicing";
import { sectorFromSlug, sectorStaticParams } from "@/lib/content/sectors";
import type { SectorId } from "@/lib/content/sectors";
import { isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Preserved WordPress paths that have no route of their own resolve here through
 * the content layer (docs/architecture.md §3): the 15 sector pages, at
 * /<arabic-slug>/ and /en/accounting-software-for-<sector>/, and the Arabic-only
 * e-invoicing hub and its 12 guides under /الفوترة-الإلكترونية/. Anything else 404s.
 */
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : "ar";
  return [...sectorStaticParams(locale), ...(locale === "ar" ? guideStaticParams() : [])];
}

interface Props {
  params: Promise<{ lang: string; slug: string[] }>;
}

type Resolved = { kind: "sector"; id: SectorId; locale: Locale } | { kind: "guide"; id: GuideId };

async function resolve(params: Props["params"]): Promise<Resolved> {
  const value = await lang();
  const locale: Locale = isLocale(value) ? value : "ar";
  const { slug } = await params;
  const sector = sectorFromSlug(locale, slug);
  if (sector) return { kind: "sector", id: sector, locale };
  const guide = locale === "ar" ? guideFromSlug(slug) : null;
  if (guide) return { kind: "guide", id: guide };
  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await resolve(params);
  return page.kind === "sector" ? sectorMetadata(page.id, page.locale) : guideMetadata(page.id);
}

export default async function PreservedPathRoute({ params }: Props) {
  const page = await resolve(params);
  return page.kind === "sector" ? <SectorPage id={page.id} locale={page.locale} /> : <GuidePage id={page.id} />;
}
