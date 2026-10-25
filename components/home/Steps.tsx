"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { QrCode } from "./QrCode";

export function Steps({ t }: { t: Dictionary }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const p = t.steps.panels;

  return (
    <section id="features" className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
      <div className="mb-14 flex max-w-[62ch] flex-col gap-4">
        <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem] lg:text-[2.5rem]">
          {t.steps.heading}
        </h2>
        <p className="text-[1.0625rem] leading-relaxed text-ink-700">{t.steps.body}</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <div className="sticky top-28">
            <div className="doc-frame relative min-h-[420px] w-full max-w-[440px] bg-paper sm:min-h-[460px]">
              {/* Panel 1: sale */}
              <div className="story-panel p-6 sm:p-8" data-active={active === 0 ? "" : undefined}>
                <div className="flex items-center justify-between border-b border-teal-200 pb-3">
                  <span className="text-[1.0625rem] font-bold">{p.sale.title}</span>
                  <span className="num text-[0.8125rem] text-ink-500">14:32</span>
                </div>
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-[0.9375rem]">
                  <dt className="text-ink-500">{p.sale.customer}</dt>
                  <dd className="font-bold">{t.invoice.seller}</dd>
                  <dt className="text-ink-500">{p.sale.amount}</dt>
                  <dd className="num text-[1.5rem] font-bold leading-none">263.35</dd>
                  <dt className="text-ink-500">{p.sale.method}</dt>
                  <dd className="num font-bold">{p.sale.methodValue}</dd>
                </dl>
                <div className="mt-8 inline-flex h-10 items-center gap-2 rounded-pill bg-teal-500 px-4 text-[0.875rem] font-bold text-white">
                  {p.sale.button}
                  <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
                </div>
              </div>

              {/* Panel 2: invoice */}
              <div className="story-panel p-6 sm:p-8" data-active={active === 1 ? "" : undefined}>
                <div className="flex items-center justify-between border-b border-teal-200 pb-3">
                  <span className="text-[1.0625rem] font-bold">{p.invoice.title}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-teal-500 px-2.5 py-1 text-[0.6875rem] font-bold text-white">
                    <Icon name="check" size={11} strokeWidth={3} />
                    {p.invoice.status}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-2 text-[0.875rem]">
                    <span className="text-ink-500">{t.invoice.kind}</span>
                    <span className="font-bold">{t.invoice.seller}</span>
                    <span className="num text-ink-700" dir="ltr">3000 0000 0000 03</span>
                  </div>
                  <QrCode className="w-[108px] shrink-0" animate={false} />
                </div>
                <table className="mt-5 w-full border-collapse text-[0.875rem]">
                  <tbody>
                    {t.invoice.items.map(([name, qty, price]) => (
                      <tr key={name} className="border-t border-paper-200">
                        <td className="py-2">{name}</td>
                        <td className="num py-2 text-center text-ink-500">×{qty}</td>
                        <td className="num py-2 text-end">{(Number(qty) * Number(price)).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-paper-200 text-ink-700">
                      <td className="py-2" colSpan={2}>{t.invoice.vat}</td>
                      <td className="num py-2 text-end">34.35</td>
                    </tr>
                    <tr className="border-t border-ink font-bold">
                      <td className="py-2" colSpan={2}>{t.invoice.total}</td>
                      <td className="num py-2 text-end">263.35</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Panel 3: report */}
              <div className="story-panel p-6 sm:p-8" data-active={active === 2 ? "" : undefined}>
                <div className="flex items-center justify-between border-b border-teal-200 pb-3">
                  <span className="text-[1.0625rem] font-bold">{p.report.title}</span>
                  <span className="text-[0.8125rem] text-ink-500">{p.report.period}</span>
                </div>
                <div className="mt-5 flex flex-col gap-2.5 text-[0.9375rem]">
                  {t.report.rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-ink-700">{label}</span>
                      <span className="num">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-ink pt-2.5 font-bold">
                    <span>{t.report.net}</span>
                    <span className="num text-teal-700">{t.report.netValue}</span>
                  </div>
                </div>
                <div className="mt-6 flex h-20 items-end gap-1.5" aria-hidden="true">
                  {[40, 55, 48, 70, 62, 84, 76, 96, 70, 88].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm transition-[height] duration-700"
                      style={{ height: active === 2 ? `${h}%` : "8%", background: i % 2 ? "var(--color-teal-500)" : "var(--color-teal-200)" }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-x-6 bottom-5 flex items-center justify-between sm:inset-x-8" aria-hidden="true">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={`h-1.5 rounded-pill transition-all duration-500 ${active === i ? "w-6 bg-teal-500" : "w-1.5 bg-teal-200"}`} />
                  ))}
                </div>
                <span className="label-en">Step {active + 1} / 3</span>
              </div>
            </div>
          </div>
        </div>

        <ol className="order-1 flex flex-col border-s border-teal-200 lg:order-2">
          {t.steps.items.map((step, i) => (
            <li key={step.title}>
              <div
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="story-step relative flex min-h-[36vh] flex-col justify-center gap-3 border-t border-teal-200 py-10 ps-8 lg:min-h-[52vh]"
                data-active={active === i ? "" : undefined}
              >
                <span className="absolute -start-[7px] top-10 h-3.5 w-3.5 rounded-full border-2 border-paper bg-teal-500 shadow-[0_0_0_2px_var(--color-teal-200)]" aria-hidden="true" />
                <span className="num text-[0.875rem] font-bold text-teal-600">0{i + 1}</span>
                <h3 className="font-arabic text-[1.5rem] font-bold leading-snug sm:text-[1.75rem]">{step.title}</h3>
                <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink-700">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
