import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { featuresPaths } from "@/lib/i18n/routes";
import { ReportIcon } from "@/components/reports/ReportIcon";
import { Icon } from "@/components/ui/Icon";

export function Reports({ locale, t }: { locale: Locale; t: Dictionary }) {
  const featuresHref = localePath(locale, featuresPaths[locale]);
  return (
    <section id="reports" className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline gap-3">
              <span className="num text-[4.5rem] font-bold leading-none text-teal-500 sm:text-[5.5rem]">{t.reports.items.length}</span>
              <span className="text-[1.25rem] font-bold">{t.reports.countLabel}</span>
            </div>
            <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.reports.heading}</h2>
            <p className="max-w-[44ch] text-[1.0625rem] leading-[1.75] text-ink-700">{t.reports.body}</p>
            <Link
              href={featuresHref}
              className="btn btn-secondary w-fit"
            >
              {t.reports.cta}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {t.reports.items.map((report, i) => (
              <li
                key={report.id}
                className="report-card relative flex min-h-[150px] flex-col justify-between gap-5 rounded-[var(--radius-tile)] border border-paper-300 bg-paper p-5"
              >
                <ReportIcon id={report.id} className="h-10 w-20" />
                {/* A tab on the card's top edge: beside the 80px icon it would not fit on one line. */}
                {i === 0 && (
                  <span className="absolute -top-2.5 end-4 inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-teal-500 px-2 py-0.5 text-[0.6875rem] font-bold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {t.reports.live}
                  </span>
                )}
                <span className="text-[0.9375rem] font-bold leading-snug">{report.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
