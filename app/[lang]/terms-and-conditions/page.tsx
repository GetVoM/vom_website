import type { Metadata } from "next";
import { lang } from "next/root-params";
import { TermsPage, termsMetadata } from "@/components/legal/TermsPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return termsMetadata(await currentLocale());
}

/** Terms and conditions at /terms-and-conditions/ and /en/terms-and-conditions/. */
export default async function TermsRoute() {
  return <TermsPage locale={await currentLocale()} />;
}
