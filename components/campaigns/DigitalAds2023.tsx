import Image from "next/image";
import { LeadForm } from "@/components/campaigns/LeadForm";
import { ReturnBar } from "@/components/campaigns/ReturnBar";
import { SocialGlyph } from "@/components/contact/SocialGlyph";
import { clients, tileLogo } from "@/lib/content/clients";
import { digitalAds2023 as page } from "@/lib/content/campaigns/digital-ads-2023";
import { optimizedSrc } from "@/lib/image-url";
import { site } from "@/lib/seo/site";

/**
 * The paid-campaign landing page (`/digital-ads-2023-landing-page/`). "The
 * form that stays": on desktop the form rides a sticky teal panel at the end
 * side while the story scrolls past it; on a phone it follows the headline and
 * a bar brings it back. Direction contract:
 * .impeccable/surfaces/components-campaigns-digitalads2023-tsx.md. Styled from
 * `.lp-` in app/globals.css.
 */
export function DigitalAds2023() {
  return (
    <>
      <main className="lp page-wrap">
        <header className="lp-head">
          {/* eslint-disable-next-line @next/next/no-img-element -- a small fixed-size logo, optimised without a srcset. */}
          <img className="lp-logo" src={optimizedSrc(site.logo, 256)} alt={site.name.ar} width={110} height={36} />
          <h1 className="lp-title">
            {page.heading}{" "}
            <span className="lp-zatca">
              {/* eslint-disable-next-line @next/next/no-img-element -- part of the heading's text: its alt completes the sentence. */}
              <img src={optimizedSrc(page.zatca.src, 640)} alt={page.zatca.alt} width={page.zatca.width} height={page.zatca.height} />
            </span>
          </h1>
          <p className="lp-lede">{page.lede}</p>
        </header>

        <aside className="lp-aside" aria-labelledby="lp-panel-title">
          <div className="lp-panel guilloche-tile" id="lp-panel">
            <h2 className="lp-panel-title" id="lp-panel-title">
              {page.callToAction}
            </h2>
            <div className="lp-sheet">
              <LeadForm copy={page.form} label={page.callToAction} whatsappUrl={site.whatsappUrl} />
            </div>
          </div>
        </aside>

        <div className="lp-story">
          <figure className="lp-photo">
            <Image src={page.banner.src} alt={page.banner.alt} width={page.banner.width} height={page.banner.height} sizes="(min-width: 1024px) 700px, 100vw" />
          </figure>

          <section className="lp-features" aria-labelledby="lp-features-title">
            <h2 id="lp-features-title">{page.featuresHeading}</h2>
            <ul>
              {page.features.map((feature) => (
                <li key={feature.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- a small illustration at one size. */}
                  <img src={optimizedSrc(feature.icon.src, 256)} alt="" width={feature.icon.width} height={feature.icon.height} loading="lazy" decoding="async" />
                  <h3>{feature.title}</h3>
                </li>
              ))}
            </ul>
          </section>

          <ul className="lp-clients" aria-label={`${page.clients.length} شعارًا لعملاء ڤوم`}>
            {page.clients.map((key) => (
              <li key={key} className="logo-tile">
                {/* eslint-disable-next-line @next/next/no-img-element -- 47 logos: one small optimised file each, no srcset. */}
                <img src={optimizedSrc(tileLogo(key).src, 256)} alt={clients[key].ar} width={256} height={128} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>

          <section className="lp-voices">
            {/* eslint-disable-next-line @next/next/no-img-element -- the old page's star image. */}
            <img className="lp-rating" src={optimizedSrc(page.rating.src, 384)} alt={page.rating.alt} width={page.rating.width} height={page.rating.height} loading="lazy" decoding="async" />
            <ul className="lp-quotes">
              {page.testimonials.map((item) => (
                <li key={item.quote}>
                  <figure>
                    <blockquote>
                      <p>{item.quote}</p>
                    </blockquote>
                    <figcaption>
                      {/* eslint-disable-next-line @next/next/no-img-element -- a 56 px avatar. */}
                      <img src={optimizedSrc(item.avatar.src, 128)} alt={item.avatar.alt} width={56} height={56} loading="lazy" decoding="async" />
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>

          <ul className="lp-partners">
            {page.partners.map((logo) => (
              <li key={logo.src}>
                {/* eslint-disable-next-line @next/next/no-img-element -- a round logo at one size. */}
                <img src={optimizedSrc(logo.src, 256)} alt={logo.alt} width={logo.width} height={logo.height} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </main>

      <ReturnBar label={page.form.submit} target="lp-panel" />
      <a className="lp-whatsapp" href={site.whatsappUrl} target="_blank" rel="noopener" aria-label={page.whatsappLabel}>
        <SocialGlyph id="whatsapp" size={28} />
      </a>
    </>
  );
}
