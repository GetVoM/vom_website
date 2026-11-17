import type { Metadata } from "next";
import Link from "next/link";
import { barePath, blogCopy, listCategories, listPosts, type Author, type Category, type PostPage as Listing, type PostSummary } from "@/lib/content/posts";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { breadcrumbJsonLd, collectionJsonLd, profilePageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EntryList, Pagination } from "./EntryList";
import { BlogClose } from "./PostPage";

/** How many topics open as accounts on the blog index; the rest are listed by name. */
const OPEN_TOPICS = 10;

/**
 * Later pages are self-canonical and say which page they are in the title and
 * the description, so no two match. An empty list (`index: false`) stays out of
 * search and is not offered as the other language's twin.
 */
function listMetadata({
  locale,
  base,
  page,
  title,
  description,
  twin = false,
  index = true,
}: {
  locale: Locale;
  /** Locale-free path of page 1. */
  base: string;
  page: number;
  title: string;
  description: string;
  /** True when the same page exists in the other language at the same path. */
  twin?: boolean;
  index?: boolean;
}): Metadata {
  const c = blogCopy(locale);
  const full = page > 1 ? `${title}${c.pageSuffix(page)}` : title;
  const path = page > 1 ? `${base}page/${page}/` : base;
  const meta = buildMetadata({
    locale,
    path,
    alternatePath: twin && page === 1 ? base : null,
    title: full,
    description: page > 1 ? `${description}${c.pageSuffix(page)}` : description,
    index,
  });
  return { ...meta, title: { absolute: full } };
}

/** The page's entries as a CollectionPage: what the list is and what it lists, in order. */
function ListJsonLd({ locale, path, name, description, posts }: { locale: Locale; path: string; name: string; description: string; posts: PostSummary[] }) {
  return <JsonLd data={collectionJsonLd({ locale, path, name, description, entries: posts.map((post) => ({ name: post.title, path: post.path })) })} />;
}

function paginationLabels(locale: Locale, listing: Listing) {
  const c = blogCopy(locale);
  return { nav: c.pagination, newer: c.newer, older: c.older, position: c.page(listing.page, listing.pages) };
}

