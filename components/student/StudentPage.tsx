import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { studentPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { TextbookForm } from "./TextbookForm";
import { TextbookSpread } from "./TextbookSpread";

/** The old page's photos, in the order of the benefits they illustrate (1400×565). */
const benefitPhotos = ["apply", "systems", "skills"] as const;

/**
 * An index sorts on the keyword: the word "report" that most names carry, and
 * Arabic's definite article, are not what a reader looks a report up by.
 */
function indexKey(name: string): string {
  return name
    .replace(/^تقرير\s+/, "")
    .replace(/^ال/, "")
    .replace(/\s+report$/i, "");
}

export function studentMetadata(locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).student.seo;
  const meta = buildMetadata({
    locale,
    path: studentPaths[locale],
    alternatePath: studentPaths[otherLocale(locale)],
    title,
    description,
    image: `/og/student-package-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/**
 * The student package. Students know accounting from the textbook, so the page
 * sets each concept as the textbook prints it beside what VoM does with it,
 * starting with one entry carried from the book into a VoM record.
 */
export function StudentPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.student;
  const path = studentPaths[locale];
  const crumbs = [{ label: t.nav.home, href: localePath(locale, "/") }, { label: s.crumb }];
  const links = site.studentLinks;
  // An index page: the reports in this language's alphabetical order, read down
  // each column in turn. `rows` is the length of the first column.
  const reports = [...s.reports.items].sort((a, b) => indexKey(a.name).localeCompare(indexKey(b.name), locale));
  const rows = Math.ceil(reports.length / 2);

  const actions = (
    <>
      <ButtonLink href={links.student[locale]} variant="primary" arrow>
        {s.register.student}
      </ButtonLink>
      <ButtonLink href={links.university[locale]} variant="secondary" newTab={s.newTab}>
        {s.register.university}
      </ButtonLink>
    </>
  );

  return (
    <>
      <JsonLd data={webPageJsonLd(locale, path, s.seo.title, s.seo.description)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: s.crumb, path }])} />

      <section className="stu-top">
        <div className="page-wrap stu-grid">
          <div className="stu-copy">
            <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
            <h1 className="stu-title">{s.heading}</h1>
            <p className="stu-lede">{s.lede}</p>
            <div className="stu-actions">{actions}</div>
          </div>
          <div className="stu-stage">
            <div className="stu-field guilloche-tile" aria-hidden="true" />
            <TextbookSpread t={s} brand={t.brand.name} />
          </div>
        </div>
      </section>

      <section id="features" className="stu-section stu-features" aria-labelledby="features-heading">
        <div className="page-wrap stu-split">
          <h2 id="features-heading" className="stu-heading stu-heading-sticky">
            {s.features.heading}
          </h2>
          <ul className="stu-spreads">
            {s.features.spreads.map((spread) => (
              <li key={spread.title} className="stu-pages">
                <div className="stu-page stu-page-book">
                  <span className="stu-letterhead stu-letterhead-book" aria-hidden="true" />
                  <p className="stu-concept">{spread.concept}</p>
                  <TextbookForm form={spread.form} amount={s.hero.book.amount} />
                  <p className="stu-concept-line">{spread.conceptLine}</p>
                  <p className="stu-folio">{s.features.bookHead}</p>
                </div>
                <div className="stu-page stu-page-vom">
                  <p className="stu-letterhead stu-letterhead-vom">
                    <span className="sr-only">{t.brand.name}</span>
                  </p>
                  <h3 className="stu-spread-title">{spread.title}</h3>
                  <ul className="stu-items">
                    {spread.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="reports" className="stu-section stu-reports" aria-labelledby="reports-heading">
        <div className="page-wrap stu-split">
          <div className="stu-aside">
            <h2 id="reports-heading" className="stu-heading">
              {s.reports.heading.before}{" "}
              <span className="stu-heading-figure num" dir="ltr">
                {s.reports.heading.figure}
              </span>{" "}
              {s.reports.heading.after}
            </h2>
            <p className="stu-footnote">{s.reports.footnote}</p>
          </div>
          <ul className="stu-index doc-frame" style={{ "--rows": rows } as CSSProperties}>
            {reports.map((report, i) => (
              <li key={report.id} className={i === rows ? "stu-index-col" : undefined}>
                {/* A decorative 48px icon: one plain tag on the optimizer's 96px
                    rendition, so the index does not carry fourteen srcsets. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/_next/image/?url=%2Fstudent-package%2Freports%2F${report.id}.png&w=96&q=75`}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
                {report.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stu-section stu-benefits" aria-labelledby="benefits-heading">
        <div className="page-wrap stu-split">
          <h2 id="benefits-heading" className="stu-heading">
            {s.benefits.heading}
          </h2>
          <ul className="stu-plates">
            {s.benefits.items.map((benefit, i) => (
              <li key={benefit.title} className="stu-plate">
                <Image
                  src={`/student-package/benefit-${benefitPhotos[i]}.jpg`}
                  alt={benefit.alt}
                  width={1400}
                  height={565}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 32px)"
                  className="stu-photo"
                />
                <div className="stu-plate-text">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stu-close-band guilloche-dark guilloche-tile text-white">
        <div className="page-wrap stu-close">
          <p className="stu-seal stu-seal-white">
            <span className="stu-seal-word">{s.seal.word}</span>
          </p>
          <div className="stu-close-text">
            <h2 className="stu-close-line">{s.close.line}</h2>
            <p className="stu-close-body">{s.close.body}</p>
          </div>
          <div className="stu-actions stu-close-actions">
            <ButtonLink href={links.student[locale]} variant="primary" arrow>
              {s.register.student}
            </ButtonLink>
            <ButtonLink href={links.university[locale]} variant="inverse" newTab={s.newTab}>
              {s.register.university}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
