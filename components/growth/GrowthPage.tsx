import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { growthPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { GrowthDisc } from "./GrowthDisc";

export function growthMetadata(locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).growth.seo;
  const meta = buildMetadata({
    locale,
    path: growthPaths[locale],
    alternatePath: growthPaths[otherLocale(locale)],
    title,
    description,
    image: `/og/growth-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

export function GrowthPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const g = t.growth;
  const path = growthPaths[locale];
  const crumbs = [{ label: t.nav.home, href: localePath(locale, "/") }, { label: g.crumb }];

  return (
    <>
      <JsonLd data={webPageJsonLd(locale, path, g.seo.title, g.seo.description)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: g.crumb, path }])} />

      <section className="growth-top">
        <div className="page-wrap growth-grid">
          <div className="growth-copy">
            <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
            <h1 className="growth-title">{g.heading}</h1>
            <p className="growth-tagline">
              {/* The space sits between the phrases, so a line can break only there. */}
              {g.tagline.map((phrase, i) => (
                <Fragment key={phrase}>
                  {i > 0 && " "}
                  <span className="whitespace-nowrap">{phrase}</span>
                </Fragment>
              ))}
            </p>
            <p className="growth-lede">{g.lede}</p>
          </div>

          <div className="growth-art">
            <div className="growth-photo">
              <Image
                src="/growth/hand-growth.png"
                alt={g.images.hand}
                width={2048}
                height={1483}
                preload
                sizes="(min-width: 1024px) 480px, 360px"
                className="h-auto w-full"
              />
              <GrowthDisc />
            </div>
          </div>

          <div className="growth-door-startups doc-frame">
            <h2 className="growth-door-heading">{g.startups.heading}</h2>
            <div className="growth-offer-group">
              <p className="growth-offer">
                <span className="growth-figure num" dir="ltr">
                  {g.startups.figure}
                </span>
                <span className="growth-offer-text">
                  <span className="growth-offer-label">{g.startups.figureLabel}</span>
                  <span className="growth-offer-duration">{g.startups.duration}</span>
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <ButtonLink href={site.growthForms.apply} variant="primary" arrow newTab={g.newTab}>
                  {g.startups.apply}
                </ButtonLink>
                <ButtonLink href="#features" variant="ghost">
                  {g.startups.included}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="growth-door-partners">
            <div className="growth-field guilloche-tile" aria-hidden="true" />
            <h2 className="growth-door-heading">{g.partners.heading}</h2>
            <p className="growth-partners-body">{g.partners.body}</p>
            <ul className="growth-seals">
              {g.partners.items.map((partner) => (
                <li key={partner.logo}>
                  <Image
                    src={`/growth/partners/${partner.logo}.png`}
                    alt={partner.name}
                    width={72}
                    height={72}
                    className="growth-seal"
                  />
                </li>
              ))}
            </ul>
            <div className="growth-partners-cta">
              <p>{g.partners.question}</p>
              <ButtonLink href={site.growthForms.partner} variant="inverse" newTab={g.newTab}>
                {g.partners.apply}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="growth-features-section">
        <div className="page-wrap growth-features-grid py-16 lg:py-24">
          <h2 className="growth-heading">{g.features.heading}</h2>
          <ul className="growth-features">
            {g.features.items.map((feature) => (
              <li key={feature.title} className="growth-feature">
                <span className="growth-feature-icon">
                  <Icon name={feature.icon} size={26} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="guilloche-dark guilloche-tile text-white">
        <div className="page-wrap growth-close">
          <h2 className="growth-close-line">
            <span>{g.close.before}</span>{" "}
            <span className="growth-poster num" dir="ltr">
              {g.close.figure}
            </span>{" "}
            <span>{g.close.after}</span>
          </h2>
          <ButtonLink href={site.growthForms.apply} variant="primary" arrow newTab={g.newTab}>
            {g.close.apply}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
