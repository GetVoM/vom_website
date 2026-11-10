import type { Metadata } from "next";
import { lang } from "next/root-params";
import { IntegrationPage, integrationMetadata } from "@/components/integrations/IntegrationPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return integrationMetadata("foodics", await currentLocale());
}

/** VoM & Foodics at /vom-foodics/ and /en/vom-foodics/. */
export default async function FoodicsRoute() {
  return <IntegrationPage id="foodics" locale={await currentLocale()} />;
}
