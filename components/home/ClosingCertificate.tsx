"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";

interface Props {
  t: Dictionary;
  signupHref: string;
  compareHref: string;
}

export function ClosingCertificate({ t, signupHref, compareHref }: Props) {
  const [name, setName] = useState("");
  const id = useId();
  const shown = name.trim() || t.closing.defaultName;

  return (
    <section id="start" className="border-t border-paper-200 bg-paper">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:grid-cols-[6fr_5fr] lg:gap-20 lg:py-32">
        <div className="flex flex-col gap-6">
          <h2 className="font-arabic text-[2rem] font-bold leading-[1.2] sm:text-[2.5rem]">{t.closing.heading}</h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-700">{t.closing.body}</p>
          <form
            className="flex max-w-[520px] flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = signupHref;
            }}
          >
            <label htmlFor={`${id}-name`} className="sr-only">
              {t.closing.inputLabel}
            </label>
            <input
              id={`${id}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.closing.placeholder}
              className="h-12 flex-1 rounded-pill border border-paper-300 bg-paper px-5 text-[1rem] text-ink placeholder:text-ink-300 focus:border-teal-500 focus:outline-none"
              maxLength={60}
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-orange-500 px-5 text-[0.9375rem] font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] transition-colors hover:bg-orange-600"
            >
              {t.closing.cta}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </button>
          </form>
          <p className="text-[0.9375rem] text-ink-500">
            {t.closing.pricingLine}{" "}
            <Link href={compareHref} className="font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-700">
              {t.closing.compare}
            </Link>
          </p>
        </div>

        <div className="doc-frame relative mx-auto w-full max-w-[420px] bg-paper p-7 shadow-[0_40px_80px_-40px_rgba(5,42,37,0.4)]" aria-hidden="true">
          <div className="flex items-start justify-between border-b border-teal-200 pb-4">
            <div>
              <div className="text-[1.125rem] font-bold">{t.certificate.title}</div>
              <div className="label-en">Certificate of compliance</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-[0.8125rem]">
            <div className="col-span-2">
              <div className="text-ink-500">{t.certificate.establishment}</div>
              <div className="font-arabic text-[1.375rem] font-bold leading-snug transition-all">{shown}</div>
            </div>
            <div>
              <div className="text-ink-500">{t.certificate.status}</div>
              <div className="flex items-center gap-1.5 font-bold text-teal-700">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-white">
                  <Icon name="check" size={10} strokeWidth={3} />
                </span>
                {t.certificate.statusValue}
              </div>
            </div>
            <div>
              <div className="text-ink-500">{t.certificate.serial}</div>
              <div className="num font-bold" dir="ltr">
                VOM-2026-{String(Math.min(99999, shown.length * 1237)).padStart(5, "0")}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div className="flex h-[96px] w-[96px] flex-col items-center justify-center rounded-full border-[3px] border-double border-teal-500 text-center text-teal-700" style={{ transform: "rotate(-8deg)" }}>
              <span className="text-[0.5625rem] leading-tight">{t.certificate.sealTop}</span>
              <span className="text-[1.0625rem] font-extrabold leading-none">{t.certificate.sealMain}</span>
              <span className="label-en text-teal-700">Phase 2</span>
            </div>
            <span className="text-[0.6875rem] text-ink-300">{t.hero.demoLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
