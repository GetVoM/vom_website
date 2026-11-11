import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound, permanentRedirect } from "next/navigation";
import { AuthorPage, CategoryPage, TemplatesIndex, authorMetadata, categoryMetadata, templatesIndexMetadata } from "@/components/blog/BlogIndex";
import { InvoiceTemplatesPage, invoiceTemplatesMetadata } from "@/components/invoice-templates/InvoiceTemplatesPage";
import { PostPage, postMetadata } from "@/components/blog/PostPage";
import { AccountingGuidePage, accountingGuideMetadata } from "@/components/accounting-guide/AccountingGuidePage";
import { GuidePage, guideMetadata } from "@/components/einvoicing/GuidePage";
import { SectorPage, sectorMetadata } from "@/components/sectors/SectorPage";
import { accountingGuide, isAccountingGuidePath } from "@/lib/content/accounting-guide";
import { guideFromSlug, guideStaticParams, type GuideId } from "@/lib/content/einvoicing";
import { getAuthor, getCategory, getPostByPath, listPosts, postPaths, type Author, type Category, type Post, type PostPage as Listing } from "@/lib/content/posts";
import { sectorFromSlug, sectorStaticParams } from "@/lib/content/sectors";
import type { SectorId } from "@/lib/content/sectors";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { invoiceTemplatesPaths } from "@/lib/i18n/routes";

/**
 * Preserved WordPress paths that have no route of their own resolve here through
 * the content layer (docs/architecture.md §3): the 15 sector pages, at
 * /<arabic-slug>/ and /en/accounting-software-for-<sector>/, the Arabic-only
 * e-invoicing hub and its 12 guides under /الفوترة-الإلكترونية/, and the
 * Arabic-only accounting-software guide /برنامج-محاسبة/.
 *
 * The blog resolves here too, from Supabase through lib/content/posts: posts at
 * /<category>/<slug>/ (two at the root, one under /en/), news at /news/<slug>/,
 * category archives at their root paths with /page/N/, and author pages at
 * /author/<slug>/, templates at /templates/<slug>/ with their index's later pages
 * at /templates/page/N/, and the Arabic free invoice templates page at
 * /نماذج-فواتير/ (its English twin has its own route). WordPress also answered a post's slug without its category;
 * that address redirects to the post. Anything else 404s.
 */
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : "ar";
  const blog = await postPaths();
  const segments = (path: string) => ({ slug: path.split("/").filter(Boolean).slice(locale === "en" ? 1 : 0) });
  return [
    ...sectorStaticParams(locale),
    ...(locale === "ar" ? [...guideStaticParams(), { slug: [accountingGuide.segment] }, { slug: [INVOICE_TEMPLATES_SEGMENT] }] : []),
    ...blog.posts.filter((post) => post.lang === locale).map((post) => segments(post.path)),
    ...blog.categories.filter((category) => category.lang === locale).map((category) => segments(category.path)),
    ...(locale === "ar" ? blog.authors.map((author) => ({ slug: ["author", author.slug] })) : []),
  ];
}

/** The Arabic invoice templates page's one path segment. */
const INVOICE_TEMPLATES_SEGMENT = invoiceTemplatesPaths.ar.replaceAll("/", "");

interface Props {
  params: Promise<{ lang: string; slug: string[] }>;
}

type Resolved =
  | { kind: "sector"; id: SectorId; locale: Locale }
  | { kind: "guide"; id: GuideId }
  | { kind: "accounting-guide" }
  | { kind: "invoice-templates" }
  | { kind: "templates-index"; page: number }
  | { kind: "post"; post: Post }
  | { kind: "category"; category: Category; listing: Listing }
  | { kind: "author"; author: Author; listing: Listing };

/** Splits a trailing /page/N/ off a path. Page 1 has no such suffix, so "page/1" is not a page. */
function splitPage(segments: string[]): { segments: string[]; page: number } | null {
  if (segments.length >= 3 && segments.at(-2) === "page") {
    const page = Number(segments.at(-1));
    return /^[1-9]\d*$/.test(segments.at(-1) ?? "") && page >= 2 ? { segments: segments.slice(0, -2), page } : null;
  }
  return { segments, page: 1 };
}

