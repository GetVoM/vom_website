import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";

type IconName = Parameters<typeof Icon>[0]["name"];

/** A small product glimpse per feature so the tiles show, not just tell. */
function Glimpse({ index, t }: { index: number; t: Dictionary }) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col divide-y divide-paper-200 rounded-[var(--radius-tile)] border border-paper-200 bg-paper text-[0.8125rem]" aria-hidden="true">
          {[
            ["#1043", t.invoice.kind, "263.35", true],
            ["#1042", t.steps.panels.invoice.title, "1,725.00", true],
            ["#1041", t.invoice.kind, "640.00", false],
          ].map(([no, kind, amount, done]) => (
            <div key={String(no)} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className="flex items-center gap-2">
                <span className="num font-bold">{no}</span>
                <span className="text-ink-500">{kind}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="num">{amount}</span>
                <span className={`h-2 w-2 rounded-full ${done ? "bg-teal-500" : "bg-orange-500"}`} />
              </span>
            </div>
          ))}
        </div>
      );
    case 1:
      return (
        <div className="flex items-center gap-3 rounded-[var(--radius-tile)] border border-paper-200 bg-paper p-3 text-[0.8125rem]" aria-hidden="true">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <Icon name="receipt" size={18} />
          </span>
          <span className="flex flex-col">
            <span className="font-bold">مورّد الخضار</span>
            <span className="text-ink-500">2,140.00 · 50%</span>
          </span>
          <span className="ms-auto h-1.5 w-16 overflow-hidden rounded-pill bg-paper-200">
            <span className="block h-full w-1/2 bg-teal-500" />
          </span>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center justify-between rounded-[var(--radius-tile)] border border-orange-500/40 bg-orange-50 px-4 py-3 text-[0.8125rem]" aria-hidden="true">
          <span className="flex flex-col">
            <span className="font-bold">مياه معدنية</span>
            <span className="text-ink-700">المتبقي 12 · الحد الأدنى 24</span>
          </span>
          <span className="rounded-pill bg-orange-500 px-2 py-0.5 text-[0.6875rem] font-bold text-white">أعد الطلب</span>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col gap-2" aria-hidden="true">
          <div className="flex h-14 items-end gap-2">
            {[100, 80, 60, 40, 20].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 0 ? "var(--color-teal-500)" : "var(--color-teal-200)" }} />
            ))}
          </div>
          <div className="num flex justify-between border-t border-dashed border-teal-200 pt-1.5 text-[0.6875rem] text-ink-500">
            {["1", "2", "3", "4", "5"].map((y) => (
              <span key={y}>{y}</span>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex items-center justify-between rounded-[var(--radius-tile)] border border-paper-200 bg-paper px-4 py-3 text-[0.8125rem]" aria-hidden="true">
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700">س</span>
            <span className="flex flex-col">
              <span className="font-bold">مسيّر رواتب أكتوبر</span>
              <span className="text-ink-500">12 موظفًا</span>
            </span>
          </span>
          <span className="num font-bold">48,600.00</span>
        </div>
      );
    case 6:
      return (
        <div className="flex flex-wrap items-center gap-2 text-[0.8125rem]" aria-hidden="true">
          {["الرياض", "جدة", "الدمام"].map((b, i) => (
            <span key={b} className={`inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 ${i === 0 ? "border-teal-500 bg-teal-50 text-teal-800" : "border-paper-300 text-ink-700"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-teal-500" : "bg-paper-300"}`} />
              {b}
            </span>
          ))}
          <span className="ms-auto flex -space-x-2 rtl:space-x-reverse">
            {["م", "ن", "خ"].map((c) => (
              <span key={c} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-paper bg-teal-100 text-[0.6875rem] font-bold text-teal-800">
                {c}
              </span>
            ))}
          </span>
        </div>
      );
    case 7:
      return (
        <div className="flex items-center justify-between rounded-[var(--radius-tile)] border border-paper-200 bg-paper px-4 py-3 text-[0.8125rem]" aria-hidden="true">
          <span className="flex flex-col">
            <span className="font-bold">رابط دفع · <span className="num">#1043</span></span>
            <span className="text-ink-500">مدى · Apple Pay · فيزا</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="num font-bold">263.35</span>
            <span className="rounded-pill bg-teal-500 px-2 py-0.5 text-[0.6875rem] font-bold text-white">مدفوع</span>
          </span>
        </div>
      );
    default:
      return (
        <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
          {[40, 62, 50, 78, 66, 90, 72, 100, 84].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 2 ? "var(--color-teal-500)" : "var(--color-teal-200)" }} />
          ))}
        </div>
      );
  }
}

export function Features({ locale, t }: { locale: Locale; t: Dictionary }) {
  const featuresHref = localePath(locale, locale === "ar" ? "/features/" : "/features-en/");
  return (
    <section id="feature-highlights" className="border-t border-paper-200">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[60ch] flex-col gap-3">
            <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.features.heading}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-ink-700">{t.features.body}</p>
          </div>
          <Link
            href={featuresHref}
            className="inline-flex h-11 items-center gap-2 rounded-pill border border-ink/80 px-5 text-[0.9375rem] font-bold text-ink transition-colors hover:bg-paper-100"
          >
            {t.features.cta}
            <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => (
            <li
              key={item.title}
              className={`flex flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-paper-300 bg-paper p-6 sm:p-7 ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <div className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon name={item.icon as IconName} size={22} />
                </span>
                <h3 className="text-[1.25rem] font-bold leading-snug">{item.title}</h3>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-700">{item.body}</p>
              </div>
              <Glimpse index={i} t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
