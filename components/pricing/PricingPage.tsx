import type { Metadata } from "next";
import { getPricing, planIds, popularPlan } from "@/lib/content/pricing";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { contactPaths, pricingPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, softwareJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { CompareTable } from "./CompareTable";
import { PlanSheet } from "./PlanSheet";

export function pricingMetadata(locale: Locale): Metadata {
  const { title, description } = getPricing(locale).seo;
  const meta = buildMetadata({
    locale,
    path: pricingPaths[locale],
    alternatePath: pricingPaths[locale === "ar" ? "en" : "ar"],
    title,
    description,
    image: `/og/pricing-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/**
 * The pricing page: four plans as official sheets on the teal field, a ledger of
 * only the rows where they differ, what every plan shares, and the pricing
 * questions. The billing switch is two radios; CSS shows the chosen period's
 * prices, so the page ships no JavaScript of its own.
 */
export function PricingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = getPricing(locale);
  const path = pricingPaths[locale];
  const signup = site.signup[locale];
  const contact = localePath(locale, contactPaths[locale]);

  return (
    <div className="prc">
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: c.breadcrumb, path }])} />
      {/* The app with its priced plans; the tagline keeps it short, since the page's
          description is already in its metadata. */}
      <JsonLd data={softwareJsonLd(locale, t.brand.tagline)} />

      <section className="prc-top" aria-labelledby="pricing-heading">
        <div className="page-wrap prc-head">
          <div className="prc-intro">
            <Breadcrumb items={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: c.breadcrumb }]} label={t.nav.breadcrumb} />
            <h1 id="pricing-heading" className="prc-title">
              {c.h1}
            </h1>
            <p className="prc-lede">{c.lede}</p>
          </div>
          <div className="prc-controls">
            <fieldset className="prc-billing">
              <legend className="sr-only">{c.billing.legend}</legend>
              <input type="radio" name="billing" id="billing-monthly" value="monthly" defaultChecked />
              <label htmlFor="billing-monthly">{c.billing.monthly}</label>
              <input type="radio" name="billing" id="billing-annual" value="annual" />
              <label htmlFor="billing-annual">
                {c.billing.annual}
                <span className="prc-free">{c.billing.free}</span>
              </label>
            </fieldset>
            <p className="prc-note">{c.noCard}</p>
          </div>
        </div>

        <div className="prc-field guilloche-tile">
          <div className="page-wrap">
            <ul className="prc-sheets" role="list">
              {planIds.map((id) => (
                <li key={id} {...(id === popularPlan && { "data-popular": "" })}>
                  <PlanSheet id={id} c={c} locale={locale} href={id === "business" ? contact : signup} />
                </li>
              ))}
            </ul>
            <p className="prc-vat">{c.vatNote}</p>
          </div>
        </div>
      </section>

      <section id="compare" className="prc-section" aria-labelledby="compare-heading">
        <div className="page-wrap prc-block">
          <h2 id="compare-heading" className="sec-heading">
            {c.compare.heading}
          </h2>
          <CompareTable c={c} locale={locale} />
        </div>
      </section>

      <section id="included" className="prc-section prc-included-section" aria-labelledby="included-heading">
        <div className="page-wrap prc-block">
          <h2 id="included-heading" className="sec-heading">
            {c.included.heading}
          </h2>
          <p className="prc-section-lede">{c.included.lede}</p>
          <div className="prc-included doc-frame">
            {/* Index keys: a text key would repeat the copy in the RSC payload. */}
            {c.included.groups.map((group, g) => (
              <div key={g}>
                <h3>{group.heading}</h3>
                <ul role="list">
                  {group.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="prc-section" aria-labelledby="faq-heading">
        <div className="page-wrap sec-split">
          <h2 id="faq-heading" className="sec-heading prc-faq-heading">
            {c.faqHeading}
          </h2>
          <div className="sec-faq">
            {c.faq.map((item, i) => (
              <details key={i} className="faq" open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon sec-faq-icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="prc-close-band guilloche-dark guilloche-tile text-white">
        <div className="page-wrap prc-close">
          <h2 className="prc-close-line">{c.close.line}</h2>
          <div className="prc-close-actions">
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
