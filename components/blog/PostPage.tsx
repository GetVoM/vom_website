import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { barePath, blogCopy, postDate, relatedPosts, type Author, type Post } from "@/lib/content/posts";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { EntryList } from "./EntryList";
import { MarginContents } from "./MarginContents";

const description = (post: Post) => post.seoDescription ?? post.excerpt ?? post.title;
const authorPath = (author: Author) => `/author/${author.slug}/`;

export function postMetadata(post: Post): Metadata {
  const title = post.seoTitle ?? `${post.title} | ${site.name[post.lang]}`;
  const meta = buildMetadata({
    locale: post.lang,
    path: barePath(post.path),
    alternatePath: post.alternatePath ? barePath(post.alternatePath) : null,
    title,
    description: description(post),
    type: "article",
    image: post.coverImage ?? undefined,
  });
  return {
    ...meta,
    // The live page's full title, not the "%s | VoM" template.
    title: { absolute: title },
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.publishedAt, modifiedTime: post.modifiedAt },
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
 * the numbered contents, and the column where the article runs. The byline
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

  return (
    <article className="blg" data-sections={post.sections.length > 0 || undefined}>
      <JsonLd
        data={articleJsonLd({
          locale,
          path: barePath(post.path),
          headline: post.title,
          description: description(post),
          image: post.coverImage,
          published: post.publishedAt,
          modified: post.modifiedAt,
          section: topic?.name ?? null,
          author: post.author && person(post.author),
          reviewer: post.reviewer && person(post.reviewer),
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
              <Link href={topic.path} prefetch={false}>
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
        {post.sections.length > 0 && <MarginContents sections={post.sections} title={c.contents} />}

        <div className="blg-col">
          <dl className="blg-byline">
            {post.author && (
              <div>
                <dt>{c.writtenBy}</dt>
                <dd>
                  <Link href={authorPath(post.author)} prefetch={false}>
                    {post.author.name}
                  </Link>
                </dd>
              </div>
            )}
            {post.reviewer && (
              <div className="blg-byline-reviewer">
                <dt>{c.reviewedBy}</dt>
                <dd>
                  <Link href={authorPath(post.reviewer)} prefetch={false}>
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
          <div className="blg-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </div>
      </div>

      {related.length > 0 && (
        <section className="page-wrap blg-related" aria-labelledby="blg-related">
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
