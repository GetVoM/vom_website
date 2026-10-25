import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { VatCalculator } from "@/components/tools/VatCalculator";

export function Resources({ locale, t }: { locale: Locale; t: Dictionary }) {
  const kindLabel = { guide: t.resources.guide, tool: t.resources.tool, template: t.resources.template };
  const kindIcon = { guide: "book", tool: "calculator", template: "download" } as const;
  return (
    <section id="resources" className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[30ch] font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.resources.heading}</h2>
          <Link href={localePath(locale, locale === "ar" ? "/blog/" : "/blog-en/")} className="text-[0.9375rem] font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-700">
            {t.resources.all}
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            {t.resources.items.slice(0, 2).map((item) => (
              <Link
                key={item.title}
                href={localePath(locale, item.href)}
                className="group flex flex-col gap-4 rounded-[var(--radius-tile)] border border-paper-300 bg-paper p-6 transition-colors hover:border-teal-500"
              >
                <span className="inline-flex items-center gap-2 text-[0.8125rem] text-teal-700">
                  <Icon name={kindIcon[item.kind]} size={16} />
                  {kindLabel[item.kind]}
                </span>
                <span className="text-[1.125rem] font-bold leading-snug group-hover:text-teal-800">{item.title}</span>
                {item.minutes > 0 && (
                  <span className="text-[0.8125rem] text-ink-500">
                    <span className="num">{item.minutes}</span> {t.resources.readMinutes}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {t.resources.items.slice(2).map((item) => (
              <Link
                key={item.title}
                href={localePath(locale, item.href)}
                className="group flex h-full flex-col justify-between gap-4 rounded-[var(--radius-tile)] bg-teal-500 p-6 text-white transition-colors hover:bg-teal-600"
              >
                <span className="inline-flex items-center gap-2 text-[0.8125rem] text-white/85">
                  <Icon name={kindIcon[item.kind]} size={16} />
                  {kindLabel[item.kind]}
                </span>
                <span className="text-[1.375rem] font-bold leading-snug">{item.title}</span>
                <span className="inline-flex items-center gap-2 text-[0.875rem] text-white/90">
                  <Icon name="download" size={16} />
                  Excel
                </span>
              </Link>
            ))}
          </div>
          <VatCalculator t={t.vat} />
        </div>
      </div>
    </section>
  );
}
