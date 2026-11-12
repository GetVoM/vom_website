import type { Metadata } from "next";
import { lang } from "next/root-params";
import { PayResult, payMetadata } from "@/components/vompay/PayResult";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return payMetadata("success", await currentLocale());
}

/** The VoM Pay success page at /vom-pay-success/ and /en/vom-pay-success/, where the app sends a payer (url-map.csv keep-noindex). */
export default async function VomPaySuccessRoute() {
  return <PayResult outcome="success" locale={await currentLocale()} />;
}
