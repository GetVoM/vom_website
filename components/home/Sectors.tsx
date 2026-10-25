import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";

export function Sectors({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="sectors" className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[26ch] font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.sectors.heading}</h2>
        <Link href={localePath(locale, locale === "ar" ? "/برنامج-محاسبة-للمطاعم/" : "/accounting-software-for-food-and-beverages-2/")} className="text-[0.9375rem] font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-700">
          {t.sectors.all}
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {t.sectors.items.map((sector) => (
          <li key={sector.slug}>
            <Link
              href={localePath(locale, `/${sector.slug}/`)}
              className="sector flex h-full min-h-[132px] flex-col justify-between gap-5 rounded-[var(--radius-tile)] border border-teal-200 bg-paper p-5 text-ink"
            >
              <Icon name={sector.icon} size={26} className="text-teal-600" strokeWidth={1.5} />
              <span className="text-[0.9375rem] font-bold leading-snug">{sector.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
