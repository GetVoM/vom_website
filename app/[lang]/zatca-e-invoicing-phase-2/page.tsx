import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { ZatcaPhase2Page, zatcaPhase2Metadata } from "@/components/zatca/ZatcaPhase2Page";

/**
 * The ZATCA Phase 2 page at /en/zatca-e-invoicing-phase-2/ (url-map.csv keep
 * row), English only: the Arabic path 404s. Its Arabic twin is the e-invoicing
 * hub (lib/i18n/routes.ts `zatcaPhase2Paths`).
 */
async function englishOnly() {
  if ((await lang()) !== "en") notFound();
}

export async function generateMetadata(): Promise<Metadata> {
  await englishOnly();
  return zatcaPhase2Metadata();
}

export default async function ZatcaPhase2Route() {
  await englishOnly();
  return <ZatcaPhase2Page />;
}
