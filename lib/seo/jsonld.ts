import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { monthlyPrice, planIds, planNames } from "@/lib/content/pricing/plans";
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

export function aboutPageJsonLd(
  locale: Locale,
  path: string,
  name: string,
  description: string,
  team: { name: string; role: string; photo: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${site.url}${localePath(locale, path)}`,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      employee: team.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        image: `${site.url}${member.photo}`,
      })),
    },
  };
}

/** A plain page with no more specific schema.org type, such as the terms and conditions. */
export function webPageJsonLd(locale: Locale, path: string, name: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${site.url}${localePath(locale, path)}`,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/**
 * A guide (the e-invoicing hub and its guides; later the blog): a WebPage carrying
 * the reviewer, whose main entity is the Article with its author and dates. Arabic
 * only. `reviewedBy` belongs to WebPage in schema.org, hence the pair.
 */
export function guideJsonLd(guide: {
  path: string;
  headline: string;
  name: string;
  description: string;
  image: string;
  published: string;
  modified: string;
  author: string;
  reviewer: { name: string; jobTitle: string };
  partOf?: { path: string; headline: string };
}): JsonLd {
  const url = `${site.url}${localePath("ar", guide.path)}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: guide.name,
    description: guide.description,
    inLanguage: "ar",
    isPartOf: { "@id": `${site.url}/#website` },
    reviewedBy: { "@type": "Person", name: guide.reviewer.name, jobTitle: guide.reviewer.jobTitle },
    mainEntity: {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.headline,
      description: guide.description,
      image: `${site.url}${guide.image}`,
      datePublished: guide.published,
      dateModified: guide.modified,
      inLanguage: "ar",
      author: { "@type": "Person", name: guide.author },
      publisher: { "@id": `${site.url}/#organization` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      ...(guide.partOf && {
        isPartOf: {
          "@type": "Article",
          "@id": `${site.url}${localePath("ar", guide.partOf.path)}#article`,
          headline: guide.partOf.headline,
        },
      }),
    },
  };
}

/**
 * A page of downloadable documents (the free invoice templates): a CollectionPage
 * whose main entity lists each document with its files. The files are Arabic in
 * both languages, so each document's `inLanguage` is "ar" whatever the page's.
 */
export function templateCollectionJsonLd(page: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  published: string;
  modified: string;
  documents: {
    name: string;
    image: string;
    files: { url: string; format: string; bytes: number }[];
  }[];
}): JsonLd {
  const url = `${site.url}${localePath(page.locale, page.path)}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: page.locale,
    datePublished: page.published,
    dateModified: page.modified,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: page.documents.length,
      itemListElement: page.documents.map((document, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "DigitalDocument",
          name: document.name,
          image: `${site.url}${document.image}`,
          inLanguage: "ar",
          isAccessibleForFree: true,
          publisher: { "@id": `${site.url}/#organization` },
          encoding: document.files.map((file) => ({
            "@type": "MediaObject",
            contentUrl: encodeURI(`${site.url}${file.url}`),
            encodingFormat: file.format,
            contentSize: `${file.bytes} B`,
          })),
        },
      })),
    },
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
    operatingSystem: "Web, iOS, Android",
    description,
    url: `${site.url}${localePath(locale, "/")}`,
    publisher: { "@id": `${site.url}/#organization` },
    // One Offer per plan with a published price, monthly and before VAT. Flex's
    // is its starting price; Business is quoted by sales, so it has no Offer.
    offers: planIds.flatMap((id) => {
      const price = monthlyPrice[id];
      return price === null
        ? []
        : [
            {
              "@type": "Offer",
              name: planNames[id][locale],
              price,
              priceCurrency: "SAR",
              availability: "https://schema.org/InStock",
            },
          ];
    }),
  };
}

/**
 * A YouTube video embedded on the page. `name` is the title on YouTube; `uploadDate`
 * and `duration` (ISO 8601) are as YouTube states them.
 */
export function videoJsonLd(video: {
  youtubeId: string;
  name: string;
  description: string;
  thumbnailPath: string;
  uploadDate: string;
  duration: string;
  inLanguage: Locale;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: `${site.url}${video.thumbnailPath}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    inLanguage: video.inLanguage,
    publisher: { "@id": `${site.url}/#organization` },
  };
}
