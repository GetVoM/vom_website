import type { Metadata } from "next";
import { lang } from "next/root-params";
import { IntegrationPage, integrationMetadata } from "@/components/integrations/IntegrationPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return integrationMetadata("lazywait", await currentLocale());
}

/** VoM & LazyWait at /vom-lazywait/ and /en/vom-lazywait/. */
export default async function LazyWaitRoute() {
  return <IntegrationPage id="lazywait" locale={await currentLocale()} />;
}
