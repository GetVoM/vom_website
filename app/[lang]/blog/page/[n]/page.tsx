import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { BlogIndex, blogIndexMetadata } from "@/components/blog/BlogIndex";
import { listPosts } from "@/lib/content/posts";
import { isLocale, type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ lang: string; n: string }>;
}

/** WordPress's pagination paths, kept: /blog/page/2/ onwards. Page 1 is /blog/. */
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : "ar";
  const { pages } = await listPosts({ lang: locale });
  // At least one entry is required; a locale with a single page lists page 2, which 404s.
  return Array.from({ length: Math.max(pages - 1, 1) }, (_, i) => ({ n: String(i + 2) }));
}

async function resolve(params: Props["params"]): Promise<{ locale: Locale; page: number }> {
  const value = await lang();
  const locale: Locale = value && isLocale(value) ? value : "ar";
  const { n } = await params;
  const page = Number(n);
  if (!/^[1-9]\d*$/.test(n) || page < 2) notFound();
  const { pages } = await listPosts({ lang: locale });
  if (page > pages) notFound();
  return { locale, page };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await resolve(params);
  return blogIndexMetadata(locale, page);
}

export default async function BlogPageRoute({ params }: Props) {
  const { locale, page } = await resolve(params);
  return <BlogIndex locale={locale} page={page} />;
}
