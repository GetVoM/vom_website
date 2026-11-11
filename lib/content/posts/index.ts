import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Locale } from "@/lib/i18n/config";
import { publicSupabase } from "@/lib/supabase/public";
import type { Tables } from "@/lib/supabase/types";
import { blogCopy } from "./copy";
import { preparePostHtml } from "./html";
import type { Author, Category, FaqItem, PathIndex, Post, PostPage, PostSummary, PostType } from "./types";

export type * from "./types";
export type { PostSection } from "./html";
export { barePath, blogCopy, postDate, type BlogCopy } from "./copy";

/**
 * Posts, news, categories and authors, read from Supabase. Pages read them only
 * through this layer. Every read is cached until its tag is revalidated: the
 * admin's save and publish actions, and /api/revalidate, call
 * `revalidateTag(tag, "max")` with the tags named here.
 *
 *   posts            any list, the path index, related posts
 *   post-<id>        one post
 *   categories       the category list
 *   category-<id>    one category and its lists
 *   authors          authors and their pages
 */

/** Posts per page on the blog index and the category archives. */
// WordPress listed 15 a page, so /blog/page/N/ and /<category>/page/N/ keep their old page numbers.
export const POSTS_PER_PAGE = 15;

const asLocale = (value: string): Locale => (value === "en" ? "en" : "ar");
const asType = (value: string): PostType => (value === "news" || value === "template" ? value : "post");

function failed(what: string, error: { message: string }): never {
  throw new Error(`Supabase: could not read ${what}: ${error.message}`);
}

function toAuthor(row: Tables<"authors">): Author {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    jobTitle: row.job_title,
    bio: row.bio,
    avatar: row.avatar,
    sameAs: row.same_as,
    credentials: row.credentials,
  };
}

function toCategory(row: Tables<"categories">): Category {
  return {
    id: row.id,
    path: row.path,
    slug: row.slug,
    name: row.name,
    lang: asLocale(row.lang),
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    intro: row.intro,
  };
}

const SUMMARY_COLUMNS =
  "id, type, lang, path, title, excerpt, cover_image, cover_alt, cover_width, cover_height, published_at, modified_at, primary_category:categories!posts_primary_category_id_fkey(id, path, name)" as const;

interface SummaryRow {
  id: string;
  type: string;
  lang: string;
  path: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  cover_width: number | null;
  cover_height: number | null;
  published_at: string | null;
  modified_at: string | null;
  primary_category: { id: string; path: string; name: string } | null;
}

function toSummary(row: SummaryRow): PostSummary {
  // A published row always has its date (a table constraint).
  const publishedAt = row.published_at ?? "";
  return {
    id: row.id,
    type: asType(row.type),
    lang: asLocale(row.lang),
    path: row.path,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: row.cover_image,
    coverAlt: row.cover_alt,
    coverSize: row.cover_width && row.cover_height ? { width: row.cover_width, height: row.cover_height } : null,
    publishedAt,
    modifiedAt: row.modified_at ?? publishedAt,
    primaryCategory: row.primary_category,
  };
}

function toFaq(value: unknown): FaqItem[] | null {
  if (!Array.isArray(value)) return null;
  const items = value.filter(
    (item): item is FaqItem =>
      typeof item === "object" && item !== null && typeof item.question === "string" && typeof item.answer === "string",
  );
  return items.length > 0 ? items : null;
}

/**
 * Every published address in one read. The catch-all route resolves against
 * this, so an unknown URL is a 404 without a database query of its own.
 */
export async function postPaths(): Promise<PathIndex> {
  "use cache";
  cacheLife("max");
  cacheTag("posts", "categories", "authors");
  const db = publicSupabase();
  const [posts, categories, authors] = await Promise.all([
    db.from("posts").select("id, path, type, lang, published_at, modified_at").eq("status", "published").order("path").limit(5000),
    db.from("categories").select("id, path, lang").order("path").limit(1000),
    db.from("authors").select("id, slug").order("slug").limit(1000),
  ]);
  if (posts.error) failed("the post paths", posts.error);
  if (categories.error) failed("the category paths", categories.error);
  if (authors.error) failed("the author slugs", authors.error);
  return {
    posts: posts.data.map((row) => ({
      id: row.id,
      path: row.path,
      type: asType(row.type),
      lang: asLocale(row.lang),
      modifiedAt: row.modified_at ?? row.published_at ?? "",
    })),
    categories: categories.data.map((row) => ({ id: row.id, path: row.path, lang: asLocale(row.lang) })),
    authors: authors.data,
  };
}

