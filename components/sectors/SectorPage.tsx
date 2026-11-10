import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clients, sealLogo } from "@/lib/content/clients";
import { optimizedSrc } from "@/lib/image-url";
import { getSector, readingImage, sectorClients, sectorPhotos, type SectorId } from "@/lib/content/sectors";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { sectorPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectorSeal } from "./SectorSeal";

export function sectorMetadata(id: SectorId, locale: Locale): Metadata {
  const { title, description } = getSector(id, locale).seo;
  const meta = buildMetadata({
    locale,
    path: sectorPaths[id][locale],
    alternatePath: sectorPaths[id][otherLocale(locale)],
    title,
    description,
    image: `/og/sector-${id}-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/**
 * One sector page; all fifteen share it. The sector's seal is stamped on its own
 * photo on the teal field; below, what VoM does for it as four clauses, its clients,
 * the questions owners ask, articles (Arabic) and the other sectors. Parts the old
 * page did not have (clients, articles) drop out.
 */
export function SectorPage({ id, locale }: { id: SectorId; locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.sectorPages;
  const c = getSector(id, locale);
  const sector = t.sectors.items.find((item) => item.id === id)!;
  const path = sectorPaths[id][locale];
  const heading = `${s.h1Prefix} ${c.forName}`;
  const photo = sectorPhotos[id];
  const clientList = sectorClients[id];
  const others = t.sectors.items.filter((item) => item.id !== id);
  const featuresPath = localePath(locale, locale === "ar" ? "/features/" : "/features-en/");

  return (
    <>
      <JsonLd data={webPageJsonLd(locale, path, c.seo.title, c.seo.description)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: sector.name, path }])} />

      <section className="sec-top">
        <div className="page-wrap sec-grid">
          <div className="sec-copy">
            <Breadcrumb items={[{ label: t.nav.home, href: localePath(locale, "/") }, { label: sector.name }]} label={t.nav.breadcrumb} />
            <h1 className="sec-title">{heading}</h1>
            <p className="sec-lede">{c.lede}</p>
            <div className="sec-actions">
              <ButtonLink href={site.signup[locale]} variant="primary" arrow>
                {s.register}
              </ButtonLink>
              <ButtonLink href={site.demo} variant="ghost">
                {s.demo}
              </ButtonLink>
            </div>
            <p className="sec-note">
              <Icon name="check" size={16} />
              {s.noCard}
            </p>
          </div>

          <div className="sec-stage">
            <div className="sec-field guilloche-tile" aria-hidden="true" />
            <div className="sec-plate">
              <div className="sec-photo">
                <Image
                  src={photo.src}
                  alt={c.photoAlt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 34rem, calc(100vw - 4rem)"
                  preload
                />
              </div>
              <SectorSeal icon={sector.icon} name={sector.name} micro={s.sealMicro} variant="stamp" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="sec-section sec-features-section" aria-labelledby="features-heading">
        <div className="page-wrap sec-split">
          <div className="sec-aside">
            <h2 id="features-heading" className="sec-heading">
              {s.featuresPrefix} {c.forName}
            </h2>
            <Link href={featuresPath} className="sec-more">
              {s.moreFeatures}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <ol className="sec-clauses doc-frame" role="list">
            {c.features.map((feature, i) => (
              <li key={feature.title} className="sec-clause" data-feature={feature.icon}>
                <span className="sec-clause-num num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="sec-clause-title">{feature.title}</h3>
                <p className="sec-clause-body">{feature.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {clientList.length > 0 && (
        <section id="clients" className="sec-section" aria-labelledby="clients-heading">
          <div className="page-wrap sec-split">
            <h2 id="clients-heading" className="sec-heading">
              {c.clientsHeading}
            </h2>
            <ul className="sec-clients" role="list" data-few={clientList.length < 4 || undefined}>
              {clientList.map((key) => (
                <li key={key} className="sec-client">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={optimizedSrc(sealLogo(key).src, 256)}
                    alt={clients[key][locale]}
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="faq" className="sec-section sec-faq-section" aria-labelledby="faq-heading">
        <div className="page-wrap sec-split">
          <h2 id="faq-heading" className="sec-heading">
            {s.faqHeading}
          </h2>
          <div className="sec-faq">
            {c.faq.map((item, i) => (
              <details key={item.q} className="faq" open={i === 0}>
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

      {c.reading && (
        <section id="reading" className="sec-section" aria-labelledby="reading-heading">
          <div className="page-wrap sec-block">
            <div className="sec-block-head">
              <h2 id="reading-heading" className="sec-heading">
                {s.readingHeading}
              </h2>
              <Link href={localePath(locale, "/blog/")} prefetch={false} className="sec-more">
                {s.readingMore}
                <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
              </Link>
            </div>
            <ul className="sec-reading" role="list">
              {c.reading.map((article) => (
                <li key={article.href}>
                  <Link href={localePath(locale, article.href)} prefetch={false} className="sec-article">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizedSrc(`/sectors/reading/${article.image}.jpg`, 640)}
                      alt=""
                      width={readingImage.width}
                      height={readingImage.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="sec-article-title">{article.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="sectors" className="sec-section" aria-labelledby="sectors-heading">
        <div className="page-wrap sec-block">
          <h2 id="sectors-heading" className="sec-heading">
            {s.othersHeading}
          </h2>
          {/* Each link draws its ringed pictogram in CSS from data-icon, so the HTML stays small. */}
          <ul className="sec-register" role="list">
            {others.map((other) => (
              <li key={other.id}>
                <Link href={localePath(locale, sectorPaths[other.id][locale])} prefetch={false} data-icon={other.icon}>
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-close-band guilloche-dark guilloche-tile text-white">
        <div className="page-wrap sec-close">
          <SectorSeal icon={sector.icon} name={sector.name} micro={s.sealMicro} variant="white" />
          <h2 className="sec-close-line">{c.close}</h2>
          <div className="sec-close-actions">
            <ButtonLink href={site.signup[locale]} variant="primary" arrow>
              {s.register}
            </ButtonLink>
            <ButtonLink href={site.demo} variant="inverse">
              {s.demo}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
