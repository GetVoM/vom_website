import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { AccountingGuidePage, accountingGuideMetadata } from "@/components/accounting-guide/AccountingGuidePage";
import { GuidePage, guideMetadata } from "@/components/einvoicing/GuidePage";
import { SectorPage, sectorMetadata } from "@/components/sectors/SectorPage";
import { accountingGuide, isAccountingGuidePath } from "@/lib/content/accounting-guide";
import { guideFromSlug, guideStaticParams, type GuideId } from "@/lib/content/einvoicing";
import { sectorFromSlug, sectorStaticParams } from "@/lib/content/sectors";
import type { SectorId } from "@/lib/content/sectors";
import { isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Preserved WordPress paths that have no route of their own resolve here through
 * the content layer (docs/architecture.md §3): the 15 sector pages, at
 * /<arabic-slug>/ and /en/accounting-software-for-<sector>/, the Arabic-only
 * e-invoicing hub and its 12 guides under /الفوترة-الإلكترونية/, and the
 * Arabic-only accounting-software guide /برنامج-محاسبة/. Anything else 404s.
 */
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : "ar";
  return [
    ...sectorStaticParams(locale),
    ...(locale === "ar" ? [...guideStaticParams(), { slug: [accountingGuide.segment] }] : []),
  ];
}

interface Props {
  params: Promise<{ lang: string; slug: string[] }>;
}

type Resolved = { kind: "sector"; id: SectorId; locale: Locale } | { kind: "guide"; id: GuideId } | { kind: "accounting-guide" };

async function resolve(params: Props["params"]): Promise<Resolved> {
  const value = await lang();
  const locale: Locale = isLocale(value) ? value : "ar";
  const { slug } = await params;
  const sector = sectorFromSlug(locale, slug);
  if (sector) return { kind: "sector", id: sector, locale };
  const guide = locale === "ar" ? guideFromSlug(slug) : null;
  if (guide) return { kind: "guide", id: guide };
  if (locale === "ar" && isAccountingGuidePath(slug)) return { kind: "accounting-guide" };
  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await resolve(params);
  if (page.kind === "sector") return sectorMetadata(page.id, page.locale);
  if (page.kind === "guide") return guideMetadata(page.id);
  return accountingGuideMetadata();
}

export default async function PreservedPathRoute({ params }: Props) {
  const page = await resolve(params);
  if (page.kind === "sector") return <SectorPage id={page.id} locale={page.locale} />;
  if (page.kind === "guide") return <GuidePage id={page.id} />;
  return <AccountingGuidePage />;
}
