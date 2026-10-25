import type { Dictionary } from "@/lib/i18n/dictionaries/types";

const DAYS = 31;
const TODAY = 25;
/** Sample activity per day, as a share of the tallest bar. */
const activity = [
  42, 55, 0, 61, 48, 70, 66, 0, 58, 74, 63, 80, 71, 0, 52, 77, 69, 88, 73, 90, 0, 64, 83, 79, 100, 0, 0, 0, 0, 0, 0,
];

export function MonthStrip({ t }: { t: Dictionary }) {
  return (
    <section className="border-y border-paper-200 bg-paper">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-9">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-arabic text-[1.25rem] font-bold leading-snug">{t.month.heading}</h2>
          <div className="flex items-center gap-5 text-[0.8125rem] text-ink-500">
            <span className="num font-bold text-ink">{t.month.label}</span>
            <span className="inline-flex items-center gap-2">
              <i className="inline-block h-2.5 w-2.5 rounded-sm bg-teal-500" />
              {t.month.legendOn}
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-500" />
              {t.month.legendToday}
            </span>
          </div>
        </div>
        <div className="grid h-14 grid-cols-[repeat(31,minmax(0,1fr))] items-end gap-[3px]" dir="ltr" aria-hidden="true">
          {Array.from({ length: DAYS }, (_, i) => {
            const day = i + 1;
            const on = activity[i] > 0 && day <= TODAY;
            const h = day > TODAY ? 14 : Math.max(14, activity[i]);
            return (
              <i
                key={day}
                className="tick"
                data-on={on ? "" : undefined}
                data-today={day === TODAY ? "" : undefined}
                style={{ "--h": `${h}%` } as React.CSSProperties}
              />
            );
          })}
        </div>
        <div className="num flex justify-between text-[0.75rem] text-ink-300" dir="ltr">
          <span>1</span>
          <span>8</span>
          <span>15</span>
          <span>22</span>
          <span className="font-bold text-orange-600">25</span>
          <span>31</span>
        </div>
      </div>
    </section>
  );
}
