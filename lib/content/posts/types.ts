import type { Locale } from "@/lib/i18n/config";

export type PostType = "post" | "news" | "template";

export interface Author {
  id: string;
  slug: string;
  name: string;
  jobTitle: string | null;
  bio: string | null;
  avatar: string | null;
  sameAs: string[];
  credentials: string | null;
}

export interface Category {
  id: string;
  /** The public path, decoded, with both slashes: `/accounting/`. */
  path: string;
  slug: string;
  name: string;
  lang: Locale;
  seoTitle: string | null;
  seoDescription: string | null;
  intro: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** What a list or a card needs: no body. */
export interface PostSummary {
  id: string;
  type: PostType;
  lang: Locale;
  /** The public path, decoded, with both slashes; English paths start with `/en/`. */
  path: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  coverAlt: string | null;
  coverSize: { width: number; height: number } | null;
  publishedAt: string;
  modifiedAt: string;
  primaryCategory: Pick<Category, "id" | "path" | "name"> | null;
}

export interface Post extends PostSummary {
  /** The body's H2 headings, in order, with the ids they carry in `contentHtml`. */
  sections: { id: string; heading: string }[];
  /** Reading time in minutes. */
  minutes: number;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  /** Sanitised HTML, prepared for the page (heading ids, image sizes); the editor document stays in the database. */
  contentHtml: string;
  categories: Category[];
  author: Author | null;
  reviewer: Author | null;
  faq: FaqItem[] | null;
  /** The same post in the other language, when there is one. */
  alternatePath: string | null;
}

export interface PostPage {
  posts: PostSummary[];
  page: number;
  pages: number;
  total: number;
}

/** Every public blog address, for the catch-all route and the sitemap. */
export interface PathIndex {
  posts: { id: string; path: string; type: PostType; lang: Locale; modifiedAt: string }[];
  categories: { id: string; path: string; lang: Locale }[];
  authors: { id: string; slug: string }[];
}
