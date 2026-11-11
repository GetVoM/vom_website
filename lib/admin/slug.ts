/**
 * A URL slug from a title, as WordPress made them: words joined by hyphens,
 * Arabic letters kept, diacritics and punctuation dropped.
 */
export function slugify(title: string): string {
  return title
    .normalize("NFKC")
    .replace(/[ً-ٰٟـ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

/** The public path of a post: its language prefix, its topic's path (posts only), its slug. */
export function postPath({ lang, type, categoryPath, slug }: { lang: string; type: string; categoryPath: string | null; slug: string }): string {
  if (type === "news") return `${lang === "en" ? "/en" : ""}/news/${slug}/`;
  if (type === "template") return `${lang === "en" ? "/en" : ""}/templates/${slug}/`;
  if (categoryPath) return `${categoryPath}${slug}/`;
  return `${lang === "en" ? "/en" : ""}/${slug}/`;
}
