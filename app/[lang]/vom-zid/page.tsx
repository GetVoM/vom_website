import type { Metadata } from "next";
import { lang } from "next/root-params";
import { IntegrationPage, integrationMetadata } from "@/components/integrations/IntegrationPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return integrationMetadata("zid", await currentLocale());
}

/** VoM & Zid at /vom-zid/ and /en/vom-zid/. */
export default async function ZidRoute() {
  return <IntegrationPage id="zid" locale={await currentLocale()} />;
}
