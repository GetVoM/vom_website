import type { Metadata } from "next";
import { lang } from "next/root-params";
import { GrowthPage, growthMetadata } from "@/components/growth/GrowthPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return growthMetadata(await currentLocale());
}

/** Growth program at /growth-plan/ and /en/growth-plan/. */
export default async function GrowthRoute() {
  return <GrowthPage locale={await currentLocale()} />;
}