function ListHead({
  locale,
  crumbs,
  title,
  count,
  sub,
  intro,
}: {
  locale: Locale;
  crumbs: { name: string; path?: string }[];
  title: string;
  /** How many entries, or which page: set at the end of the heading line, as on a ledger account. */
  count?: string;
  /** A line under the title, such as a person's job title. */
  sub?: string;
  intro?: string | null;
}) {
  const t = getDictionary(locale);
  const trail = [{ name: t.nav.home, path: "/" }, ...crumbs];
  return (
    <header className="page-wrap blg-head">
      <JsonLd data={breadcrumbJsonLd(locale, trail.filter((crumb): crumb is { name: string; path: string } => Boolean(crumb.path)))} />
      <Breadcrumb
        items={trail.map((crumb, i) => ({ label: crumb.name, href: i < trail.length - 1 && crumb.path ? localePath(locale, crumb.path) : undefined }))}
        label={t.nav.breadcrumb}
      />
      <div className="blg-heading">
        <div className="blg-heading-row">
          <h1 className="blg-title">{title}</h1>
          {count && <p className="blg-heading-count num">{count}</p>}
        </div>
        {sub && <p className="blg-heading-sub">{sub}</p>}
        {intro && <p className="blg-intro">{intro}</p>}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------ blog index */

export function blogIndexMetadata(locale: Locale, page: number): Metadata {
  const c = blogCopy(locale);
  return listMetadata({ locale, base: "/blog/", page, title: c.blog.seoTitle, description: c.blog.description, twin: true });
}

/**
 * The blog index: topics are the ledger's accounts. The first page opens the
 * ten fullest topics, each with its count and its three latest entries, names
 * the rest, then lists the whole blog's latest entries; later pages carry the
 * entries only.
 */
export async function BlogIndex({ locale, page }: { locale: Locale; page: number }) {
  const c = blogCopy(locale);
  const listing = await listPosts({ lang: locale, page });
  const topics =
    page === 1
      ? (
          await Promise.all(
            (await listCategories())
              .filter((category) => category.lang === locale)
              .map(async (category) => {
                // The count is the whole topic; the three entries are posts filed mainly under it,
                // so one post is not listed under several topics.
                const [all, latest] = await Promise.all([
                  listPosts({ category: category.id, lang: locale, size: 1 }),
                  listPosts({ category: category.id, primaryOnly: true, lang: locale, size: 3 }),
                ]);
                return { category, total: all.total, latest };
              }),
          )
        )
          .filter((topic) => topic.total > 0)
          .sort((a, b) => b.total - a.total)
      : [];
  // A topic opens as an account when posts are filed mainly under it; every other topic is still named and linked.
  const accounts = topics.filter((topic) => topic.latest.posts.length > 0).slice(0, OPEN_TOPICS);
  const others = topics.filter((topic) => !accounts.includes(topic));

  return (
    <div className="blg">
      <ListJsonLd locale={locale} path={page > 1 ? `/blog/page/${page}/` : "/blog/"} name={c.blog.h1} description={c.blog.description} posts={listing.posts} />
      <ListHead locale={locale} crumbs={[{ name: c.blog.crumb, path: "/blog/" }]} title={c.blog.h1} count={page > 1 ? c.page(listing.page, listing.pages) : c.entries(listing.total)} />

      {topics.length > 0 && (
        <section className="page-wrap blg-accounts" aria-labelledby="blg-topics">
          <h2 id="blg-topics" className="blg-section-title">
            {c.blog.topics}
          </h2>
          <ul className="blg-account-list" role="list">
            {accounts.map(({ category, total, latest }) => (
              <li key={category.id} className="blg-account">
                <div className="blg-account-head">
                  <h3 className="blg-account-name">
                    <Link href={category.path} prefetch={false} data-track="blog_topic_clicked" data-track-topic={category.path}>
                      {category.name}
                    </Link>
                  </h3>
                  <p className="blg-account-count num">{c.entries(total)}</p>
                </div>
                <EntryList posts={latest.posts} locale={locale} level={4} compact showTopic={false} />
              </li>
            ))}
          </ul>
          {others.length > 0 && (
            <p className="blg-more-topics">
              <span>{c.blog.moreTopics}</span>
              {others.map(({ category }) => (
                <Link key={category.id} href={category.path} prefetch={false} data-track="blog_topic_clicked" data-track-topic={category.path}>
                  {category.name}
                </Link>
              ))}
            </p>
          )}
        </section>
      )}

      <section className="page-wrap blg-ledger" aria-labelledby="blg-latest">
        <h2 id="blg-latest" className="blg-section-title">
          {c.blog.latest}
        </h2>
        <EntryList posts={listing.posts} locale={locale} level={3} excerpts={page > 1} />
        <Pagination base={localePath(locale, "/blog/")} page={listing.page} pages={listing.pages} labels={paginationLabels(locale, listing)} />
      </section>

      <BlogClose locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------ news index */

/**
 * The news index exists in both languages, but each is offered to search, and
 * to the other as its twin, only while it has news to show.
 */
export async function newsIndexMetadata(locale: Locale): Promise<Metadata> {
  const c = blogCopy(locale);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const [own, twin] = await Promise.all([
    listPosts({ lang: locale, type: "news", size: 1 }),
    listPosts({ lang: other, type: "news", size: 1 }),
  ]);
  return listMetadata({
    locale,
    base: "/news/",
    page: 1,
    title: c.news.seoTitle,
    description: c.news.description,
    twin: own.total > 0 && twin.total > 0,
    index: own.total > 0,
  });
}

export async function NewsIndex({ locale }: { locale: Locale }) {
  const c = blogCopy(locale);
  const listing = await listPosts({ lang: locale, type: "news", size: 100 });
  return (
    <div className="blg">
      {listing.posts.length > 0 && <ListJsonLd locale={locale} path="/news/" name={c.news.h1} description={c.news.description} posts={listing.posts} />}
      <ListHead locale={locale} crumbs={[{ name: c.news.crumb, path: "/news/" }]} title={c.news.h1} />
      <section className="page-wrap blg-ledger" aria-label={c.news.h1}>
        {listing.posts.length > 0 ? <EntryList posts={listing.posts} locale={locale} showTopic={false} /> : <p className="blg-empty">{c.news.empty}</p>}
      </section>
      <BlogClose locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------ templates index */

export function templatesIndexMetadata(page: number): Metadata {
  const c = blogCopy("ar");
  return listMetadata({ locale: "ar", base: "/templates/", page, title: c.templates.seoTitle, description: c.templates.description });
}

/**
 * The downloadable templates, /templates/ and /templates/page/N/: Arabic only.
 * Each is an article with its files, listed as a dated entry with its cover.
 */
export async function TemplatesIndex({ page }: { page: number }) {
  const c = blogCopy("ar");
  const listing = await listPosts({ lang: "ar", type: "template", page });
  return (
    <div className="blg">
      <ListJsonLd locale="ar" path={page > 1 ? `/templates/page/${page}/` : "/templates/"} name={c.templates.h1} description={c.templates.description} posts={listing.posts} />
      <ListHead locale="ar" crumbs={[{ name: c.templates.crumb, path: "/templates/" }]} title={c.templates.h1} count={page > 1 ? c.page(listing.page, listing.pages) : undefined} />
      <section className="page-wrap blg-ledger" aria-label={c.templates.h1}>
        <EntryList posts={listing.posts} locale="ar" showTopic={false} />
        <Pagination base="/templates/" page={listing.page} pages={listing.pages} labels={paginationLabels("ar", listing)} />
      </section>
      <BlogClose locale="ar" />
    </div>
  );
}

/* ------------------------------------------------------------ category archive */

export function categoryMetadata(category: Category, page: number): Metadata {
  return listMetadata({
    locale: category.lang,
    base: barePath(category.path),
    page,
    title: category.seoTitle ?? category.name,
    description: category.seoDescription ?? category.intro ?? category.name,
  });
}

/** One account opened: the topic's heading, its intro when there is one, then its entries. */
export async function CategoryPage({ category, listing }: { category: Category; listing: Listing }) {
  const locale = category.lang;
  const c = blogCopy(locale);
  return (
    <div className="blg">
      <ListJsonLd
        locale={locale}
        path={listing.page > 1 ? `${barePath(category.path)}page/${listing.page}/` : barePath(category.path)}
        name={category.name}
        description={category.seoDescription ?? category.intro ?? category.name}
        posts={listing.posts}
      />
      <ListHead
        locale={locale}
        crumbs={[{ name: c.blog.crumb, path: "/blog/" }, { name: category.name, path: barePath(category.path) }]}
        title={category.name}
        count={listing.page > 1 ? c.page(listing.page, listing.pages) : c.entries(listing.total)}
        intro={listing.page === 1 ? category.intro : null}
      />
      <section className="page-wrap blg-ledger" aria-label={category.name}>
        <EntryList posts={listing.posts} locale={locale} showTopic={false} />
        <Pagination base={category.path} page={listing.page} pages={listing.pages} labels={paginationLabels(locale, listing)} />
      </section>
      <BlogClose locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------ author page */

/** A person's page with nothing listed yet stays out of search (`entries` is how many posts it lists). */
export function authorMetadata(author: Author, page: number, entries: number): Metadata {
  const c = blogCopy("ar");
  return listMetadata({
    locale: "ar",
    base: `/author/${author.slug}/`,
    page,
    // The brand's own page would read "VoM | ڤوم".
    title: author.name === "VoM" ? "فريق ڤوم | مدونة ڤوم" : `${author.name} | ڤوم`,
    description: c.authorDescription(author.name),
    index: entries > 0,
  });
}

/** A writer or the reviewing accountant: their name and title, then everything they wrote or reviewed. */
export async function AuthorPage({ author, listing }: { author: Author; listing: Listing }) {
  const c = blogCopy("ar");
  const base = `/author/${author.slug}/`;
  return (
    <div className="blg">
      {listing.page === 1 && <JsonLd data={profilePageJsonLd({ name: author.name, slug: author.slug, jobTitle: author.jobTitle, sameAs: author.sameAs, bio: author.bio, avatar: author.avatar })} />}
      <ListHead locale="ar" crumbs={[{ name: c.blog.crumb, path: "/blog/" }, { name: author.name, path: base }]} title={author.name} sub={author.jobTitle ?? undefined} count={listing.page > 1 ? c.page(listing.page, listing.pages) : undefined} intro={author.bio} />
      <section className="page-wrap blg-ledger" aria-labelledby="blg-author-entries">
        <h2 id="blg-author-entries" className="blg-section-title">
          {c.authorEntries(author.name)}
        </h2>
        <EntryList posts={listing.posts} locale="ar" level={3} />
        <Pagination base={base} page={listing.page} pages={listing.pages} labels={paginationLabels("ar", listing)} />
      </section>
      <BlogClose locale="ar" />
    </div>
  );
}
