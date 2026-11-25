import type { Metadata } from "next";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { integrationPaths } from "@/lib/i18n/routes";
import { resolveImage } from "@/lib/images";
import { integrationIds, integrations, isoDuration, videoLength, vomMark, type IntegrationId } from "@/lib/integrations";
import { breadcrumbJsonLd, videoJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { VideoScreen } from "./VideoScreen";

export function integrationMetadata(id: IntegrationId, locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).integrationPages.items[id].seo;
  const meta = buildMetadata({
    locale,
    path: integrationPaths[id][locale],
    alternatePath: integrationPaths[id][otherLocale(locale)],
    title,
    description,
    image: `/og/integration-${id}-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/**
 * One integration page; Foodics, Marn, LazyWait and Zid share it. The connection video leads
 * on the teal field, then the posting ledger says what each partner record becomes
 * in VoM. Parts the old page did not have (Zid's offer list) drop out.
 */
export function IntegrationPage({ id, locale }: { id: IntegrationId; locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.integrationPages;
  const c = s.items[id];
  const assets = integrations[id];
  const path = integrationPaths[id][locale];
  const crumbs = [{ label: t.nav.home, href: localePath(locale, "/") }, { label: c.crumb }];
  const others = integrationIds.filter((other) => other !== id);

  return (
    <>
      <JsonLd data={webPageJsonLd(locale, path, c.seo.title, c.seo.description)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: c.crumb, path }])} />
      {assets.videos.map((video) => (
        <JsonLd
          key={video.youtubeId}
          data={videoJsonLd({
            youtubeId: video.youtubeId,
            name: video.title,
            // Each video is described by its own title first, so two on one page do not share a description.
            description: `${video.title}. ${c.seo.description}`,
            thumbnailPath: video.poster.src,
            uploadDate: video.uploaded,
            duration: isoDuration(video.seconds),
            inLanguage: "ar",
          })}
        />
      ))}

      <section className="integ-top">
        <div className="page-wrap integ-grid">
          <div className="integ-copy">
            <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
            <Image
              src={assets.lockup.src}
              alt={c.images.lockup}
              width={assets.lockup.width}
              height={assets.lockup.height}
              sizes="384px"
              className="integ-lockup"
            />
            <h1 className="integ-title">{c.heading}</h1>
            <p className="integ-lede">{c.lede}</p>
            <div className="integ-actions">
              <ButtonLink href={site.signup[locale]} variant="primary" arrow>
                {s.register}
              </ButtonLink>
              <ButtonLink href={assets.videos.length > 0 ? "#watch" : "#sync"} variant="secondary">
                {c.watch}
              </ButtonLink>
            </div>
          </div>

          <div id="watch" className="integ-stage">
            <div className="integ-field guilloche-tile" aria-hidden="true" />
            {assets.videos.length > 0 ? (
              <VideoScreen
                videos={assets.videos.map((video, i) => ({
                  youtubeId: video.youtubeId,
                  title: c.videos[i],
                  length: videoLength(video.seconds),
                  poster: video.poster,
                  posterImage: resolveImage(video.poster.src),
                  seal: video.seal,
                }))}
                playLabel={s.play}
                inArabic={s.inArabic}
              />
            ) : (
              // No video yet: the two marks, joined, stand on the field in its place.
              <div className="integ-pair doc-frame" aria-hidden="true">
                <Image src={assets.mark.src} alt="" width={assets.mark.width} height={assets.mark.height} sizes="200px" className="integ-mark" data-mark={id} />
                <Icon name="arrow" size={22} className="integ-ledger-arrow rtl:-scale-x-100" />
                <Image src={vomMark.src} alt="" width={vomMark.width} height={vomMark.height} sizes="140px" className="integ-mark" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="sync" className="integ-section" aria-labelledby="sync-heading">
        <div className="page-wrap integ-split">
          <h2 id="sync-heading" className="integ-heading">
            {c.sync.heading}
          </h2>
          <div className="integ-ledger doc-frame" data-single={c.sync.rows.length === 1 || undefined}>
            <div className="integ-ledger-head" aria-hidden="true">
              <span>
                {s.ledgerFrom}
                <Image
                  src={assets.mark.src}
                  alt=""
                  width={assets.mark.width}
                  height={assets.mark.height}
                  sizes="160px"
                  className="integ-mark"
                  data-mark={id}
                />
              </span>
              <Icon name="arrow" size={18} className="integ-ledger-arrow rtl:-scale-x-100" />
              <span>
                {s.ledgerTo}
                <Image src={vomMark.src} alt="" width={vomMark.width} height={vomMark.height} sizes="96px" className="integ-mark" />
              </span>
            </div>
            <ul className="integ-ledger-rows">
              {c.sync.rows.map((row) => (
                <li key={row.from}>
                  <span className="integ-from">{row.from}</span>
                  <Icon name="arrow" size={18} className="integ-ledger-arrow rtl:-scale-x-100" />
                  <span className="sr-only">: </span>
                  <span className="integ-to">{row.to}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {c.offer && (
        <section className="integ-section integ-offer-section" aria-labelledby="offer-heading">
          <div className="page-wrap integ-split">
            <div className="integ-offer-aside">
              <h2 id="offer-heading" className="integ-heading">
                {c.offer.heading}
              </h2>
              <div className="integ-mark-tile doc-frame">
                <Image
                  src={assets.mark.src}
                  alt={c.partner}
                  width={assets.mark.width}
                  height={assets.mark.height}
                  sizes="256px"
                  className="integ-mark"
                  data-mark={id}
                />
              </div>
            </div>
            <ul className="integ-offer">
              {c.offer.items.map((item) => (
                <li key={item}>
                  <span className="integ-tick" aria-hidden="true">
                    <Icon name="check" size={16} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="integ-section" aria-labelledby="others-heading">
        <div className="page-wrap integ-split">
          <h2 id="others-heading" className="integ-heading">
            {s.others}
          </h2>
          <ul className="integ-others">
            {others.map((other) => {
              const mark = integrations[other].mark;
              return (
                <li key={other}>
                  <Link href={localePath(locale, integrationPaths[other][locale])} className="integ-other">
                    <Image
                      src={mark.src}
                      alt=""
                      width={mark.width}
                      height={mark.height}
                      sizes="160px"
                      className="integ-mark"
                      data-mark={other}
                    />
                    <span className="integ-other-name">{s.items[other].crumb}</span>
                    <Icon name="arrow" size={20} className="integ-other-arrow rtl:-scale-x-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="integ-close-band guilloche-dark guilloche-tile text-white">
        <div className="page-wrap integ-close">
          <div className="integ-emblem" aria-hidden="true">
            <span className="integ-plate">
              <Image src={vomMark.src} alt="" width={vomMark.width} height={vomMark.height} sizes="96px" className="integ-mark" />
            </span>
            <span className="integ-link" />
            <span className="integ-plate">
              <Image
                src={assets.mark.src}
                alt=""
                width={assets.mark.width}
                height={assets.mark.height}
                sizes="128px"
                className="integ-mark"
                data-mark={id}
              />
            </span>
          </div>
          <h2 className="integ-close-line">{c.close}</h2>
          <ButtonLink href={site.signup[locale]} variant="primary" arrow>
            {s.register}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

