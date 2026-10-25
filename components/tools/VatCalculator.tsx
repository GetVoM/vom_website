"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";

export function calcVat(amount: number, ratePercent: number, inclusive: boolean) {
  const rate = ratePercent / 100;
  if (inclusive) {
    const net = amount / (1 + rate);
    return { net, tax: amount - net, gross: amount };
  }
  const tax = amount * rate;
  return { net: amount, tax, gross: amount + tax };
}

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function VatCalculator({ t }: { t: Dictionary["vat"] }) {
  const [amount, setAmount] = useState("2500");
  const [rate, setRate] = useState("15");
  const [inclusive, setInclusive] = useState(false);
  const id = useId();
  const result = calcVat(Number(amount) || 0, Number(rate) || 0, inclusive);

  return (
    <div className="doc-frame flex h-full flex-col gap-5 bg-paper p-6">
      <div className="text-[1.0625rem] font-bold">{t.title}</div>
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <label className="flex flex-col gap-1.5 text-[0.8125rem] text-ink-500" htmlFor={`${id}-amount`}>
          {t.amount}
          <input
            id={`${id}-amount`}
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
            className="num h-11 rounded-xl border border-paper-300 bg-paper px-3 text-[1.0625rem] text-ink focus:border-teal-500 focus:outline-none"
            dir="ltr"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[0.8125rem] text-ink-500" htmlFor={`${id}-rate`}>
          {t.rate}
          <span className="relative">
            <input
              id={`${id}-rate`}
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ""))}
              className="num h-11 w-24 rounded-xl border border-paper-300 bg-paper py-0 pl-3 pr-8 text-[1.0625rem] text-ink focus:border-teal-500 focus:outline-none"
              dir="ltr"
            />
            <span className="num pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500">%</span>
          </span>
        </label>
      </div>
      <label className="flex items-center gap-2.5 text-[0.9375rem]" htmlFor={`${id}-inc`}>
        <input
          id={`${id}-inc`}
          type="checkbox"
          checked={inclusive}
          onChange={(e) => setInclusive(e.target.checked)}
          className="h-4 w-4 accent-teal-600"
        />
        {t.inclusive}
      </label>
      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-teal-200 pt-4 text-[0.875rem]">
        <div>
          <dt className="text-ink-500">{t.net}</dt>
          <dd className="num text-[1.0625rem] font-bold">{fmt(result.net)}</dd>
        </div>
        <div>
          <dt className="text-ink-500">{t.tax}</dt>
          <dd className="num text-[1.0625rem] font-bold text-teal-700">{fmt(result.tax)}</dd>
        </div>
        <div>
          <dt className="text-ink-500">{t.gross}</dt>
          <dd className="num text-[1.0625rem] font-bold">
            {fmt(result.gross)} <span className="text-[0.75rem] font-normal text-ink-500">{t.currency}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
