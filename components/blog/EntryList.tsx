import Link from "next/link";
import { postDate, type PostSummary } from "@/lib/content/posts";
import type { Locale } from "@/lib/i18n/config";
import { optimizedSrc } from "@/lib/image-url";

/**
 * Posts as dated ledger entries: the date in the margin column, then the title,
 * its excerpt and its topic, with the cover as a small plate. `level` is the
 * heading level of the titles; `compact` drops the excerpt and the plate.
 */
export function EntryList({
  posts,
  locale,
  level = 2,
  compact = false,
  showTopic = true,
  excerpts = true,
}: {
  posts: PostSummary[];
  locale: Locale;
  level?: 2 | 3 | 4;
  compact?: boolean;
  showTopic?: boolean;
  /** False on the blog index's first page, which already carries the topics. */
  excerpts?: boolean;
}) {
  const Title = level === 2 ? "h2" : level === 3 ? "h3" : "h4";
  return (
    <ol className="blg-entries" data-compact={compact || undefined} role="list">
      {posts.map((post) => (
        <li key={post.id} className="blg-entry">
          <time className="blg-entry-date num" dateTime={post.publishedAt.slice(0, 10)}>
            {postDate(post.publishedAt, locale)}
          </time>
          <div className="blg-entry-text">
            <Title className="blg-entry-title">
              <Link href={post.path} prefetch={false}>
                {post.title}
              </Link>
            </Title>
            {!compact && excerpts && post.excerpt && <p className="blg-entry-excerpt">{post.excerpt}</p>}
            {showTopic && post.primaryCategory && (
              <p className="blg-entry-topic">
                <Link href={post.primaryCategory.path} prefetch={false}>
                  {post.primaryCategory.name}
                </Link>
              </p>
            )}
          </div>
          {!compact && post.coverImage && (
            // The alt is empty: the title beside it already names the post.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="blg-entry-plate" src={optimizedSrc(post.coverImage, 384)} alt="" width={192} height={108} loading="lazy" decoding="async" />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Newer and older pages. Page 1 lives at `base`, the rest at `base` + `page/N/`. */
export function Pagination({
  base,
  page,
  pages,
  labels,
}: {
  base: string;
  page: number;
  pages: number;
  labels: { nav: string; newer: string; older: string; position: string };
}) {
  if (pages <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}page/${n}/`);
  return (
    <nav className="blg-pages" aria-label={labels.nav}>
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" prefetch={false} className="blg-pages-link">
          {labels.newer}
        </Link>
      ) : (
        <span />
      )}
      <p className="blg-pages-position num">{labels.position}</p>
      {page < pages ? (
        <Link href={href(page + 1)} rel="next" prefetch={false} className="blg-pages-link">
          {labels.older}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
