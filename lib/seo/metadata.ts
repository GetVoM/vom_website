import type { Metadata } from "next";
import { localePath, type Locale } from "@/lib/i18n/config";
import { site } from "./site";

interface PageMeta {
  locale: Locale;
  /** Locale-free path, e.g. "/" or "/pricing/". */
  path: string;
  title: string;
  description: string;
  /** Set when the page has a twin in the other locale at a different path; null when it has none. */
  alternatePath?: string | null;
  type?: "website" | "article";
  /** The share image. Without one the page takes the site's card for its language, so no page is shared bare. */
  image?: string;
  /** The image's real size, when it is not a 1200×630 card (a post's cover). */
  imageSize?: { width: number; height: number } | null;
  /** False keeps the page out of search while its links are still followed (an empty list, a thank-you page). */
  index?: boolean;
}

/** The share card for pages that have none of their own: the blog's lists, people's pages, posts without a cover. */
export const fallbackImage = (locale: Locale) => `/og/blog-${locale}.png`;

/** Facebook's locale names: Arabic has one code for every country. */
const OG_LOCALE = { ar: "ar_AR", en: "en_US" } as const;

/**
 * Builds the Metadata object every page needs: absolute canonical, hreflang
 * pairs with x-default (the Arabic page, or the page itself when it exists in
 * English only), Open Graph and Twitter cards with an image, and the snippet
 * permissions for every crawler, not Google's alone.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  alternatePath = path,
  type = "website",
  image,
  imageSize,
  index = true,
}: PageMeta): Metadata {
  const canonical = localePath(locale, path);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const languages: Record<string, string> = {
    [locale]: canonical,
  };
  if (alternatePath) {
    languages[other] = localePath(other, alternatePath);
  }
  const arabicPath = locale === "ar" ? canonical : alternatePath ? localePath("ar", alternatePath) : null;
  languages["x-default"] = arabicPath ?? canonical;

  const card = image ?? fallbackImage(locale);
  const size = image && imageSize ? imageSize : { width: 1200, height: 630 };
  const snippets = { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } as const;

  return {
    title,
    description,
    // The blog's RSS feed (app/api/feed/route.ts), named on every page as WordPress did, so readers
    // and crawlers that look for it in the head find new posts.
    alternates: { canonical, languages, types: { "application/rss+xml": "/feed/" } },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name[locale],
      locale: OG_LOCALE[locale],
      ...(alternatePath && { alternateLocale: OG_LOCALE[other] }),
      type,
      images: [{ url: card, ...size, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: site.xHandle,
      title,
      description,
      images: [card],
    },
    robots: index
      ? { index: true, follow: true, ...snippets, googleBot: { index: true, follow: true, ...snippets } }
      : { index: false, follow: true },
  };
}
