import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { PayErrorCode, PayErrorMessage } from "@/components/vompay/PayError";
import { vomPayFailure, vomPayImages as img, vomPaySuccess } from "@/lib/content/vom-pay";
import type { Locale } from "@/lib/i18n/config";
import { vomPayFailurePaths, vomPaySuccessPaths } from "@/lib/i18n/routes";
import { optimizedSrc } from "@/lib/image-url";
import { VOM_PAY_FORM, gtmFormSuccess } from "@/lib/leads/vom-pay";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";

export type PayOutcome = "success" | "failure";

/** Same address in both languages, paired for hreflang; hidden from search (url-map.csv keep-noindex). */
export function payMetadata(outcome: PayOutcome, locale: Locale): Metadata {
  const copy = outcome === "success" ? vomPaySuccess[locale] : vomPayFailure[locale];
  const path = (outcome === "success" ? vomPaySuccessPaths : vomPayFailurePaths)[locale];
  const meta = buildMetadata({ locale, path, alternatePath: path, title: copy.seoTitle, description: copy.description });
  return { ...meta, title: { absolute: copy.seoTitle }, robots: { index: false, follow: true } };
}

/**
 * The result pages the app sends a VoM Pay payer to: "status beside the form".
 * The first screen holds the outcome on the start side (the old illustration on
 * the old ribbon panel) and what comes next on the end side: on success the
 * invitation and the lead form on the teal field, on failure the code's message
 * and the FAQ. Direction contract:
 * .impeccable/surfaces/components-vompay-payresult-tsx.md. Styled from `.pr-`
 * in app/globals.css.
 */
export function PayResult({ outcome, locale }: { outcome: PayOutcome; locale: Locale }) {
  return outcome === "success" ? <Success locale={locale} /> : <Failure locale={locale} />;
}

/** The outcome: the old illustration standing in the old light-blue ribbon panel, the status and what follows it. */
function Status({ outcome, image, alt, heading, children }: { outcome: PayOutcome; image: typeof img.success; alt: string; heading: string; children: ReactNode }) {
  return (
    <div className="pr-status" data-outcome={outcome} style={{ "--pr-bg": `url(${optimizedSrc(img.heroBg.src, 1080)})` } as CSSProperties}>
      <Image className="pr-illustration" src={image.src} alt={alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 240px, 180px" preload />
      <h1 className="pr-title">{heading}</h1>
      {children}
    </div>
  );
}

function Success({ locale }: { locale: Locale }) {
  const c = vomPaySuccess[locale];
  const [first, ...rest] = c.features;
  return (
    <>
      <section className="pr-top">
        <div className="page-wrap pr-grid">
          <Status outcome="success" image={img.success} alt={c.alt} heading={c.heading}>
            <p className="pr-line">{c.line}</p>
          </Status>

          <div className="pr-field guilloche-tile">
            <div className="pr-sheet">
              <div className="pr-sheet-head">
                <h2 id="pr-invite">{c.formIntro[0]}</h2>
                <p>{c.formIntro[1]}</p>
              </div>
              <LeadForm
                form={VOM_PAY_FORM}
                locale={locale}
                copy={c.form}
                label={c.formIntro[0]}
                gtm={gtmFormSuccess}
                whatsappUrl={site.whatsappUrl}
                email={{ label: c.form.email, error: c.form.errors.email }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pr-features" aria-labelledby="pr-pitch">
        <div className="page-wrap">
          <div className="pr-pitch">
            {/* eslint-disable-next-line @next/next/no-img-element -- the VoM AI logo at one size; it carries the old pages' «VoM AI» line. */}
            <img className="pr-vom-ai" src={optimizedSrc(img.vomAi.src, 384)} alt={c.pitch.badge} width={img.vomAi.width} height={img.vomAi.height} loading="lazy" decoding="async" />
            <div>
              <h2 id="pr-pitch" className="pr-pitch-title">
                {c.pitch.lead}
              </h2>
              <p className="pr-pitch-line">{c.pitch.line}</p>
            </div>
          </div>

          <h3 className="pr-features-title">{c.featuresHeading}</h3>
          <div className="pr-lead-feature">
            <Image className="pr-laptop" src={img.laptop.src} alt={c.laptopAlt} width={img.laptop.width} height={img.laptop.height} sizes="(min-width: 1024px) 560px, 92vw" />
            <div className="pr-feature">
              {/* eslint-disable-next-line @next/next/no-img-element -- six small icons at one size. */}
              <img src={optimizedSrc(first.icon, 128)} alt="" width={256} height={256} loading="lazy" decoding="async" />
              <h4>{first.title}</h4>
              <p>{first.body}</p>
              <span className="pr-zatca">
                {/* eslint-disable-next-line @next/next/no-img-element -- ZATCA's logo on its plate, at one size. */}
                <img src={optimizedSrc(img.zatca.src, 384)} alt={c.zatcaAlt} width={img.zatca.width} height={img.zatca.height} loading="lazy" decoding="async" />
              </span>
            </div>
          </div>
          <ul className="pr-register">
            {rest.map((feature, i) => (
              <li key={i} className="pr-feature">
                {/* eslint-disable-next-line @next/next/no-img-element -- six small icons at one size. */}
                <img src={optimizedSrc(feature.icon, 128)} alt="" width={256} height={256} loading="lazy" decoding="async" />
                <h4>{feature.title}</h4>
                <p>{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pr-close-band guilloche-dark guilloche-tile text-white">
        <div className="page-wrap pr-close">
          <p className="pr-close-line">{c.closing}</p>
          <ButtonLink href={site.signup[locale]} variant="primary" arrow>
            {c.register}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function Failure({ locale }: { locale: Locale }) {
  const c = vomPayFailure[locale];
  return (
    <section className="pr-top pr-top-failure">
      <div className="page-wrap pr-grid">
        <Status outcome="failure" image={img.failure} alt={c.alt} heading={c.heading}>
          <PayErrorCode copy={c} className="pr-code" />
        </Status>

        <div className="pr-after">
          <div className="pr-sheet">
            <div className="pr-sheet-head">
              <h2>{c.messageHeading}</h2>
            </div>
            <PayErrorMessage copy={c} className="pr-message" />
          </div>
          <div className="pr-faq" aria-labelledby="pr-faq-title" role="region">
            <h2 id="pr-faq-title" className="pr-faq-title">
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
        </div>
      </div>
    </section>
  );
}
