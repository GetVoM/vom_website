import type { Metadata } from "next";
import { localePath, type Locale } from "@/lib/i18n/config";
import { site } from "./site";

interface PageMeta {
  locale: Locale;
  /** Locale-free path, e.g. "/" or "/pricing/". */
  path: string;
  title: string;
  description: string;
  /** Set when the page has a twin in the other locale at a different path. */
  alternatePath?: string | null;
  type?: "website" | "article";
  image?: string;
}

/**
 * Builds the Metadata object every page needs: absolute canonical, hreflang
 * pairs with x-default on Arabic, Open Graph and Twitter cards.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  alternatePath = path,
  type = "website",
  image,
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
  if (arabicPath) languages["x-default"] = arabicPath;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      type,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
