import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogClose } from "@/components/blog/PostPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { guideDate } from "@/lib/content/einvoicing/copy";
import { getAuthor, type Author } from "@/lib/content/posts";
import { getToolBody, getToolOutline, siblingTools, toolCovers, toolEntry, toolPath, toolsIndex, type ToolId } from "@/lib/content/tools";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { articleJsonLd, breadcrumbJsonLd, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { toolMdxComponents } from "./mdx";
import { toolsCopy } from "./copy";

const ogImage = (id: ToolId) => `/og/tools/${id}.png`;

/** Arabic only: canonical, `ar` and `x-default` hreflang, no English twin. */
export function toolMetadata(id: ToolId): Metadata {
  const entry = toolEntry(id);
  const meta = buildMetadata({
    locale: "ar",
    path: toolPath(id),
    alternatePath: null,
    title: entry.seoTitle,
    description: entry.description,
    type: "article",
    image: ogImage(id),
  });
  return {
    ...meta,
    title: { absolute: entry.seoTitle },
    openGraph: { ...meta.openGraph, type: "article", publishedTime: entry.published, modifiedTime: entry.modified },
  };
}

const person = (author: Author) => ({ name: author.name, slug: author.slug, jobTitle: author.jobTitle, sameAs: author.sameAs });

/** The page's byline: writer, reviewer and last update, each linked to its author page. */
function Byline({ writer, reviewer, modified }: { writer: Author | null; reviewer: Author | null; modified: string }) {
  const c = toolsCopy.byline;
  return (
    <p className="tol-byline">
      {writer && (
        <span>
          {c.writer}{" "}
          <Link href={`/author/${writer.slug}/`} prefetch={false}>
            {writer.name}
          </Link>
        </span>
      )}
      {reviewer && (
        <span>
          {c.reviewer}{" "}
          <Link href={`/author/${reviewer.slug}/`} prefetch={false}>
            {reviewer.name}
          </Link>
          {reviewer.jobTitle && `، ${reviewer.jobTitle}`}
        </span>
      )}
      <span>
        {c.updated} <time dateTime={modified}>{guideDate(modified)}</time>
      </span>
    </p>
  );
}

/**
 * A calculator page: the title row on paper, then the old page's lead with its
 * calculators as full-width poster bands (the fields on a paper sheet, the
 * answer in large white figures), then the article beside its contents, the
 * other tools and the trial band.
 */
export async function ToolPage({ id }: { id: ToolId }) {
  const t = getDictionary("ar");
  const entry = toolEntry(id);
  const path = toolPath(id);
  const [{ Lead, Body }, outline, writer, reviewer] = await Promise.all([getToolBody(id), getToolOutline(id), getAuthor(entry.author), getAuthor(entry.reviewer)]);
  const components = toolMdxComponents(entry.cardTitle);
  const cover = toolCovers[id];
  const withContents = outline.sections.length >= 3;
  const crumbs = [
    { name: t.nav.home, path: "/" },
    { name: toolsIndex.h1, path: toolsIndex.path },
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          locale: "ar",
          path,
          headline: entry.h1,
          description: entry.description,
          image: `${site.url}${ogImage(id)}`,
          published: entry.published,
          modified: entry.modified,
          section: toolsIndex.h1,
          author: writer && person(writer),
          reviewer: reviewer && person(reviewer),
        })}
      />
      <JsonLd data={breadcrumbJsonLd("ar", [...crumbs, { name: entry.cardTitle, path }])} />
      {entry.calculators.map((calc) => (
        <JsonLd key={calc} data={webApplicationJsonLd({ path, anchor: calc, name: toolsCopy.apps[calc], description: entry.description })} />
      ))}

      <header className="page-wrap tol-head">
        <Breadcrumb items={[...crumbs.map((crumb) => ({ label: crumb.name, href: crumb.path })), { label: entry.cardTitle }]} label={t.nav.breadcrumb} />
        <h1 className="tol-title">{entry.h1}</h1>
        <Byline writer={writer} reviewer={reviewer} modified={entry.modified} />
      </header>

      <div className="tol-lead ein-body">
        <Lead components={components} />
      </div>

      <div className="page-wrap tol-article" data-contents={withContents || undefined}>
        {withContents && (
          <nav className="tol-contents" aria-labelledby="tol-contents-title">
            <p id="tol-contents-title" className="tol-contents-title">
              {toolsCopy.contents}
            </p>
            <ol>
              {outline.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="ein-body tol-body">
          {cover && (
            <figure className="ein-figure tol-cover">
              <Image src={cover.src} width={cover.width} height={cover.height} alt={cover.alt} sizes="(min-width: 1024px) 760px, 100vw" />
            </figure>
          )}
          <Body components={components} />
        </div>
      </div>

      <section className="tol-others" aria-labelledby="tol-others-title">
        <div className="page-wrap">
          <div className="tol-others-head">
            <h2 id="tol-others-title">{toolsCopy.others}</h2>
            <Link href={toolsIndex.path} className="tol-others-all">
              {toolsCopy.all}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <ul className="tol-others-list" role="list">
            {siblingTools(id).map((tool) => (
              <li key={tool.id}>
                <Link href={toolPath(tool.id)} prefetch={false}>
                  <span className="tol-others-name">{tool.cardTitle}</span>
                  <span className="tol-others-line">{tool.cardLine}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BlogClose locale="ar" />
    </>
  );
}
