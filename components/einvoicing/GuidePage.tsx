import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  cardNumber,
  einvoicingCopy as copy,
  getGuideBody,
  getGuideOutline,
  guideEntry,
  guidePath,
  guides,
  nextGuide,
  relatedGuides,
  topics,
  type GuideId,
} from "@/lib/content/einvoicing";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { zatcaPhase2Paths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, guideJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { CatalogueRail, type RailCard } from "./CatalogueRail";
import { DrawerCard, NextCard, PinnedCard } from "./IndexCard";

const ogImage = (id: GuideId) => `/og/e-invoicing/${id}.png`;

/**
 * Canonical, `ar` and `x-default` hreflang. The guides are Arabic only; the hub's
 * English twin is the ZATCA Phase 2 page (owner, 2026-11-12).
 */
export function guideMetadata(id: GuideId): Metadata {
  const entry = guideEntry(id);
  const meta = buildMetadata({
    locale: "ar",
    path: guidePath(id),
    alternatePath: id === "hub" ? zatcaPhase2Paths.en : null,
    title: entry.seoTitle,
    description: entry.description,
    type: "article",
    image: ogImage(id),
  });
  return {
    ...meta,
    title: { absolute: entry.seoTitle },
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: entry.published,
      modifiedTime: entry.modified,
    },
  };
}

function railCard(id: GuideId): RailCard {
  const entry = guideEntry(id);
  return { id, number: cardNumber(entry.number), title: entry.cardTitle, href: guidePath(id) };
}

/** The hub's drawer: four topic dividers on the teal field, each with its cards filed under it. */
async function CatalogueField() {
  const outlines = await Promise.all(guides.map((guide) => getGuideOutline(guide.id)));
  const minutes = new Map(guides.map((guide, i) => [guide.id, outlines[i].minutes]));
  return (
    <section className="ein-field guilloche-tile" aria-labelledby="ein-catalogue-heading">
      <div className="page-wrap">
        <div className="ein-field-head">
          <h2 id="ein-catalogue-heading" className="ein-field-title">
            {copy.catalogueHeading}
          </h2>
          <p className="ein-field-lede">{copy.catalogueLede}</p>
        </div>
        <ol className="ein-drawers" role="list">
          {topics.map((topic) => {
            const cards = guides.filter((guide) => guide.topic === topic.id);
            return (
              <li key={topic.id} className="ein-drawer">
                <h3 className="ein-drawer-tab">
                  <span>{topic.name}</span>
                  <span className="num ein-drawer-count" dir="ltr">
                    {cards.length}
                  </span>
                </h3>
                <ol className="ein-drawer-cards" role="list">
                  {cards.map((guide) => (
                    <li key={guide.id} style={{ "--n": guide.number - 1 } as CSSProperties}>
                      <DrawerCard entry={guide} minutes={minutes.get(guide.id) ?? 1} />
                    </li>
                  ))}
                </ol>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** The old pages' closing offer; the form became a link to the booking calendar (owner, 2026-11-10). */
function BookingCard() {
  const b = copy.booking;
  return (
    <aside className="ein-booking" aria-label={b.line}>
      <p className="ein-booking-line">
        <span>{b.question}</span> {b.line}
      </p>
      <ButtonLink href={site.demo} variant="secondary" newTab={b.newTab} className="ein-booking-cta">
        {b.cta}
      </ButtonLink>
    </aside>
  );
}

/**
 * One page of the e-invoicing catalogue: the hub (card 00) or a guide. The title
 * row pins the page's index card beside its H1; the hub then opens its drawer of
 * twelve cards on the teal field; the body reads beside the catalogue rail and
 * ends with the next card and the booking offer.
 */
export async function GuidePage({ id }: { id: GuideId }) {
  const t = getDictionary("ar");
  const entry = guideEntry(id);
  const isHub = entry.number === 0;
  const path = guidePath(id);
  const hubPath = guidePath("hub");
  const [{ Body, lede }, outline] = await Promise.all([getGuideBody(id), getGuideOutline(id)]);
  const next = nextGuide(id);
  const nextOutline = await getGuideOutline(next.id);

  const crumbs = isHub
    ? [{ label: t.nav.home, href: localePath("ar", "/") }, { label: copy.hubCrumb }]
    : [
        { label: t.nav.home, href: localePath("ar", "/") },
        { label: copy.hubCrumb, href: hubPath },
        { label: entry.cardTitle },
      ];
  const crumbData = isHub
    ? [
        { name: t.nav.home, path: "/" },
        { name: copy.hubCrumb, path },
      ]
    : [
        { name: t.nav.home, path: "/" },
        { name: copy.hubCrumb, path: hubPath },
        { name: entry.cardTitle, path },
      ];

  return (
    <>
      <JsonLd
        data={guideJsonLd({
          path,
          headline: entry.h1,
          name: entry.seoTitle,
          description: entry.description,
          image: ogImage(id),
          published: entry.published,
          modified: entry.modified,
          author: copy.authors.writer,
          reviewer: { name: copy.authors.reviewer, jobTitle: copy.authors.reviewerTitle },
          ...(!isHub && { partOf: { path: hubPath, headline: guideEntry("hub").h1 } }),
        })}
      />
      <JsonLd data={breadcrumbJsonLd("ar", crumbData)} />

      {/* One wrapper, so the catalogue bar sticks under the header from the top of
          the page on phones; from 1024 px a grid puts the rail beside the text. */}
      <div className="ein-page">
        <CatalogueRail
          hub={railCard("hub")}
          topics={topics.map((topic) => ({
            id: topic.id,
            name: topic.name,
            cards: guides.filter((guide) => guide.topic === topic.id).map((guide) => railCard(guide.id)),
          }))}
          currentId={id}
          sections={outline.sections}
          title={copy.catalogue}
          label={copy.catalogueLabel}
        />
        <div className="ein-top">
          <header className="page-wrap ein-head" data-hub={isHub || undefined}>
            <div className="ein-head-copy">
              <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
              <h1 className="ein-title">{entry.h1}</h1>
              {lede && <p className="ein-lede">{lede}</p>}
            </div>
            <PinnedCard
              entry={entry}
              minutes={outline.minutes}
              related={relatedGuides(id)}
              cardCount={isHub ? guides.length - 1 : undefined}
            />
          </header>
          {isHub && <CatalogueField />}
        </div>
        <article className="ein-body">
          <Body />
          <footer className="ein-end">
            <NextCard entry={next} minutes={nextOutline.minutes} />
            <BookingCard />
          </footer>
        </article>
      </div>
    </>
  );
}
