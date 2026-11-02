import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { site } from "@/lib/seo/site";
import { Postmark } from "./Postmark";

const linkClass =
  "inline-flex min-h-11 items-center font-bold underline decoration-teal-300 underline-offset-[6px] transition-colors hover:text-teal-700 hover:decoration-teal-700";

/**
 * The page's one motion moment, in CSS only. Every element's resting style is
 * the opened state and the keyframes only state where it starts, so the
 * contact details are never hidden when motion is reduced or unavailable.
 */
export function Envelope({ t }: { t: Dictionary }) {
  const info = t.contact.info;

  return (
    <div className="envelope">
      <div className="env-back" aria-hidden="true" />
      <div className="env-flap" aria-hidden="true">
        <span className="env-flap-out" />
        <span className="env-flap-in">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <path d="M0 100 L100 100 L50 0 Z" fill="none" stroke="var(--color-teal-300)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </div>

      <div className="env-sheet">
        <div className="env-letter doc-frame bg-paper">
          <div className="flex items-center justify-between gap-4 border-b border-teal-200 pb-4">
            <Image src={site.logo} alt="" width={92} height={30} />
            <span className="text-[0.75rem] text-ink-500" lang="en" dir="ltr">
              Value of Money
            </span>
          </div>

          <h2 className="mt-5 text-[1.25rem] font-bold leading-snug">{info.heading}</h2>

          <address className="mt-3 not-italic">
            <dl className="flex flex-col divide-y divide-paper-200">
              <div className="flex flex-col gap-1 py-3">
                <dt className="text-[0.875rem] text-ink-500">{info.addressLabel}</dt>
                <dd className="text-[1.0625rem] font-bold leading-snug">{info.address}</dd>
              </div>
              <div className="flex flex-col gap-1 py-3">
                <dt className="text-[0.875rem] text-ink-500">{info.phoneLabel}</dt>
                <dd>
                  <a href={`tel:${site.whatsapp}`} className={`${linkClass} num text-[1.25rem]`} dir="ltr">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1 py-3">
                <dt className="text-[0.875rem] text-ink-500">{info.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className={`${linkClass} num text-[1.25rem]`} dir="ltr">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </address>
        </div>
      </div>

      <div className="env-pocket" aria-hidden="true">
        <div className="env-pocket-face">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <g fill="none" stroke="var(--color-teal-200)" strokeWidth="1">
              <path d="M0 0 L50 45 L100 0" vectorEffect="non-scaling-stroke" />
              <path d="M1.2 98.7 L50 45 L98.8 98.7" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
          <Postmark className="env-postmark" />
        </div>
      </div>

      <div className="env-seal" aria-hidden="true">
        <span className="env-seal-half env-seal-a">{t.brand.name}</span>
        <span className="env-seal-half env-seal-b">{t.brand.name}</span>
      </div>
    </div>
  );
}