async function getPost(id: string): Promise<Post | null> {
  "use cache";
  cacheLife("max");
  cacheTag(`post-${id}`, "authors", "categories");
  const { data, error } = await publicSupabase()
    .from("posts")
    .select(
      `${SUMMARY_COLUMNS}, slug, seo_title, seo_description, content_html, faq, alternate_post_id,
       author:authors!posts_author_id_fkey(*),
       reviewer:authors!posts_reviewed_by_id_fkey(*),
       post_categories(category:categories(*))`,
    )
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();
  if (error) failed(`post ${id}`, error);
  if (!data) return null;
  // The twin counts only while it is published, which the path index knows.
  const alternate = data.alternate_post_id
    ? (await postPaths()).posts.find((post) => post.id === data.alternate_post_id)
    : undefined;
  const summary = toSummary(data);
  const body = preparePostHtml(data.content_html, blogCopy(summary.lang).table);
  return {
    ...summary,
    sections: body.sections,
    // 200 words a minute, as on the guides.
    minutes: Math.max(1, Math.round(body.words / 200)),
    slug: data.slug,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    contentHtml: body.html,
    categories: data.post_categories.map((link) => toCategory(link.category)),
    author: data.author ? toAuthor(data.author) : null,
    reviewer: data.reviewer ? toAuthor(data.reviewer) : null,
    faq: toFaq(data.faq),
    alternatePath: alternate?.path ?? null,
  };
}

/** A published post or news item at its public path (decoded, both slashes), or null. */
export async function getPostByPath(path: string, lang: Locale): Promise<Post | null> {
  const index = await postPaths();
  const entry = index.posts.find((post) => post.path === path && post.lang === lang);
  return entry ? getPost(entry.id) : null;
}

/**
 * One page of published posts, newest first. `category` is a category id and
 * `author` an author id (posts they wrote or reviewed); without either the list
 * is the whole blog (or all news, with `type: "news"`). `size` shortens the page.
 */
export async function listPosts({
  category,
  primaryOnly = false,
  author,
  page = 1,
  lang,
  type = "post",
  size = POSTS_PER_PAGE,
}: {
  category?: string;
  /** With `category`: only posts whose main topic it is. */
  primaryOnly?: boolean;
  author?: string;
  page?: number;
  lang: Locale;
  type?: PostType;
  size?: number;
}): Promise<PostPage> {
  "use cache";
  cacheLife("max");
  if (category) cacheTag("posts", `category-${category}`);
  else if (author) cacheTag("posts", "authors");
  else cacheTag("posts");
  const from = (page - 1) * size;
  // The inner join keeps only posts filed under the category.
  const columns = category && !primaryOnly ? `${SUMMARY_COLUMNS}, post_categories!inner(category_id)` : SUMMARY_COLUMNS;
  let query = publicSupabase()
    .from("posts")
    .select(columns, { count: "exact" })
    .eq("status", "published")
    .eq("lang", lang);
  // A person's page lists everything of theirs, posts and news alike.
  if (!author) query = query.eq("type", type);
  if (category) query = primaryOnly ? query.eq("primary_category_id", category) : query.eq("post_categories.category_id", category);
  if (author) query = query.or(`author_id.eq.${author},reviewed_by_id.eq.${author}`);
  const { data, error, count } = await query
    .order("published_at", { ascending: false })
    .order("id")
    .range(from, from + size - 1)
    .overrideTypes<SummaryRow[], { merge: false }>();
  if (error) failed("the post list", error);
  const total = count ?? 0;
  return { posts: data.map(toSummary), page, pages: Math.max(1, Math.ceil(total / size)), total };
}

export async function listCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("max");
  cacheTag("categories");
  const { data, error } = await publicSupabase().from("categories").select("*").order("name").limit(1000);
  if (error) failed("the categories", error);
  return data.map(toCategory);
}

/** A category at its public path (decoded, both slashes), or null. */
export async function getCategory(path: string): Promise<Category | null> {
  const categories = await listCategories();
  return categories.find((category) => category.path === path) ?? null;
}

export async function getAuthor(slug: string): Promise<Author | null> {
  "use cache";
  cacheLife("max");
  cacheTag("authors");
  const { data, error } = await publicSupabase().from("authors").select("*").eq("slug", slug).maybeSingle();
  if (error) failed(`author ${slug}`, error);
  return data ? toAuthor(data) : null;
}

/** The three latest posts that share the post's primary category. */
export async function relatedPosts(id: string): Promise<PostSummary[]> {
  "use cache";
  cacheLife("max");
  cacheTag("posts", `post-${id}`);
  const db = publicSupabase();
  const { data: post, error: postError } = await db
    .from("posts")
    .select("primary_category_id, lang, type")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();
  if (postError) failed(`post ${id}`, postError);
  if (!post?.primary_category_id) return [];
  const { data, error } = await db
    .from("posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .eq("lang", post.lang)
    .eq("type", post.type)
    .eq("primary_category_id", post.primary_category_id)
    .neq("id", id)
    .order("published_at", { ascending: false })
    .limit(3);
  if (error) failed("the related posts", error);
  return data.map(toSummary);
}
