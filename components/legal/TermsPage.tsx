import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { getTerms, type LegalClause, type LegalSection } from "@/lib/content/legal";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { termsPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { TermsContents } from "./TermsContents";

export function termsMetadata(locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).terms.seo;
  const meta = buildMetadata({
    locale,
    path: termsPaths[locale],
    alternatePath: termsPaths[otherLocale(locale)],
    title,
    description,
    image: `/og/terms-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/** Keeps a parenthesised name such as "(VoM Pay)" on one line in headings. */
function keepParentheses(text: string): string {
  return text.replace(/\([^()]*\)/g, (group) => group.replace(/ /g, " "));
}

function EmailLink() {
  return (
    <a href={`mailto:${site.email}`} className="terms-link" dir="ltr">
      {site.email}
    </a>
  );
}

/** Legal text with the `{email}` placeholder rendered as the notices address. */
function withEmail(text: string): ReactNode {
  const parts = text.split("{email}");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <EmailLink />}
      {part}
    </Fragment>
  ));
}

function Clause({ clause, linkLabel }: { clause: LegalClause; linkLabel: string }) {
  return (
    <li id={clause.id} className="terms-clause">
      <a href={`#${clause.id}`} className="num terms-clause-num" dir="ltr" aria-label={linkLabel.replace("{n}", clause.number)}>
        {clause.number}
      </a>
      <div>
        <p>
          {clause.lead && <strong>{clause.lead}</strong>} {withEmail(clause.text)}
        </p>
        {clause.items && (
          <ul className="terms-items">
            {clause.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

function Section({ section, linkLabel }: { section: LegalSection; linkLabel: string }) {
  const titleId = `${section.id}-title`;
  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className={section.number === undefined ? "terms-section terms-preamble" : "terms-section"}
    >
      <h2 id={titleId} className="terms-section-title">
        {section.number !== undefined && <span className="num terms-section-num">{section.number}</span>}
        {keepParentheses(section.heading)}
      </h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="terms-paragraph">
          {paragraph === "{email}" ? <EmailLink /> : withEmail(paragraph)}
        </p>
      ))}
      {section.clauses && (
        <ol className="terms-clauses">
          {section.clauses.map((clause) => (
            <Clause key={clause.id} clause={clause} linkLabel={linkLabel} />
          ))}
        </ol>
      )}
    </section>
  );
}

export function TermsPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const copy = t.terms;
  const path = termsPaths[locale];
  const sections = getTerms(locale);
  const numbered = sections.filter((section) => section.number !== undefined).length;
  const entries = sections.map(({ id, number, heading }) => ({ id, number, heading: keepParentheses(heading) }));
  const crumbs = [{ label: t.nav.home, href: localePath(locale, "/") }, { label: copy.heading }];

  return (
    <>
      <JsonLd data={webPageJsonLd(locale, path, copy.seo.title, copy.seo.description)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: copy.heading, path }])} />

      <div className="page-wrap terms-page">
        <header className="terms-head">
          <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
          <h1 className="terms-title">{copy.heading}</h1>
          <p className="terms-meta">
            <span>{copy.sectionCount.replace("{n}", String(numbered))}</span>
            <span>
              {copy.noticesLabel} <EmailLink />
            </span>
          </p>
        </header>

        <TermsContents entries={entries} title={copy.contents} />

        <article className="terms-body">
          {sections.map((section) => (
            <Section key={section.id} section={section} linkLabel={copy.clauseLink} />
          ))}
        </article>
      </div>
    </>
  );
}
