import type { Metadata } from "next";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { barePath, blogCopy, postDate, relatedPosts, type Author, type Post } from "@/lib/content/posts";
import { coverShareImage } from "@/lib/images";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata, fallbackImage } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { ReadTracker } from "@/components/analytics/ReadTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { EntryList } from "./EntryList";
import { MarginContents } from "./MarginContents";

const description = (post: Post) => post.seoDescription ?? post.excerpt ?? post.title;
const authorPath = (author: Author) => `/author/${author.slug}/`;

export function postMetadata(post: Post): Metadata {
  const title = post.seoTitle ?? `${post.title} | ${site.name[post.lang]}`;
  // Shared links show a JPEG made from the cover (scripts/optimize-media.mjs): not every
  // network reads WebP. Until it exists the cover itself is the share image.
  const share = post.coverImage ? coverShareImage(post.coverImage) : null;
  const meta = buildMetadata({
    locale: post.lang,
    path: barePath(post.path),
    alternatePath: post.alternatePath ? barePath(post.alternatePath) : null,
    title,
    description: description(post),
    type: "article",
    image: share?.src ?? post.coverImage ?? undefined,
    imageSize: share ?? post.coverSize,
  });
  return {
    ...meta,
    // The live page's full title, not the "%s | VoM" template.
    title: { absolute: title },
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      ...(post.author && { authors: [`${site.url}${encodeURI(authorPath(post.author))}`] }),
      ...(post.primaryCategory && { section: post.primaryCategory.name }),
    },
  };
}

