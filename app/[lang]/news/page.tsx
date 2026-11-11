import type { Metadata } from "next";
import { lang } from "next/root-params";
import { NewsIndex, newsIndexMetadata } from "@/components/blog/BlogIndex";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function locale(): Promise<Locale> {
  const value = await lang();
  return value && isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return newsIndexMetadata(await locale());
}

/** The news index, /news/ and /en/news/. */
export default async function NewsRoute() {
  return <NewsIndex locale={await locale()} />;
}
