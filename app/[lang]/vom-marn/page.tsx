import type { Metadata } from "next";
import { lang } from "next/root-params";
import { IntegrationPage, integrationMetadata } from "@/components/integrations/IntegrationPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return integrationMetadata("marn", await currentLocale());
}

/** VoM & Marn at /vom-marn/ and /en/vom-marn/. */
export default async function MarnRoute() {
  return <IntegrationPage id="marn" locale={await currentLocale()} />;
}
