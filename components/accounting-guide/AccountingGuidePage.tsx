import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  accountingGuide as guide,
  getAccountingGuideBody,
  getAccountingGuideOutline,
  partNumber,
} from "@/lib/content/accounting-guide";
import { einvoicingCopy, guideDate, readingTime } from "@/lib/content/einvoicing/copy";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { breadcrumbJsonLd, guideJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { ThumbIndex } from "./ThumbIndex";

/** Arabic only: canonical, `ar` and `x-default` hreflang, no English twin. */
export function accountingGuideMetadata(): Metadata {
  const meta = buildMetadata({
    locale: "ar",
    path: guide.path,
    alternatePath: null,
    title: guide.seoTitle,
    description: guide.description,
    type: "article",
    image: guide.image,
  });
  return {
    ...meta,
    title: { absolute: guide.seoTitle },
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.modified,
    },
  };
}

/** A part's title as the contents sheet and the tabs show it: without the heading's closing full stop or colon. */
const partTitle = (heading: string) => heading.replace(/[.:،]\s*$/, "");

/**
 * The accounting-software pillar as a handbook with a thumb index. The hero
 * pairs the H1 and the trial with the contents sheet on the teal field, its
 * eight parts standing off the sheet's fore-edge as tabs; the same tabs run
 * beside the text. The closing word is the teal close band, with the trial and
 * the compliance call.
 */
export async function AccountingGuidePage() {
  const t = getDictionary("ar");
  const by = einvoicingCopy.authors;
  const c = einvoicingCopy.card;
  const booking = einvoicingCopy.booking;
  const [{ Body, closing, closingCta }, outline] = await Promise.all([getAccountingGuideBody(), getAccountingGuideOutline()]);
  const parts = outline.sections.map((section, i) => ({ ...section, number: partNumber(i), title: partTitle(section.heading) }));
  const last = parts.at(-1);

  return (
    <>
      <JsonLd
        data={guideJsonLd({
          path: guide.path,
          headline: guide.h1,
          name: guide.seoTitle,
          description: guide.description,
          image: guide.image,
          published: guide.published,
          modified: guide.modified,
          author: by.writer,
          reviewer: { name: by.reviewer, jobTitle: by.reviewerTitle },
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd("ar", [
          { name: t.nav.home, path: "/" },
          { name: guide.crumb, path: guide.path },
        ])}
      />
      {/* Each chapter plate's reading time, under its H2 (the H2s are the MDX's own tags). */}
      <style
        dangerouslySetInnerHTML={{
          __html: parts
            .slice(0, -1)
            .map((part) => `#${part.id}::after{content:"${readingTime(part.minutes)}"}`)
            .join(""),
        }}
      />

      {/* From 1024 px a grid keeps a track free beside the text for the tab column;
          the tabs themselves are fixed and appear once the hero sheet has gone. */}
      <div className="acg-page">
        <ThumbIndex
          tabs={parts.map(({ id, number, title }) => ({ id, number, title }))}
          label={guide.thumbsLabel}
          after="acg-contents"
          until="acg-close"
        />

        <header className="acg-hero">
          <div className="page-wrap acg-hero-grid">
            <div className="acg-hero-copy">
              <Breadcrumb
                items={[{ label: t.nav.home, href: localePath("ar", "/") }, { label: guide.crumb }]}
                label={t.nav.breadcrumb}
              />
              <h1 className="acg-title">{guide.h1}</h1>
              <p className="acg-lede">{guide.heroLine}</p>
              <ButtonLink href={site.signup.ar} arrow className="acg-hero-cta">
                {guide.heroCta}
              </ButtonLink>
              <ul className="ein-phase-points acg-trust" role="list" aria-label={guide.trustLabel}>
                {einvoicingCopy.phaseTwo.points.map((point, i) => (
                  <li key={i} data-icon={i}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="acg-stage">
              <div className="acg-field guilloche-tile" aria-hidden="true" />
              <nav id="acg-contents" className="acg-sheet" aria-labelledby="acg-contents-title">
                <p className="acg-sheet-head">
                  <span id="acg-contents-title">{guide.contents}</span>
                  <span className="acg-sheet-total">{readingTime(outline.minutes)}</span>
                </p>
                <ol className="acg-sheet-rows" role="list">
                  {parts.map((part, i) => (
                    <li key={part.id} style={{ "--i": i } as CSSProperties}>
                      <a href={`#${part.id}`}>
                        {/* No dir="ltr" here: the tab's logical offsets follow its own direction. */}
                        <span className="acg-tab num">{part.number}</span>
                        <span className="acg-sheet-title">{part.title}</span>
                        <span className="acg-sheet-time">{readingTime(part.minutes)}</span>
                      </a>
                    </li>
                  ))}
                </ol>
                <dl className="ein-card-lines acg-byline">
                  <div>
                    <dt>{c.writer}</dt>
                    <dd>{by.writer}</dd>
                  </div>
                  <div>
                    <dt>{c.reviewer}</dt>
                    <dd>
                      {by.reviewer}، {by.reviewerTitle}
                    </dd>
                  </div>
                  <div>
                    <dt>{c.updated}</dt>
                    <dd>
                      <time dateTime={guide.modified.slice(0, 10)}>{guideDate(guide.modified)}</time>
                    </dd>
                  </div>
                </dl>
              </nav>
            </div>
          </div>
        </header>

        <article className="ein-body acg-prose">
          <Body />
        </article>
      </div>

      {last && (
        <section id="acg-close" className="sec-close-band guilloche-dark guilloche-tile acg-close" aria-labelledby={last.id}>
          <div className="page-wrap acg-close-inner">
            <span className="acg-close-num num" dir="ltr" aria-hidden="true">
              {last.number}
            </span>
            <div className="acg-close-body">
              {closing}
              <div className="acg-close-actions">
                <ButtonLink href={site.signup.ar} arrow>
                  {closingCta}
                </ButtonLink>
              </div>
              <aside className="acg-close-booking" aria-label={booking.line}>
                <p>
                  <strong>{booking.question}</strong> {booking.line}
                </p>
                <ButtonLink href={site.demo} variant="inverse" newTab={booking.newTab}>
                  {booking.cta}
                </ButtonLink>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
