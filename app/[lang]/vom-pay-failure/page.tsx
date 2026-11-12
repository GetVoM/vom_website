import type { Metadata } from "next";
import { lang } from "next/root-params";
import { PayResult, payMetadata } from "@/components/vompay/PayResult";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return payMetadata("failure", await currentLocale());
}

/** The VoM Pay failure page at /vom-pay-failure/ and /en/vom-pay-failure/, where the app sends a payer (url-map.csv keep-noindex); it reads the app's ?vom_pay_errors= code in the browser. */
export default async function VomPayFailureRoute() {
  return <PayResult outcome="failure" locale={await currentLocale()} />;
}
