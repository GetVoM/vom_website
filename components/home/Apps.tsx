import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Guilloche } from "./Guilloche";
import { QrCode } from "./QrCode";

export function Apps({ t }: { t: Dictionary }) {
  const a = t.apps;
  return (
    <section id="apps" className="relative overflow-hidden border-t border-paper-200">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:grid-cols-[6fr_6fr] lg:gap-16 lg:py-32">
        <div className="flex flex-col gap-7">
          <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem] lg:text-[2.5rem]">{a.heading}</h2>
          <p className="max-w-[52ch] text-[1.0625rem] leading-[1.75] text-ink-700">{a.body}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {a.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[0.9375rem] leading-snug">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                  <Icon name="check" size={11} strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <StoreBadges ios={a.ios} android={a.android} />
          </div>
        </div>

        <div className="relative flex justify-center py-10">
          <div className="absolute inset-x-0 top-0 bottom-0 -z-10 mx-auto w-full max-w-[560px] rounded-[48px] bg-teal-500">
            <Guilloche id="apps-guilloche" className="h-full w-full rounded-[48px]" stroke="rgba(255,255,255,0.14)" />
          </div>
          <div className="relative w-[280px] rounded-[44px] bg-ink p-2.5 shadow-[0_50px_90px_-40px_rgba(5,42,37,0.7)]" aria-hidden="true">
            <div className="relative flex h-[580px] flex-col overflow-hidden rounded-[36px] bg-paper">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-2.5">
                <span className="h-6 w-24 rounded-pill bg-ink" />
              </div>
              <div className="flex items-center justify-between px-6 pb-3 pt-12 text-[0.75rem]">
                <span className="num font-bold">14:32</span>
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-ink" />
                  <span className="h-2 w-2 rounded-full bg-ink" />
                  <span className="h-2 w-2 rounded-full bg-ink-300" />
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-paper-200 px-6 pb-4">
                <span className="text-[1.0625rem] font-bold">{a.screen.title}</span>
                <span className="text-[0.8125rem] text-ink-500">{a.screen.subtitle}</span>
              </div>
              <div className="flex flex-col gap-4 px-6 py-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.75rem] text-ink-500">{t.invoice.total}</span>
                  <span className="num text-[2.25rem] font-bold leading-none">{a.screen.amount}</span>
                  <span className="text-[0.75rem] text-ink-500">{t.invoice.vat}: <span className="num">34.35</span></span>
                </div>
                <div className="flex flex-col divide-y divide-paper-200 border-y border-paper-200 text-[0.8125rem]">
                  {t.invoice.items.map(([name, qty, price]) => (
                    <div key={name} className="flex items-center justify-between py-2">
                      <span>{name}</span>
                      <span className="num text-ink-700">{(Number(qty) * Number(price)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <QrCode className="w-[72px]" animate={false} />
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-teal-500 px-2.5 py-1 text-[0.6875rem] font-bold text-white">
                    <Icon name="check" size={11} strokeWidth={3} />
                    {a.screen.status}
                  </span>
                </div>
              </div>
              <div className="mt-auto px-6 pb-6">
                <span className="flex h-12 items-center justify-center gap-2 rounded-pill bg-orange-500 text-[0.9375rem] font-bold text-white">
                  {a.screen.button}
                  <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
