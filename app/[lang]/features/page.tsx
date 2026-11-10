import type { Metadata } from "next";
import { lang } from "next/root-params";
import { FeaturesPage, featuresMetadata } from "@/components/features/FeaturesPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return featuresMetadata(await currentLocale());
}

/** Features at /features/ and /en/features/. */
export default async function FeaturesRoute() {
  return <FeaturesPage locale={await currentLocale()} />;
}
