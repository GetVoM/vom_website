import type { Metadata } from "next";
import { lang } from "next/root-params";
import { BlogIndex, blogIndexMetadata } from "@/components/blog/BlogIndex";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function locale(): Promise<Locale> {
  const value = await lang();
  return value && isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return blogIndexMetadata(await locale(), 1);
}

/** The blog index, /blog/ and /en/blog/. Later pages are at /blog/page/N/. */
export default async function BlogRoute() {
  return <BlogIndex locale={await locale()} page={1} />;
}
