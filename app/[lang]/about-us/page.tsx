import type { Metadata } from "next";
import { lang } from "next/root-params";
import { AboutPage, aboutMetadata } from "@/components/about/AboutPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return aboutMetadata(await currentLocale());
}

/** About page at /about-us/ and /en/about-us/. */
export default async function AboutRoute() {
  return <AboutPage locale={await currentLocale()} />;
}
