import type { Metadata } from "next";
import { lang } from "next/root-params";
import { PricingPage, pricingMetadata } from "@/components/pricing/PricingPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return pricingMetadata(await currentLocale());
}

/** Pricing at /pricing/ and /en/pricing/. */
export default async function PricingRoute() {
  return <PricingPage locale={await currentLocale()} />;
}
