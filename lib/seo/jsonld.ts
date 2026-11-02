import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { site } from "./site";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name[locale],
    alternateName: locale === "ar" ? "VoM" : "ڤوم",
    url: site.url,
    logo: `${site.url}${site.logo}`,
    foundingDate: site.foundingYear,
    areaServed: "SA",
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
    sameAs: Object.values(site.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.whatsapp,
        email: site.email,
        availableLanguage: ["ar", "en"],
      },
    ],
  };
}

export function contactPageJsonLd(locale: Locale, path: string, name: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}${localePath(locale, path)}`,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
  };
}

/** `path` values are locale-free; the visible breadcrumb must list the same items. */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${localePath(locale, item.path)}`,
    })),
  };
}

export function websiteJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}${localePath(locale, "/")}`,
    name: site.name[locale],
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function softwareJsonLd(locale: Locale, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name[locale],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS",
    description,
    url: `${site.url}${localePath(locale, "/")}`,
    publisher: { "@id": `${site.url}/#organization` },
    offers: site.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name[locale],
      price: plan.price,
      priceCurrency: "SAR",
      availability: "https://schema.org/InStock",
      url: `${site.url}${localePath(locale, "/pricing/")}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
