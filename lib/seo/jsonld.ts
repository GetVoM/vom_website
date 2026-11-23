import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { planIds, planNames, planPeriod, planPrice } from "@/lib/content/pricing/plans";
import { site } from "./site";

type JsonLd = Record<string, unknown>;

/** An absolute URL on the site, percent-encoded like the canonicals, so one page has one spelling everywhere. */
const absolute = (locale: Locale, path: string) => `${site.url}${encodeURI(localePath(locale, path))}`;

/** A person with a page on this site (/author/<slug>/). The `@id` makes every mention the same entity. */
export interface PersonRef {
  name: string;
  slug: string;
  jobTitle?: string | null;
  sameAs?: string[];
}
const personUrl = (slug: string) => `${site.url}/author/${encodeURI(slug)}/`;
function personNode(who: PersonRef): JsonLd {
  return {
    "@type": "Person",
    "@id": `${personUrl(who.slug)}#person`,
    name: who.name,
    url: personUrl(who.slug),
    ...(who.jobTitle && { jobTitle: who.jobTitle }),
    ...(who.sameAs && who.sameAs.length > 0 && { sameAs: who.sameAs }),
  };
}

export function organizationJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name[locale],
    alternateName: locale === "ar" ? "VoM" : "ڤوم",
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: { "@type": "ImageObject", url: `${site.url}${site.logoSquare}`, width: 512, height: 512 },
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
    "@id": `${absolute(locale, path)}#webpage`,
    url: absolute(locale, path),
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
    "@id": `${absolute(locale, path)}#webpage`,
    url: absolute(locale, path),
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
    "@id": `${absolute(locale, path)}#webpage`,
    url: absolute(locale, path),
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
  author: PersonRef;
  reviewer: PersonRef;
  partOf?: { path: string; headline: string };
}): JsonLd {
  const url = absolute("ar", guide.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: guide.name,
    description: guide.description,
    inLanguage: "ar",
    isPartOf: { "@id": `${site.url}/#website` },
    reviewedBy: personNode(guide.reviewer),
    mainEntity: {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.headline,
      description: guide.description,
      image: `${site.url}${guide.image}`,
      datePublished: guide.published,
      dateModified: guide.modified,
      inLanguage: "ar",
      author: personNode(guide.author),
      publisher: { "@id": `${site.url}/#organization` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      // A bare reference to the hub's Article, which its own page describes in full: a second
      // node typed Article here, with only a headline, reads to validators as an incomplete Article.
      ...(guide.partOf && { isPartOf: { "@id": `${absolute("ar", guide.partOf.path)}#article` } }),
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
  const url = absolute(page.locale, page.path);
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

/**
 * One calculator on a tool page: a free WebApplication that runs in the browser.
 * `anchor` is the calculator's element id on the page. Arabic only.
 */
export function webApplicationJsonLd(app: { path: string; anchor: string; name: string; description: string }): JsonLd {
  const url = `${site.url}${encodeURI(localePath("ar", app.path))}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#${app.anchor}`,
    name: app.name,
    description: app.description,
    url: `${url}#${app.anchor}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    inLanguage: "ar",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** The tools index: a CollectionPage listing each tool page. Arabic only. */
export function toolCollectionJsonLd(page: {
  path: string;
  name: string;
  description: string;
  modified: string;
  tools: { name: string; description: string; path: string }[];
}): JsonLd {
  const url = `${site.url}${encodeURI(localePath("ar", page.path))}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: "ar",
    dateModified: page.modified,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: page.tools.length,
      itemListElement: page.tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}${encodeURI(localePath("ar", tool.path))}`,
        name: tool.name,
        description: tool.description,
      })),
    },
  };
}

/**
 * A blog post, news item or tool page: a WebPage carrying the accountant who
 * reviewed it (`reviewedBy` belongs to WebPage in schema.org, not to Article),
 * whose main entity is the Article (a NewsArticle for news) with its writer, a
 * Person with a page on this site, its dates, image and publisher. `path` is the
 * locale-free path. No FAQPage, even when the body has questions.
 */
export function articleJsonLd(post: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
  image: string | null;
  published: string;
  modified: string;
  section: string | null;
  author: PersonRef | null;
  reviewer: PersonRef | null;
  /** The image's real size, when known. */
  imageSize?: { width: number; height: number } | null;
  news?: boolean;
}): JsonLd {
  const url = `${site.url}${encodeURI(localePath(post.locale, post.path))}`;
  const image = post.image && post.imageSize ? { "@type": "ImageObject", url: post.image, ...post.imageSize } : post.image;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: post.headline,
    description: post.description,
    inLanguage: post.locale,
    isPartOf: { "@id": `${site.url}/#website` },
    ...(post.reviewer && { reviewedBy: personNode(post.reviewer), lastReviewed: post.modified.slice(0, 10) }),
    mainEntity: {
      "@type": post.news ? "NewsArticle" : "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      headline: post.headline,
      description: post.description,
      ...(image && { image }),
      datePublished: post.published,
      dateModified: post.modified,
      inLanguage: post.locale,
      ...(post.section && { articleSection: post.section }),
      // The brand's own byline ("VoM") is the organisation, not a person.
      author: post.author && post.author.name !== site.legalName ? personNode(post.author) : { "@id": `${site.url}/#organization` },
      publisher: { "@id": `${site.url}/#organization` },
    },
  };
}

/**
 * A person's page (/author/<slug>/): a ProfilePage whose main entity is the
 * Person every article names by the same `@id`. Arabic only.
 */
export function profilePageJsonLd(author: PersonRef & { bio?: string | null; avatar?: string | null }): JsonLd {
  const url = personUrl(author.slug);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name: author.name,
    inLanguage: "ar",
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      ...personNode(author),
      ...(author.bio && { description: author.bio }),
      ...(author.avatar && { image: author.avatar }),
      worksFor: { "@id": `${site.url}/#organization` },
    },
  };
}

