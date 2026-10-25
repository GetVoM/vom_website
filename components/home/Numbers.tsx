import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { CountUp } from "@/components/ui/CountUp";

export function Numbers({ t }: { t: Dictionary }) {
  const last = t.numbers.items.length - 1;
  return (
    <section id="numbers" className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-28">
      <div className="doc-frame bg-paper">
        <div className="grid lg:grid-cols-[4fr_8fr]">
          <div className="flex flex-col justify-between gap-6 border-b border-teal-200 p-8 lg:border-b-0 lg:border-e lg:p-10">
            <div className="flex flex-col gap-3">
              <h2 className="font-arabic text-[1.75rem] font-bold leading-[1.25] sm:text-[2rem]">{t.numbers.heading}</h2>
              <p className="text-[1rem] leading-relaxed text-ink-700">{t.numbers.body}</p>
            </div>
            <div className="flex items-center justify-between text-[0.8125rem] text-ink-500">
              <span>{t.numbers.asOf}</span>
              <span className="label-en">Record</span>
            </div>
          </div>
          <dl className="grid sm:grid-cols-3">
            {t.numbers.items.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col justify-between gap-8 p-8 lg:p-10 ${i < last ? "border-b border-teal-200 sm:border-b-0 sm:border-e" : ""}`}
              >
                <dd className="order-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[3rem] font-bold leading-none text-teal-700 sm:text-[3.5rem]">
                    <CountUp value={item.value} />
                    {item.suffix && <span className="num">{item.suffix}</span>}
                  </span>
                  {item.unit && <span className="text-[1.125rem] font-bold text-ink">{item.unit}</span>}
                </dd>
                <dt className="order-2 text-[0.9375rem] leading-snug text-ink-700">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
