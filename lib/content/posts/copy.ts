import type { Locale } from "@/lib/i18n/config";

/**
 * The blog's fixed words. The blog index keeps the live site's title and
 * description (two doubled letters in the description fixed), so its search
 * result does not change at launch. The news and templates indexes carried
 * WordPress's English archive defaults ("News - Vom"), the same on the Arabic
 * and English pages; theirs were written on 2026-11-17, as were the English
 * blog index's, which had no page of its own on WordPress.
 */
export interface BlogCopy {
  blog: { crumb: string; h1: string; seoTitle: string; description: string; topics: string; latest: string; moreTopics: string };
  news: { crumb: string; h1: string; seoTitle: string; description: string; empty: string };
  templates: { crumb: string; h1: string; seoTitle: string; description: string };
  writtenBy: string;
  reviewedBy: string;
  lastReviewed: string;
  published: string;
  contents: string;
  related: string;
  table: string;
  entries: (count: number) => string;
  allIn: (topic: string) => string;
  minutes: (count: number) => string;
  page: (page: number, pages: number) => string;
  pageSuffix: (page: number) => string;
  newer: string;
  older: string;
  pagination: string;
  authorEntries: (name: string) => string;
  authorDescription: (name: string) => string;
  reviewedMark: string;
  close: { line: string; cta: string };
  /** The trial card under the contents, beside the article. */
  trial: { heading: string; body: string; cta: string };
}

const ar: BlogCopy = {
  blog: {
    crumb: "المدونة",
    h1: "مدونة ڤوم",
    seoTitle: "مدونة محاسبة متخصصة في كل ما يخص المحاسبة",
    description:
      "مدونة ڤوم هي مدونة محاسبة تجدون فيها مختلف الشروحات الدروس المعلومات الخاصة بمجال المحاسبة المالية والبرامج السحابية في السعودية",
    topics: "المواضيع",
    latest: "أحدث المقالات",
    moreTopics: "مواضيع أخرى",
  },
  news: {
    crumb: "الأخبار",
    h1: "أخبار ڤوم",
    seoTitle: "أخبار ڤوم: آخر الإعلانات والشراكات | ڤوم",
    description: "آخر أخبار ڤوم: اتفاقيات التعاون والشراكات والفعاليات والإعلانات الرسمية، مرتّبة من الأحدث إلى الأقدم.",
    empty: "لا توجد أخبار بعد.",
  },
  templates: {
    crumb: "القوالب والنماذج",
    h1: "القوالب والنماذج",
    seoTitle: "قوالب ونماذج محاسبية جاهزة للتحميل | ڤوم",
    description: "نماذج محاسبية وإدارية جاهزة للتحميل: فواتير، قوائم مالية، مخالصات ومسيّرات رواتب، مع شرح طريقة استخدام كل نموذج.",
  },
  writtenBy: "كتبه",
  reviewedBy: "راجعه",
  lastReviewed: "آخر مراجعة",
  published: "نُشر",
  contents: "المحتويات",
  related: "مقالات ذات صلة",
  table: "جدول",
  entries: (count) => (count === 1 ? "مقال واحد" : count === 2 ? "مقالان" : count <= 10 ? `${count} مقالات` : `${count} مقالاً`),
  allIn: (topic) => `كل مقالات ${topic}`,
  minutes: (count) => (count <= 1 ? "دقيقة قراءة" : count === 2 ? "دقيقتا قراءة" : count <= 10 ? `${count} دقائق قراءة` : `${count} دقيقة قراءة`),
  page: (page, pages) => `صفحة ${page} من ${pages}`,
  pageSuffix: (page) => `، صفحة ${page}`,
  newer: "الأحدث",
  older: "الأقدم",
  pagination: "صفحات المقالات",
  authorEntries: (name) => `مقالات كتبها أو راجعها ${name}`,
  authorDescription: (name) => `المقالات التي كتبها أو راجعها ${name} في مدونة ڤوم.`,
  reviewedMark: "روجع",
  close: {
    line: "أصدر فواتيرك الإلكترونية وتابع حساباتك من ڤوم، المعتمد من هيئة الزكاة والضريبة والجمارك.",
    cta: "ابدأ بتجربة مجانية لمدة 7 أيام",
  },
  trial: {
    heading: "جرّب ڤوم مجانًا لمدة 7 أيام",
    body: "أصدر فواتيرك الإلكترونية وتابع حساباتك، دون بطاقة ائتمان.",
    cta: "ابدأ تجربتك المجانية",
  },
};

const en: BlogCopy = {
  blog: {
    crumb: "Blog",
    h1: "The VoM blog",
    seoTitle: "Accounting Blog for Saudi Businesses | VoM",
    description: "Guides on accounting, e-invoicing, zakat and tax for businesses in Saudi Arabia, reviewed by a chartered accountant.",
    topics: "Topics",
    latest: "Latest articles",
    moreTopics: "More topics",
  },
  news: {
    crumb: "News",
    h1: "VoM news",
    seoTitle: "VoM News: Announcements and Partnerships | VoM",
    description: "Company news from VoM: partnerships, events and announcements for businesses in Saudi Arabia.",
    empty: "No news in English yet.",
  },
  // Templates exist in Arabic only; these words are never shown.
  templates: { crumb: "Templates", h1: "Templates", seoTitle: "Templates - Vom", description: "Templates Archive - Vom" },
  writtenBy: "Written by",
  reviewedBy: "Reviewed by",
  lastReviewed: "Last reviewed",
  published: "Published",
  contents: "Contents",
  related: "Related articles",
  table: "Table",
  entries: (count) => (count === 1 ? "1 article" : `${count} articles`),
  allIn: (topic) => `All articles in ${topic}`,
  minutes: (count) => `${Math.max(1, count)} min read`,
  page: (page, pages) => `Page ${page} of ${pages}`,
  pageSuffix: (page) => `, page ${page}`,
  newer: "Newer",
  older: "Older",
  pagination: "Article pages",
  authorEntries: (name) => `Articles written or reviewed by ${name}`,
  authorDescription: (name) => `Articles written or reviewed by ${name} on the VoM blog.`,
  reviewedMark: "Reviewed",
  close: {
    line: "Issue e-invoices and keep your books in VoM, approved by ZATCA.",
    cta: "Start a 7-day free trial",
  },
  trial: {
    heading: "Try VoM free for 7 days",
    body: "Issue e-invoices and keep your books. No credit card needed.",
    cta: "Start your free trial",
  },
};

export function blogCopy(locale: Locale): BlogCopy {
  return locale === "ar" ? ar : en;
}

/** A date as "5 سبتمبر 2025" or "5 September 2025" (Gregorian, Western digits, Riyadh time). */
export function postDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    calendar: "gregory",
    numberingSystem: "latn",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Riyadh",
  }).format(new Date(iso));
}

/** A post's path without its language prefix, as `localePath` and `buildMetadata` expect. */
export function barePath(path: string): string {
  return path.startsWith("/en/") ? path.slice(3) : path;
}
