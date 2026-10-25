import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";

/** Small drawn glyphs so each report card reads as a different document. */
function Glyph({ kind }: { kind: number }) {
  const bars = [[55, 80, 45, 95, 70], [40, 65, 85, 60, 90], [70, 50, 90, 65, 80]];
  switch (kind % 4) {
    case 0:
      return (
        <div className="flex h-10 items-end gap-1" aria-hidden="true">
          {bars[kind % 3].map((h, i) => (
            <span key={i} className="w-2 rounded-sm" style={{ height: `${h}%`, background: i % 2 ? "var(--color-teal-500)" : "var(--color-teal-200)" }} />
          ))}
        </div>
      );
    case 1:
      return (
        <svg width="72" height="40" viewBox="0 0 72 40" aria-hidden="true" fill="none">
          <path d="M2 32 L16 24 L30 28 L44 14 L58 18 L70 6" stroke="var(--color-teal-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 38h68" stroke="var(--color-teal-200)" strokeWidth="1" />
        </svg>
      );
    case 2:
      return (
        <div className="flex w-20 flex-col gap-1.5" aria-hidden="true">
          {[90, 70, 100, 60].map((w, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="h-1.5 rounded-pill bg-teal-200" style={{ width: `${w}%` }} />
              <span className="h-1.5 w-3 rounded-pill bg-teal-500" />
            </span>
          ))}
        </div>
      );
    default:
      return (
        <div className="relative h-10 w-10" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border-[6px] border-teal-200" />
          <span className="absolute inset-0 rounded-full border-[6px] border-teal-500" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }} />
        </div>
      );
  }
}

export function Reports({ locale, t }: { locale: Locale; t: Dictionary }) {
  const featuresHref = localePath(locale, locale === "ar" ? "/features/" : "/features-en/");
  return (
    <section id="reports" className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline gap-3">
              <span className="num text-[4.5rem] font-bold leading-none text-teal-700 sm:text-[5.5rem]">14+</span>
              <span className="text-[1.25rem] font-bold">{t.reports.countLabel}</span>
            </div>
            <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.reports.heading}</h2>
            <p className="max-w-[44ch] text-[1.0625rem] leading-[1.75] text-ink-700">{t.reports.body}</p>
            <Link
              href={featuresHref}
              className="inline-flex h-11 w-fit items-center gap-2 rounded-pill border border-ink/80 px-5 text-[0.9375rem] font-bold text-ink transition-colors hover:bg-paper"
            >
              {t.reports.cta}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {t.reports.items.map((name, i) => (
              <li
                key={name}
                className="report-card flex min-h-[150px] flex-col justify-between gap-5 rounded-[var(--radius-tile)] border border-paper-300 bg-paper p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <Glyph kind={i} />
                  {i === 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-pill bg-teal-50 px-2 py-0.5 text-[0.6875rem] font-bold text-teal-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                      {t.reports.live}
                    </span>
                  )}
                </div>
                <span className="text-[0.9375rem] font-bold leading-snug">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