async function resolveBlog(locale: Locale, raw: string[]): Promise<Resolved | null> {
  let decoded: string[];
  try {
    decoded = raw.map((segment) => decodeURIComponent(segment));
  } catch {
    return null;
  }
  const prefix = locale === "en" ? "/en/" : "/";
  const index = await postPaths();

  const path = `${prefix}${decoded.join("/")}/`;
  if (index.posts.some((entry) => entry.path === path && entry.lang === locale)) {
    const post = await getPostByPath(path, locale);
    if (post) return { kind: "post", post };
  }

  const paged = splitPage(decoded);
  if (locale === "ar" && paged && paged.page >= 2 && paged.segments.join("/") === "templates") {
    const { pages } = await listPosts({ lang: "ar", type: "template" });
    return paged.page <= pages ? { kind: "templates-index", page: paged.page } : null;
  }
  if (locale === "ar" && decoded.length === 1 && decoded[0] === INVOICE_TEMPLATES_SEGMENT) return { kind: "invoice-templates" };
  if (paged) {
    const listPath = `${prefix}${paged.segments.join("/")}/`;
    const category = index.categories.some((entry) => entry.path === listPath && entry.lang === locale) ? await getCategory(listPath) : null;
    if (category) {
      // The first page says how many pages there are; a page past the end is a 404, not a query.
      const first = await listPosts({ category: category.id, lang: locale });
      if (paged.page > first.pages) return null;
      const listing = paged.page === 1 ? first : await listPosts({ category: category.id, lang: locale, page: paged.page });
      return { kind: "category", category, listing };
    }
    if (locale === "ar" && paged.segments.length === 2 && paged.segments[0] === "author") {
      const author = index.authors.some((entry) => entry.slug === paged.segments[1]) ? await getAuthor(paged.segments[1]) : null;
      if (author) {
        const first = await listPosts({ author: author.id, lang: locale });
        if (paged.page > first.pages) return null;
        const listing = paged.page === 1 ? first : await listPosts({ author: author.id, lang: locale, page: paged.page });
        return { kind: "author", author, listing };
      }
    }
  }

  // A post's slug without its category: WordPress answered it, so it leads to the post.
  if (decoded.length === 1) {
    const matches = index.posts.filter((entry) => entry.lang === locale && entry.path.endsWith(`/${decoded[0]}/`));
    if (matches.length === 1) permanentRedirect(encodeURI(matches[0].path));
  }
  return null;
}

async function resolve(params: Props["params"]): Promise<Resolved> {
  const value = await lang();
  const locale: Locale = isLocale(value) ? value : "ar";
  const { slug } = await params;
  const sector = sectorFromSlug(locale, slug);
  if (sector) return { kind: "sector", id: sector, locale };
  const guide = locale === "ar" ? guideFromSlug(slug) : null;
  if (guide) return { kind: "guide", id: guide };
  if (locale === "ar" && isAccountingGuidePath(slug)) return { kind: "accounting-guide" };
  const blog = await resolveBlog(locale, slug);
  if (blog) return blog;
  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await resolve(params);
  if (page.kind === "sector") return sectorMetadata(page.id, page.locale);
  if (page.kind === "guide") return guideMetadata(page.id);
  if (page.kind === "post") return postMetadata(page.post);
  if (page.kind === "invoice-templates") return invoiceTemplatesMetadata("ar");
  if (page.kind === "templates-index") return templatesIndexMetadata(page.page);
  if (page.kind === "category") return categoryMetadata(page.category, page.listing.page);
  if (page.kind === "author") return authorMetadata(page.author, page.listing.page);
  return accountingGuideMetadata();
}

export default async function PreservedPathRoute({ params }: Props) {
  const page = await resolve(params);
  if (page.kind === "sector") return <SectorPage id={page.id} locale={page.locale} />;
  if (page.kind === "guide") return <GuidePage id={page.id} />;
  if (page.kind === "post") return <PostPage post={page.post} />;
  if (page.kind === "invoice-templates") return <InvoiceTemplatesPage locale="ar" />;
  if (page.kind === "templates-index") return <TemplatesIndex page={page.page} />;
  if (page.kind === "category") return <CategoryPage category={page.category} listing={page.listing} />;
  if (page.kind === "author") return <AuthorPage author={page.author} listing={page.listing} />;
  return <AccountingGuidePage />;
}
