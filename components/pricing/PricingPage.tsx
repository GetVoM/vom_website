import type { Metadata } from "next";
import { getFeatures, type ModuleId } from "@/lib/content/features";
import { getPricing, planIds, planPeriod, popularPlan } from "@/lib/content/pricing";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { contactPaths, pricingPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, softwareJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
 * The pricing page: the plans as official sheets on the teal field, a ledger of
 * every capability plan by plan, and the pricing questions. The billing switch is
 * two radios above the sheets: Monthly shows Flex, Yearly the fixed plans and
 * Business (CSS, so the page ships no JavaScript of its own). The ledger always
 * shows all four plans.
 */
export function PricingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = getPricing(locale);
  const path = pricingPaths[locale];
  const signup = site.signup[locale];
  const contact = localePath(locale, contactPaths[locale]);
  // The ledger's group heads are the features page's section titles.
  const groupTitles = Object.fromEntries(getFeatures(locale).modules.map((m) => [m.id, m.title])) as Record<
    ModuleId,
    string
  >;

  return (
    <div className="prc">
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: c.breadcrumb, path }])} />
      {/* The app with its priced plans; the tagline keeps it short, since the page's
          description is already in its metadata. */}
      <JsonLd data={softwareJsonLd(locale, t.brand.description)} />

      <section className="prc-top" aria-labelledby="pricing-heading">
        <div className="page-wrap prc-head">
          <div className="prc-intro">
            <Breadcrumb items={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: c.breadcrumb }]} label={t.nav.breadcrumb} />
            <h1 id="pricing-heading" className="prc-title">
              {c.h1}
            </h1>
            <p className="prc-lede">{c.lede}</p>
            <p className="prc-note">{c.noCard}</p>
          </div>
        </div>

        <div className="prc-field guilloche-tile">
          <div className="page-wrap">
            <div className="prc-bar">
              <fieldset className="prc-billing">
                <legend className="sr-only">{c.billing.legend}</legend>
                <input type="radio" name="billing" id="billing-monthly" value="monthly" />
                <label htmlFor="billing-monthly">{c.billing.monthly}</label>
                <input type="radio" name="billing" id="billing-annual" value="annual" defaultChecked />
                <label htmlFor="billing-annual">{c.billing.annual}</label>
              </fieldset>
              <a href="#compare" className="btn btn-secondary btn-on-teal prc-jump" data-track="pricing_compare_clicked">
                <span>{c.compareJump}</span>
                <Icon name="chevron" size={16} className="rotate-90" />
              </a>
            </div>
            <ul className="prc-sheets" role="list">
              {planIds.map((id) => (
                <li
                  key={id}
                  data-plan={id}
                  data-period={planPeriod[id]}
                  {...(id === popularPlan && { "data-popular": "" })}
                >
                  <PlanSheet id={id} c={c} locale={locale} href={id === "business" ? contact : signup} />
                </li>
              ))}
            </ul>
            <p className="prc-vat">{c.vatNote}</p>
            {/* CSS shows the line for the chosen period: what the other period holds. */}
            <p className="prc-vat prc-period-note" data-period="annual">
              {c.billing.flexHidden}
            </p>
            <p className="prc-vat prc-period-note" data-period="monthly">
              {c.billing.annualOnly}
            </p>
          </div>
        </div>
      </section>

      <section id="compare" className="prc-section" aria-labelledby="compare-heading">
        <div className="page-wrap prc-block">
          <h2 id="compare-heading" className="sec-heading">
            {c.compare.heading}
          </h2>
          <CompareTable c={c} locale={locale} groupTitles={groupTitles} />
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
            <ButtonLink href={site.demo} variant="secondary" onTeal>
              {c.close.demo}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