/**
 * A list of articles (the blog index, a topic, the news, the templates): a
 * CollectionPage whose main entity lists the entries on this page, in order.
 * Paths are locale-free for the page and public (`/en/...` included) for entries.
 */
export function collectionJsonLd(page: { locale: Locale; path: string; name: string; description: string; entries: { name: string; path: string }[] }): JsonLd {
  const url = absolute(page.locale, page.path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: page.locale,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: page.entries.length,
      itemListElement: page.entries.map((entry, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}${encodeURI(entry.path)}`,
        name: entry.name,
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
      item: absolute(locale, item.path),
    })),
  };
}

/**
 * The site: one entity, described the same on every page in both languages
 * (Google reads the site name from the home page's WebSite), with the name in
 * Arabic and its Latin form as the alternate.
 */
export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name.ar,
    alternateName: [site.name.en, "getvom.com"],
    inLanguage: ["ar", "en"],
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function softwareJsonLd(locale: Locale, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: site.name[locale],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS",
    description,
    url: `${site.url}${localePath(locale, "/")}`,
    installUrl: site.appStore,
    publisher: { "@id": `${site.url}/#organization` },
    // One Offer per plan with a published price, before VAT, for the period it is
    // billed: Flex a month (its starting price), Advanced and Unlimited a year.
    // Business is quoted by sales, so it has no Offer.
    offers: planIds.flatMap((id) => {
      const price = planPrice[id];
      const monthly = planPeriod[id] === "monthly";
      return price === null
        ? []
        : [
            {
              "@type": "Offer",
              name: planNames[id][locale],
              price,
              priceCurrency: "SAR",
              // Says what the bare number cannot: the period it buys, before VAT, and for Flex only where it starts.
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price,
                ...(id === "flex" ? { minPrice: price } : {}),
                priceCurrency: "SAR",
                billingDuration: monthly ? "P1M" : "P1Y",
                unitCode: monthly ? "MON" : "ANN",
                valueAddedTaxIncluded: false,
              },
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
    "@id": `https://www.youtube.com/watch?v=${video.youtubeId}#video`,
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