/** The closing teal band every blog page ends on: one line and the trial. */
export function BlogClose({ locale }: { locale: Locale }) {
  const c = blogCopy(locale);
  return (
    <section className="sec-close-band guilloche-dark guilloche-tile text-white" aria-label={c.close.cta}>
      <div className="page-wrap sec-close">
        <p className="sec-close-line">{c.close.line}</p>
        <div className="sec-close-actions">
          <ButtonLink href={site.signup[locale]} arrow>
            {c.close.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/**
 * A blog post, news item or template on the ledger page: a ruled heading (date, topic,
 * title), then the sheet, split by one teal rule into the margin, which holds
 * the numbered contents and the trial card, and the column where the article runs. The byline
 * names the writer and the accountant who reviewed it; related entries and the
 * trial close the page.
 */
export async function PostPage({ post }: { post: Post }) {
  const locale = post.lang;
  const t = getDictionary(locale);
  const c = blogCopy(locale);
  const related = await relatedPosts(post.id);
  const index =
    post.type === "news"
      ? { name: c.news.crumb, path: "/news/" }
      : post.type === "template"
        ? { name: c.templates.crumb, path: "/templates/" }
        : { name: c.blog.crumb, path: "/blog/" };
  const topic = post.type === "post" ? post.primaryCategory : null;
  const crumbs = [
    { name: t.nav.home, path: "/" },
    index,
    ...(topic ? [{ name: topic.name, path: barePath(topic.path) }] : []),
  ];
  // The reviewer's title is recorded in Arabic only; an English page omits it rather than show Arabic.
  const reviewerTitle = post.reviewer?.jobTitle && (locale === "ar" || !/[\u0600-\u06FF]/.test(post.reviewer.jobTitle)) ? post.reviewer.jobTitle : null;
  const person = (who: Author) => ({ name: who.name, slug: who.slug, jobTitle: who.jobTitle, sameAs: who.sameAs });
  // The markup says what the page shows: on an English page the reviewer's Arabic title is left out of both.
  const reviewer = post.reviewer && { ...person(post.reviewer), jobTitle: reviewerTitle };

  return (
    <article className="blg" data-sections={post.sections.length > 0 || undefined}>
      <ReadTracker body=".blg-body" contentType={post.type} locale={locale} />
      <JsonLd
        data={articleJsonLd({
          locale,
          path: barePath(post.path),
          headline: post.title,
          description: description(post),
          // Without a cover the article names the share card the page already sends as og:image,
          // so every Article has the image search engines ask for.
          image: post.coverImage ?? `${site.url}${fallbackImage(locale)}`,
          imageSize: post.coverImage ? post.coverSize : { width: 1200, height: 630 },
          news: post.type === "news",
          published: post.publishedAt,
          modified: post.modifiedAt,
          section: topic?.name ?? null,
          author: post.author && person(post.author),
          reviewer,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(locale, [...crumbs, { name: post.title, path: barePath(post.path) }])} />

      <header className="page-wrap blg-head">
        <Breadcrumb
          items={[...crumbs.map((crumb) => ({ label: crumb.name, href: localePath(locale, crumb.path) })), { label: post.title }]}
          label={t.nav.breadcrumb}
        />
        <div className="blg-heading">
          <p className="blg-heading-line">
            <time className="num" dateTime={post.publishedAt.slice(0, 10)}>
              {postDate(post.publishedAt, locale)}
            </time>
            {topic && (
              <Link href={topic.path} prefetch={false} data-track="blog_topic_clicked" data-track-topic={topic.path}>
                {topic.name}
              </Link>
            )}
            <span className="num">{c.minutes(post.minutes)}</span>
          </p>
          <h1 className="blg-title">{post.title}</h1>
        </div>
      </header>

      <div className="page-wrap">
        <div className="blg-sheet">
        {post.sections.length > 0 && (
          <div className="blg-aside">
            <div className="blg-aside-stick">
              <MarginContents sections={post.sections} title={c.contents} />
              <aside className="blg-trial" aria-labelledby="blg-trial" data-track-section="margin_card">
                <h2 id="blg-trial" className="blg-trial-title">
                  {c.trial.heading}
                </h2>
                <p className="blg-trial-body">{c.trial.body}</p>
                <ButtonLink href={site.signup[locale]} arrow>
                  {c.trial.cta}
                </ButtonLink>
              </aside>
            </div>
          </div>
        )}

        <div className="blg-col">
          <dl className="blg-byline">
            {post.author && (
              <div>
                <dt>{c.writtenBy}</dt>
                <dd>
                  <Link href={authorPath(post.author)} prefetch={false} data-track="author_link_clicked" data-track-role="author">
                    {post.author.name}
                  </Link>
                </dd>
              </div>
            )}
            {post.reviewer && (
              <div className="blg-byline-reviewer">
                <dt>{c.reviewedBy}</dt>
                <dd>
                  <Link href={authorPath(post.reviewer)} prefetch={false} data-track="author_link_clicked" data-track-role="reviewer">
                    {post.reviewer.name}
                  </Link>
                  {reviewerTitle && <span className="blg-byline-title">{reviewerTitle}</span>}
                  <span className="blg-mark" aria-hidden="true">
                    {c.reviewedMark}
                  </span>
                </dd>
              </div>
            )}
            <div>
              <dt>{post.reviewer ? c.lastReviewed : c.published}</dt>
              <dd>
                <time className="num" dateTime={(post.reviewer ? post.modifiedAt : post.publishedAt).slice(0, 10)}>
                  {postDate(post.reviewer ? post.modifiedAt : post.publishedAt, locale)}
                </time>
              </dd>
            </div>
          </dl>

          {post.coverImage && post.coverSize && (
            <figure className="blg-cover">
              <Image
                src={post.coverImage}
                alt={post.coverAlt ?? ""}
                width={post.coverSize.width}
                height={post.coverSize.height}
                sizes="(min-width: 1280px) 880px, (min-width: 1024px) 70vw, 100vw"
                preload
                fetchPriority="high"
              />
            </figure>
          )}

          {/* The stored HTML is the editor's own output, sanitised when it was saved. */}
          <div className="blg-body" data-track-section="post_body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </div>
      </div>

      {related.length > 0 && (
        <section className="page-wrap blg-related" aria-labelledby="blg-related" data-track-section="related_posts">
          <h2 id="blg-related" className="blg-related-title">
            {c.related}
          </h2>
          <EntryList posts={related} locale={locale} level={3} showTopic={false} />
        </section>
      )}

      <BlogClose locale={locale} />
    </article>
  );
}
