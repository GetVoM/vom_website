import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { zatcaPhase2 as page, type AccentHeading } from "@/lib/content/zatca-phase-2";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { zatcaPhase2Paths } from "@/lib/i18n/routes";
import { optimizedSrc } from "@/lib/image-url";
import { ZATCA_PHASE_2_FORM, gtmFormSuccess } from "@/lib/leads/zatca-phase-2";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";

/** English only, with the Arabic e-invoicing hub as its hreflang twin. */
export function zatcaPhase2Metadata(): Metadata {
  const meta = buildMetadata({
    locale: "en",
    path: zatcaPhase2Paths.en,
    alternatePath: zatcaPhase2Paths.ar,
    title: page.seoTitle,
    description: page.description,
    image: page.ogImage,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: page.seoTitle } };
}

/** The hero's line, in the lockup's own coordinates: from the VoM mark, once round a loop like the old photos' ribbon, to the badge. */
const LINK = "M160 132 C 214 132, 276 130, 312 98 C 344 70, 334 22, 294 18 C 254 14, 236 54, 256 88 C 276 122, 336 132, 392 132";

/** The old page set these words in its accent colour. */
function Accent({ heading }: { heading: AccentHeading }) {
  const [before, accent, after] = heading;
  return (
    <>
      {before}
      <span className="zp-accent">{accent}</span>
      {after}
    </>
  );
}

/** A small icon from the old page, decorative beside the words that say the same. */
function Icon({ src, size = 128 }: { src: string; size?: 96 | 128 }) {
  // eslint-disable-next-line @next/next/no-img-element -- 14 small icons, some repeated: one optimised file each, no srcset.
  return <img src={optimizedSrc(src, size)} alt="" width={256} height={256} loading="lazy" decoding="async" />;
}

/**
 * The ZATCA Phase 2 page (/en/zatca-e-invoicing-phase-2/): "the Phase 2 link".
 * The hero draws a teal line from the VoM mark to ZATCA's Phase 2 badge beside
 * the lead form; the same line runs down the page as its thread, branching
 * into the seven steps and the two invoice flows. Direction contract:
 * .impeccable/surfaces/components-zatca-zatcaphase2page-tsx.md. Styled from
 * `.zp-` in app/globals.css.
 */
