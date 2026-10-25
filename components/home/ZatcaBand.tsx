import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { ButtonLink } from "@/components/ui/Button";
import { Guilloche } from "./Guilloche";
import { QrCode } from "./QrCode";

export function ZatcaBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  const guideHref = localePath(locale, locale === "ar" ? "/الفوترة-الإلكترونية/" : "/zatca-e-invoicing-phase-2/");
  return (
    <section id="zatca" className="guilloche-dark relative overflow-hidden text-white">
      <Guilloche id="zatca-guilloche" className="absolute inset-0 h-full w-full" stroke="rgba(255,255,255,0.14)" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:py-32">
        <div className="flex flex-col gap-6">
          <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem] lg:text-[2.5rem]">{t.zatca.heading}</h2>
          <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/90">{t.zatca.body}</p>
          <div>
            <ButtonLink href={guideHref} variant="inverse" arrow>
              {t.zatca.cta}
            </ButtonLink>
          </div>
          <ol className="mt-4 flex flex-col gap-0 border-s border-white/40 ps-5">
            {t.zatca.timeline.map((item, i) => (
              <li key={item.date} className="relative pb-5 last:pb-0">
                <span
                  className={`absolute -start-[25px] top-1.5 h-2.5 w-2.5 rounded-full ${i === t.zatca.timeline.length - 1 ? "bg-orange-500" : "bg-white"}`}
                />
                <div className="num text-[0.8125rem] text-white/80">{item.date}</div>
                <div className="text-[0.9375rem]">{item.label}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 self-center sm:grid-cols-3">
          {t.zatca.types.map((type, i) => (
            <div key={type.title} className="flex h-fit flex-col gap-6 rounded-[var(--radius-tile)] bg-paper p-5 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-2">
                <div className="text-[1.0625rem] font-bold">{type.title}</div>
                <p className="text-[0.875rem] leading-relaxed text-ink-700">{type.body}</p>
              </div>
              <div className="flex items-end justify-between">
                <QrCode className="w-[56px]" animate={false} />
                <span className="label-en">{["Tax", "Simplified", "Note"][i]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
