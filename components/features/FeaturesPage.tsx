import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  exhibitSizes,
  exhibitSrc,
  getFeatures,
  moduleExhibits,
  modulePhotos,
  partnerIds,
  partnerMarks,
  partnerPaths,
  photoSizes,
  photoSrc,
  apiDocs,
  type FeatureEntry,
  type FeatureModule,
  type FeaturesCopy,
  type ModuleId,
} from "@/lib/content/features";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { featuresPaths, pricingPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, softwareJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ExhibitStack } from "./ExhibitStack";

export function featuresMetadata(locale: Locale): Metadata {
  const { title, description } = getFeatures(locale).seo;
  const meta = buildMetadata({
    locale,
    path: featuresPaths[locale],
    alternatePath: featuresPaths[otherLocale(locale)],
    title,
    description,
    image: `/og/features-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/** The sheets' widest display width; images carry it so their srcset holds only 1x and 2x. */
const SHEET_WIDTH = 480;

/** Each partner mark's display width on the marks sheet (CSS sets the height). */
const markWidth = { foodics: 192, zid: 96, marn: 160 } as const;

function displaySize(size: { width: number; height: number }, width: number) {
  return { width, height: Math.round((size.height / size.width) * width) };
}

/** How many entries a section holds, as its count and the register's total state it. */
function entryCount(module: FeatureModule, c: FeaturesCopy): number {
  if (module.id === "reports") return c.reports.featured.length + c.reports.index.length;
  if (module.id === "apps") return partnerIds.length + 1;
  return module.entries.length;
}

/** An entry's words, with its one linked term when it has one. */
function EntryText({ entry, locale }: { entry: FeatureEntry; locale: Locale }) {
  if (!entry.link) return <>{entry.text}</>;
  const [before, after] = entry.text.split(entry.link.term);
  return (
    <>
      {before}
      <Link href={localePath(locale, entry.link.href)} prefetch={false} className="ftr-link">
        {entry.link.term}
      </Link>
      {after}
    </>
  );
}

/** The plan marker: a link to the one note that says these entries vary by plan. */
function PlanMark({ label }: { label: string }) {
  return (
    <a href="#plan-note" aria-label={label}>
      †
    </a>
  );
}

/** One ruled entry: its words and, when unlimited, the stamp. CSS counters number it ("3.2"). */
function Entry({ entry, c, locale }: { entry: FeatureEntry; c: FeaturesCopy; locale: Locale }) {
  return (
    <li>
      <span>
        <EntryText entry={entry} locale={locale} />
        {entry.plan && <PlanMark label={c.ledger.plan} />}
      </span>
      {entry.unlimited && <span>{c.ledger.unlimited}</span>}
    </li>
  );
}

/** The section's real screens as attached sheets, on a teal slab when the old page had a photo here. */
function Exhibits({ id, c }: { id: ModuleId; c: FeaturesCopy }) {
  const exhibits = moduleExhibits[id];
  const photo = modulePhotos[id];
  if (!exhibits) return null;
  return (
    <div className="ftr-exhibits" data-photo={photo || undefined}>
      <ExhibitStack labels={c.sheets}>
        {exhibits.map((exhibit) => (
          <figure key={exhibit} className="ftr-sheet">
            <div>
              <Image src={exhibitSrc(exhibit)} alt="" {...displaySize(exhibitSizes[exhibit], SHEET_WIDTH)} />
            </div>
            <figcaption>{c.captions[exhibit]}</figcaption>
          </figure>
        ))}
      </ExhibitStack>
      {photo && (
        <Image src={photoSrc(photo)} alt={c.photos[photo]} {...displaySize(photoSizes[photo], 208)} className="ftr-person" />
      )}
    </div>
  );
}

/** One section of the register. */
function Section({ module, index, c, locale }: { module: FeatureModule; index: number; c: FeaturesCopy; locale: Locale }) {
  const id = module.id;
  const headingId = `${id}-heading`;
  let body: ReactNode;
  let aside: ReactNode = <Exhibits id={id} c={c} />;

  if (id === "reports") {
    const { featured, index: others } = c.reports;
    body = (
      <>
        <ol className="ftr-entries ftr-reports" role="list">
          {featured.map((report, i) => (
            <li key={i}>
              <div>
                <h3>{report.name}</h3>
                <p>{report.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="ftr-index-heading">{c.reports.indexHeading}</h3>
        <ol className="ftr-index" role="list">
          {others.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ol>
      </>
    );
  } else if (id === "apps") {
    body = (
      <>
        <ol className="ftr-entries ftr-partners" role="list">
          {partnerIds.map((partner) => (
            <li key={partner}>
              <Link href={localePath(locale, partnerPaths[partner][locale])} prefetch={false}>
                <b>{c.apps.names[partner]}</b>
                <span>{c.apps.details}</span>
              </Link>
            </li>
          ))}
          <li>
            <span>
              {c.apps.api.text}
              <PlanMark label={c.ledger.plan} />{" "}
              <a href={apiDocs} rel="noopener" target="_blank" className="ftr-link">
                {c.apps.docs}
                <span className="sr-only"> {c.newTab}</span>
              </a>
            </span>
          </li>
        </ol>
      </>
    );
    // The partners' own marks, filed on a sheet beside the rows that name them.
    aside = (
      <div className="ftr-exhibits">
        <ul className="ftr-slip ftr-marks doc-frame" role="list" aria-hidden="true">
          {partnerIds.map((partner) => (
            <li key={partner}>
              <Image src={partnerMarks[partner].src} alt="" {...displaySize(partnerMarks[partner], markWidth[partner])} data-mark={partner} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    body = (
      <ol className="ftr-entries" role="list">
        {module.entries.map((entry, i) => (
          <Entry key={i} entry={entry} c={c} locale={locale} />
        ))}
      </ol>
    );
  }

  if (id === "support") {
    aside = (
      <div className="ftr-exhibits">
        <div className="ftr-slip doc-frame">
          <h3 className="ftr-slip-heading">{c.support.heading}</h3>
          <dl>
            <div>
              <dt>{c.support.whatsapp}</dt>
              <dd>
                <a href={site.whatsappUrl} rel="noopener" dir="ltr" className="num">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>{c.support.email}</dt>
              <dd>
                <a href={`mailto:${site.email}`} dir="ltr">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  } else if (id === "general") {
    aside = (
      <div className="ftr-exhibits ftr-app" data-photo="app">
        <p className="ftr-app-line">{c.app.line}</p>
        <div className="ftr-app-badges">
          <StoreBadges ios={c.app.ios} android={c.app.android} />
        </div>
        <Image src={photoSrc("app")} alt={c.photos.app} {...displaySize(photoSizes.app, 304)} className="ftr-person" />
      </div>
    );
  }

  return (
    <section id={id} className="ftr-section" aria-labelledby={headingId} data-flip={index % 2 === 1 || undefined}>
      <div className="page-wrap ftr-section-grid">
        <header className="ftr-section-head">
          <h2 id={headingId} className="ftr-section-title">
            {module.title}
          </h2>
          <p className="ftr-section-count">{c.contents.entries(entryCount(module, c))}</p>
        </header>
        <div className="ftr-ledger">
          {/* The section's own opening line, above its column head (the integrations). */}
          {module.intro && (
            <p className="ftr-intro">
              {module.intro}
              <PlanMark label={c.ledger.plan} />
            </p>
          )}
          <p className="ftr-ledger-head" aria-hidden="true">
            <span>{c.ledger.entry}</span>
            {module.entries.some((entry) => entry.unlimited) && <span>{c.ledger.limit}</span>}
          </p>
          {body}
        </div>
        {aside}
      </div>
    </section>
  );
}

/**
 * The features page: the product as an official register. The contents sheet
 * on the teal field lists the eleven sections; each section rules its entries,
 * stamps the unlimited ones, and attaches the real screens that show them.
 */
export function FeaturesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = getFeatures(locale);
  const path = featuresPaths[locale];
  const signup = site.signup[locale];
  const counts = c.modules.map((module) => entryCount(module, c));
  const total = counts.reduce((sum, n) => sum + n, 0);

  return (
    <div className="ftr">
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: c.crumb, path }])} />
      <JsonLd data={softwareJsonLd(locale, c.seo.description)} />

      <section className="ftr-top" aria-labelledby="features-heading">
        <div className="page-wrap ftr-grid">
          <div className="ftr-copy">
            <Breadcrumb items={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: c.crumb }]} label={t.nav.breadcrumb} />
            <h1 id="features-heading" className="ftr-title">
              {c.h1}
            </h1>
            <p className="ftr-subline">{c.subline}</p>
            <p className="ftr-lede">{c.lede}</p>
            <div className="ftr-actions">
              <ButtonLink href={signup} variant="primary" arrow>
                {c.register}
              </ButtonLink>
              <ButtonLink href={site.demo} variant="secondary">
                {c.demo}
              </ButtonLink>
            </div>
          </div>
          <div className="ftr-stage">
            <div className="ftr-field guilloche-tile" aria-hidden="true" />
            <nav className="ftr-contents" aria-labelledby="ftr-contents-title">
              <p id="ftr-contents-title" className="ftr-contents-title">
                {c.contents.title}
              </p>
              <ol className="ftr-contents-list" role="list">
                {c.modules.map((module, i) => (
                  <li key={module.id}>
                    <a href={`#${module.id}`}>
                      <span>{module.title}</span>
                      <span>{c.contents.entries(counts[i])}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="ftr-contents-foot">
                <p className="ftr-contents-total">
                  {c.contents.sections(c.modules.length)} · {c.contents.entries(total)}
                </p>
                <p className="ftr-seal" role="img" aria-label={`${t.certificate.sealMain}: ${t.certificate.sealTop}`}>
                  <span aria-hidden="true">{t.certificate.sealTop}</span>
                  <b aria-hidden="true">{t.certificate.sealMain}</b>
                </p>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {c.modules.map((module, i) => (
        <Section key={module.id} module={module} index={i} c={c} locale={locale} />
      ))}

      <div className="page-wrap">
        <p id="plan-note" className="ftr-plan-note">
          <span aria-hidden="true">† </span>
          {c.planNote.text}{" "}
          <Link href={`${localePath(locale, pricingPaths[locale])}#compare`} className="ftr-link">
            {c.planNote.link}
          </Link>
        </p>
      </div>

      <section className="ftr-close-band guilloche-dark guilloche-tile text-white" aria-labelledby="features-close">
        <div className="page-wrap ftr-close">
          <h2 id="features-close" className="ftr-close-line">
            {c.close.line}
          </h2>
          <div className="ftr-close-actions">
            <ButtonLink href={signup} variant="primary" arrow>
              {c.close.register}
            </ButtonLink>
            <ButtonLink href={site.demo} variant="inverse">
              {c.close.demo}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
