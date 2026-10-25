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
    sameAs: Object.values(site.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.whatsapp,
        availableLanguage: ["ar", "en"],
      },
    ],
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