export function ZatcaPhase2Page() {
  const t = getDictionary("en");
  const path = zatcaPhase2Paths.en;
  const register = (
    <ButtonLink href={site.signup.en} variant="primary" arrow>
      {page.register}
    </ButtonLink>
  );

  return (
    <>
      <JsonLd data={webPageJsonLd("en", path, page.seoTitle, page.description)} />
      <JsonLd data={breadcrumbJsonLd("en", [{ name: t.nav.home, path: "/" }, { name: page.crumb, path }])} />

      <section className="zp-hero" aria-labelledby="zp-title">
        <div className="page-wrap zp-hero-grid">
          <div className="zp-intro">
            <Breadcrumb items={[{ label: t.nav.home, href: localePath("en", "/") }, { label: page.crumb }]} label={t.nav.breadcrumb} />
            <h1 id="zp-title" className="zp-title">
              {page.h1}
            </h1>
            <p className="zp-lede">{page.lede}</p>
            {/* The link, drawn as one piece so it scales as one: the VoM mark, the line with its loop, ZATCA's badge on its plate. */}
            <svg className="zp-link" viewBox="0 10 722 172" role="img" aria-label={`${site.name.en} · ${page.badge.alt}`}>
              <image href={optimizedSrc(site.logo, 256)} x="0" y="108" width="148" height="48" />
              <path className="zp-link-path" pathLength={1} d={LINK} />
              <circle className="zp-link-start" cx="160" cy="132" r="4.5" />
              <rect className="zp-link-plate" x="400.5" y="84.5" width="320" height="95" rx="12" />
              <image href={optimizedSrc(page.badge.src, 640)} x="412" y="96" width="296" height="71" />
              <circle className="zp-link-end" cx="400" cy="132" r="6" />
            </svg>
          </div>

          <div className="zp-field guilloche-tile">
            <div className="zp-sheet">
              <LeadForm form={ZATCA_PHASE_2_FORM} locale="en" copy={page.form} label={page.register} gtm={gtmFormSuccess} whatsappUrl={site.whatsappUrl} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-wrap">
        <div className="zp-thread">
          <section className="zp-sec zp-what" aria-labelledby="zp-what">
            <div className="zp-what-text">
              <h2 id="zp-what" className="zp-h2">
                <Accent heading={page.what.heading} />
              </h2>
              <p className="zp-text">{page.what.body}</p>
              <h3 className="zp-h3">
                <Accent heading={page.importance.heading} />
              </h3>
              <p className="zp-text">{page.importance.body}</p>
              <div className="zp-after">{register}</div>
            </div>
            <Image
              className="zp-laptop"
              src={page.what.image.src}
              alt={page.what.image.alt}
              width={page.what.image.width}
              height={page.what.image.height}
              sizes="(min-width: 1024px) 520px, 92vw"
            />
          </section>

          <section className="zp-sec" aria-labelledby="zp-readiness">
            <h2 id="zp-readiness" className="zp-h2">
              <Accent heading={page.readiness.heading} />
            </h2>
            <ul className="zp-conditions">
              {page.readiness.items.map((item) => (
                <li key={item.title}>
                  <Icon src={item.icon.src} />
                  <h3>{item.title}</h3>
                  {item.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </li>
              ))}
            </ul>
          </section>

          <section className="zp-sec" aria-labelledby="zp-requirements">
            <h2 id="zp-requirements" className="zp-h2">
              <Accent heading={page.requirements.heading} />
            </h2>
            <ul className="zp-reqs">
              {page.requirements.items.map((item) => (
                <li key={item.title}>
                  <Image src={item.photo.src} alt={item.photo.alt} width={item.photo.width} height={item.photo.height} sizes="(min-width: 1024px) 560px, 92vw" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
            <div className="zp-after">{register}</div>
          </section>

          <section className="zp-sec" aria-labelledby="zp-start">
            <h2 id="zp-start" className="zp-h2">
              <Accent heading={page.start.heading} />
            </h2>
            <ol className="zp-steps">
              {page.start.steps.map((step, i) => (
                <li key={i}>
                  <Icon src={step.icon.src} size={96} />
                  <span className="zp-node" aria-hidden="true" />
                  <div className="zp-step-text">
                    {step.title && <h3>{step.title}</h3>}
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="zp-sec" aria-labelledby="zp-mechanism">
            <h2 id="zp-mechanism" className="zp-h2">
              <Accent heading={page.mechanism.heading} />
            </h2>
            <p className="zp-text">{page.mechanism.intro}</p>
            <div className="zp-flows">
              {page.mechanism.flows.map((flow) => (
                <div key={flow.title} className="zp-flow">
                  <h3>{flow.title}</h3>
                  <p className="zp-flow-intro">{flow.intro}</p>
                  <ol className="zp-lane">
                    {flow.steps.map((step, i) => (
                      <li key={i}>
                        <span className="zp-lane-node">
                          <Icon src={step.icon.src} size={96} />
                        </span>
                        <p>{step.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          <section className="zp-sec" aria-labelledby="zp-features">
            <h2 id="zp-features" className="zp-h2">
              <Accent heading={page.vom.heading} />
            </h2>
            <p className="zp-text">{page.vom.intro}</p>
            <h3 className="zp-h3">
              <Accent heading={page.vom.helpHeading} />
            </h3>
            <ul className="zp-helps">
              {page.vom.items.map((item) => (
                <li key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Where the thread arrives: it turns and lands on ZATCA's badge again, as the hero's line does. */}
          <div className="zp-arrive" aria-hidden="true">
            <span className="zp-arrive-plate">
              {/* eslint-disable-next-line @next/next/no-img-element -- a small repeat of the hero's badge, decorative. */}
              <img src={optimizedSrc(page.badge.src, 384)} alt="" width={page.badge.width} height={page.badge.height} loading="lazy" decoding="async" />
            </span>
          </div>
        </div>
      </div>

      <section className="zp-close-band guilloche-dark guilloche-tile text-white">
        <div className="page-wrap zp-close">
          <p className="zp-close-line">{page.closing.body}</p>
          <div className="zp-close-actions">
            {register}
            <ButtonLink href={site.demo} variant="inverse" newTab={page.newTab}>
              {page.closing.call}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
