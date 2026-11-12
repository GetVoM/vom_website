"use client";

import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import type { CalculatorId } from "@/lib/content/tools/catalogue";
import {
  annualToMonthly,
  calcCompanyZakat,
  calcDiscount,
  calcMarkup,
  calcNetSalary,
  calcPersonalZakat,
  calcProductPricing,
  calcVat,
  calcZakatBase,
} from "@/lib/tools/calc";
import { common, discountCopy, marginCopy, pricingCopy, salaryCopy, vatCopy, zakatBaseCopy, zakatCompanyCopy, zakatCopy } from "@/lib/tools/copy";
import { formatAmount, formatMoney, formatPercent } from "@/lib/tools/format";
import { rates } from "@/lib/tools/rates";
import { Answer, LiveSummary, Money, NumberField, Percent, Sheet, spokenMoney, useNumber, type NumberState } from "./fields";

/**
 * The seven pages' nine calculators. Each keeps its old WordPress widget's
 * fields and labels (owner, 2026-11-12) and draws as the poster band: the sheet
 * of fields beside the answer in large white figures. The arithmetic is in
 * lib/tools/calc.ts; the words in lib/tools/copy.ts.
 */

type CalcProps = { head?: ReactNode };

const v = (field: NumberState) => field.value ?? 0;
const allEmpty = (...fields: NumberState[]) => fields.every((field) => field.value === null);

// ---------------------------------------------------------------- VAT

interface VatEntry {
  net: number;
  tax: number;
  gross: number;
  rate: number;
  at: string;
}

const HISTORY_KEY = "vom.tools.vat.history";
const NO_HISTORY: VatEntry[] = [];
let historyCache: { raw: string | null; entries: VatEntry[] } = { raw: null, entries: NO_HISTORY };

/** The last five saved results, kept in this browser only (a convenience; it may be empty or unavailable). */
const vatHistory = {
  read(): VatEntry[] {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(HISTORY_KEY);
    } catch {
      return NO_HISTORY;
    }
    if (raw !== historyCache.raw) {
      let entries = NO_HISTORY;
      try {
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) entries = parsed.slice(0, 5);
      } catch {
        /* a broken entry clears the list */
      }
      historyCache = { raw, entries };
    }
    return historyCache.entries;
  },
  save(entry: VatEntry) {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...vatHistory.read()].slice(0, 5)));
      window.dispatchEvent(new Event(HISTORY_KEY));
      return true;
    } catch {
      return false;
    }
  },
  subscribe(callback: () => void) {
    window.addEventListener(HISTORY_KEY, callback);
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener(HISTORY_KEY, callback);
      window.removeEventListener("storage", callback);
    };
  },
};

const historyDate = new Intl.DateTimeFormat("ar", { numberingSystem: "latn", calendar: "gregory", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" });

/** The old widget's defaults: 2,500 riyals, not VAT-inclusive; the rate is now 15% (it was 20%). */
const VAT_DEFAULTS = { amount: "2,500", rate: String(rates.vatPercent) };

export function VatCalculator({ head }: CalcProps) {
  const amount = useNumber(VAT_DEFAULTS.amount);
  const rate = useNumber(VAT_DEFAULTS.rate);
  const [inclusive, setInclusive] = useState(false);
  const [status, setStatus] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const history = useSyncExternalStore(vatHistory.subscribe, vatHistory.read, () => NO_HISTORY);

  const result = calcVat(v(amount), v(rate), inclusive);
  const ratePct = v(rate);
  const lines = [
    `${vatCopy.net}: ${spokenMoney(result.net)}`,
    `${vatCopy.tax}: ${spokenMoney(result.tax)}`,
    `${vatCopy.ratePart}: ${formatPercent(ratePct)}`,
    `${vatCopy.gross}: ${spokenMoney(result.gross)}`,
  ];

  const reset = () => {
    amount.reset(VAT_DEFAULTS.amount);
    rate.reset(VAT_DEFAULTS.rate);
    setInclusive(false);
    setStatus("");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setStatus(vatCopy.copied);
    } catch {
      setStatus(vatCopy.copyFailed);
    }
  };
  const save = () => {
    const ok = vatHistory.save({ ...result, rate: ratePct, at: new Date().toISOString() });
    setStatus(ok ? vatCopy.saved : vatCopy.copyFailed);
  };

  const slider = (field: NumberState, min: number, max: number, step: number, label: string) => (
    <input
      type="range"
      className="tol-range"
      min={min}
      max={max}
      step={step}
      value={Math.min(max, Math.max(min, v(field)))}
      onChange={(event) => field.reset(formatAmount(Number(event.target.value)))}
      aria-label={label}
      dir="ltr"
      style={{ "--fill": `${((Math.min(max, Math.max(min, v(field))) - min) / (max - min)) * 100}%` } as CSSProperties}
    />
  );

  return (
    <>
      <Sheet
        head={head}
        answerRef={answerRef}
        footer={
          <div className="tol-actions">
            <button type="button" className="tol-action" onClick={reset}>
              {vatCopy.reset}
            </button>
            <button type="button" className="tol-action" onClick={copy}>
              {vatCopy.copy}
            </button>
            <button type="button" className="tol-action" onClick={save}>
              {vatCopy.save}
            </button>
            <p className="tol-status" role="status">
              {status}
            </p>
          </div>
        }
      >
        <div className="tol-field-group" data-wide>
          <NumberField label={vatCopy.amount} field={amount} unit="sar" wide />
          {slider(amount, 100, 10_000, 100, vatCopy.amount)}
        </div>
        <div className="tol-field-group" data-wide>
          <NumberField label={vatCopy.rate} field={rate} unit="percent" wide />
          {slider(rate, 1, 45, 0.1, vatCopy.rate)}
        </div>
        <fieldset className="tol-choice" data-wide>
          <legend>{vatCopy.inclusive}</legend>
          <div>
            <label>
              <input type="radio" name={`${id}-inc`} checked={inclusive} onChange={() => setInclusive(true)} />
              <span>{vatCopy.yes}</span>
            </label>
            <label>
              <input type="radio" name={`${id}-inc`} checked={!inclusive} onChange={() => setInclusive(false)} />
              <span>{vatCopy.no}</span>
            </label>
          </div>
        </fieldset>
      </Sheet>
      <Answer
        answerRef={answerRef}
        label={inclusive ? vatCopy.net : vatCopy.gross}
        figure={<Money value={inclusive ? result.net : result.gross} />}
        figureText={formatMoney(inclusive ? result.net : result.gross)}
        muted={amount.value === null}
        parts={[
          ...(inclusive ? [] : [{ label: vatCopy.net, value: <Money value={result.net} /> }]),
          { label: vatCopy.tax, value: <Money value={result.tax} /> },
          { label: vatCopy.ratePart, value: <Percent value={ratePct} /> },
          ...(inclusive ? [{ label: vatCopy.gross, value: <Money value={result.gross} /> }] : []),
        ]}
      >
        {history.length > 0 && (
          <div className="tol-history">
            <h3>{vatCopy.history}</h3>
            <ol>
              {history.map((entry) => (
                <li key={entry.at}>
                  <span className="num" dir="ltr">
                    {formatMoney(entry.net)} + {formatMoney(entry.tax)} = {formatMoney(entry.gross)}
                  </span>
                  <span>
                    {formatPercent(entry.rate)} · {historyDate.format(new Date(entry.at))}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
        <LiveSummary text={lines.join("، ")} />
      </Answer>
    </>
  );
}

// ---------------------------------------------------------------- discount

export function DiscountCalculator({ head }: CalcProps) {
  const amount = useNumber();
  const percent = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const result = calcDiscount(v(amount), v(percent));
  const after = result.ok ? result.after : v(amount);
  const saving = result.ok ? result.saving : 0;
  return (
    <>
      <Sheet head={head} title={discountCopy.title} button={discountCopy.button} answerRef={answerRef}>
        <NumberField label={discountCopy.amount} field={amount} unit="sar" />
        <NumberField label={discountCopy.percent} field={percent} unit="percent" />
      </Sheet>
      <Answer
        answerRef={answerRef}
        label={discountCopy.after}
        figure={<Money value={after} />}
        figureText={formatMoney(after)}
        muted={allEmpty(amount, percent)}
        parts={[{ label: discountCopy.saving, value: <Money value={saving} /> }]}
        note={result.ok ? undefined : discountCopy.tooHigh}
      >
        <LiveSummary text={result.ok ? `${discountCopy.after}: ${spokenMoney(after)}، ${discountCopy.saving}: ${spokenMoney(saving)}` : discountCopy.tooHigh} />
      </Answer>
    </>
  );
}

// ---------------------------------------------------------------- margin

export function MarginCalculator({ head }: CalcProps) {
  const cost = useNumber();
  const markup = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const result = calcMarkup(v(cost), v(markup));
  return (
    <>
      <Sheet head={head} button={marginCopy.button} answerRef={answerRef}>
        <NumberField label={marginCopy.cost} field={cost} unit="sar" placeholder={marginCopy.costPlaceholder} />
        <NumberField label={marginCopy.markup} field={markup} unit="percent" placeholder={marginCopy.markup} />
      </Sheet>
      <Answer
        answerRef={answerRef}
        caption={marginCopy.results}
        label={marginCopy.price}
        figure={<Money value={result.price} />}
        figureText={formatMoney(result.price)}
        muted={allEmpty(cost, markup)}
        parts={[
          { label: marginCopy.profit, value: <Money value={result.profit} /> },
          { label: marginCopy.margin, value: <Percent value={result.marginPercent ?? 0} /> },
        ]}
      >
        <LiveSummary text={`${marginCopy.price}: ${spokenMoney(result.price)}، ${marginCopy.profit}: ${spokenMoney(result.profit)}، ${marginCopy.margin}: ${formatPercent(result.marginPercent ?? 0)}`} />
      </Answer>
    </>
  );
}

export function PricingCalculator({ head }: CalcProps) {
  const fields = [useNumber(), useNumber(), useNumber(), useNumber(), useNumber()];
  const markup = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const result = calcProductPricing(
    fields.map((field) => field.value),
    v(markup),
  );
  return (
    <>
      <Sheet head={head} title={pricingCopy.title} intro={pricingCopy.intro} button={pricingCopy.button} answerRef={answerRef}>
        {pricingCopy.costs.map((item, i) => (
          <NumberField key={item.id} label={item.label} hint={item.hint} field={fields[i]} unit="sar" />
        ))}
        <NumberField label={pricingCopy.markup} hint={pricingCopy.markupHint} field={markup} unit="percent" />
      </Sheet>
      <Answer
        answerRef={answerRef}
        caption={marginCopy.results}
        label={marginCopy.price}
        figure={<Money value={result.price} />}
        figureText={formatMoney(result.price)}
        muted={allEmpty(...fields, markup)}
        parts={[
          { label: pricingCopy.cost, value: <Money value={result.cost} /> },
          { label: marginCopy.profit, value: <Money value={result.profit} /> },
          { label: marginCopy.margin, value: <Percent value={result.marginPercent ?? 0} /> },
        ]}
      >
        <LiveSummary text={`${marginCopy.price}: ${spokenMoney(result.price)}، ${marginCopy.profit}: ${spokenMoney(result.profit)}، ${marginCopy.margin}: ${formatPercent(result.marginPercent ?? 0)}`} />
      </Answer>
    </>
  );
}

// ---------------------------------------------------------------- salary

export function SalaryNetCalculator({ head }: CalcProps) {
  const c = salaryCopy.net;
  const salary = useNumber();
  const tax = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const result = calcNetSalary(v(salary), v(tax));
  const net = result.ok ? result.net : v(salary);
  const deduction = result.ok ? result.deduction : 0;
  return (
    <>
      <Sheet head={head} button={c.button} answerRef={answerRef}>
        <NumberField label={c.salary} field={salary} unit="sar" placeholder={c.salaryPlaceholder} />
        <NumberField label={c.tax} field={tax} unit="percent" placeholder={c.taxPlaceholder} />
      </Sheet>
      <Answer
        answerRef={answerRef}
        label={c.result}
        figure={<Money value={net} />}
        figureText={formatMoney(net)}
        muted={allEmpty(salary, tax)}
        parts={[{ label: c.deduction, value: <Money value={deduction} /> }]}
        note={result.ok ? undefined : c.tooHigh}
      >
        <LiveSummary text={result.ok ? `${c.result}: ${spokenMoney(net)}، ${c.deduction}: ${spokenMoney(deduction)}` : c.tooHigh} />
      </Answer>
    </>
  );
}

export function SalaryAnnualCalculator({ head }: CalcProps) {
  const c = salaryCopy.annual;
  const annual = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const monthly = annualToMonthly(v(annual));
  return (
    <>
      <Sheet head={head} button={c.button} answerRef={answerRef}>
        <NumberField label={c.salary} field={annual} unit="sar" placeholder={c.salaryPlaceholder} wide />
      </Sheet>
      <Answer answerRef={answerRef} label={c.result} figure={<Money value={monthly} />} figureText={formatMoney(monthly)} muted={annual.value === null}>
        <LiveSummary text={`${c.result}: ${spokenMoney(monthly)}`} />
      </Answer>
    </>
  );
}

// ---------------------------------------------------------------- zakat

export function ZakatCalculator({ head }: CalcProps) {
  const fields = [useNumber(), useNumber(), useNumber(), useNumber(), useNumber(), useNumber()];
  const goldPrice = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const [savings, investments, goldSilver, loansGiven, otherAssets, debts] = fields.map((field) => field.value);
  const result = calcPersonalZakat({ savings, investments, goldSilver, loansGiven, otherAssets, debts }, goldPrice.value);
  const label = result.meetsNisab === false ? zakatCopy.below : zakatCopy.owed;
  const note = result.nisab === null ? zakatCopy.needPrice : undefined;
  return (
    <>
      <Sheet head={head} title={zakatCopy.title} button={zakatCopy.button} answerRef={answerRef}>
        {zakatCopy.fields.map((item, i) => (
          <NumberField key={item.id} label={item.label} field={fields[i]} unit="sar" />
        ))}
        <div className="tol-field-rule" data-wide aria-hidden="true" />
        <NumberField label={zakatCopy.goldPrice} hint={zakatCopy.goldPriceHint} field={goldPrice} unit="sar" wide />
      </Sheet>
      <Answer
        answerRef={answerRef}
        label={label}
        figure={<Money value={result.zakat} />}
        figureText={formatMoney(result.zakat)}
        muted={allEmpty(...fields)}
        parts={[
          { label: zakatCopy.net, value: <Money value={result.net} /> },
          { label: zakatCopy.nisab, value: result.nisab === null ? "—" : <Money value={result.nisab} /> },
        ]}
        note={note}
      >
        <LiveSummary text={`${label}${result.meetsNisab === false ? "" : `: ${spokenMoney(result.zakat)}`}`} />
      </Answer>
    </>
  );
}

export function ZakatBaseCalculator({ head }: CalcProps) {
  const c = zakatBaseCopy;
  const cash = useNumber();
  const gold = useNumber();
  const goldPrice = useNumber();
  const silver = useNumber();
  const silverPrice = useNumber();
  const investments = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const result = calcZakatBase({
    cash: cash.value,
    goldGrams: gold.value,
    goldPrice: goldPrice.value,
    silverGrams: silver.value,
    silverPrice: silverPrice.value,
    investments: investments.value,
  });
  const note = [result.missing.includes("goldPrice") && c.needGoldPrice, result.missing.includes("silverPrice") && c.needSilverPrice].filter(Boolean).join(" ") || undefined;
  return (
    <>
      <Sheet head={head} button={c.button} answerRef={answerRef}>
        <NumberField label={c.cash} field={cash} unit="sar" placeholder={c.cashPlaceholder} wide />
        <NumberField label={c.gold} field={gold} unit="gram" placeholder={c.goldPlaceholder} />
        <NumberField label={c.goldPrice} field={goldPrice} unit="sar" />
        <NumberField label={c.silver} field={silver} unit="gram" placeholder={c.silverPlaceholder} />
        <NumberField label={c.silverPrice} field={silverPrice} unit="sar" />
        <NumberField label={c.investments} field={investments} unit="sar" placeholder={c.investmentsPlaceholder} wide />
      </Sheet>
      <Answer
        answerRef={answerRef}
        label={c.zakat}
        figure={<Money value={result.zakat} />}
        figureText={formatMoney(result.zakat)}
        muted={allEmpty(cash, gold, silver, investments)}
        parts={[
          { label: c.base, value: <Money value={result.base} /> },
          { label: c.goldValue, value: <Money value={result.goldValue} /> },
          { label: c.silverValue, value: <Money value={result.silverValue} /> },
        ]}
        note={note}
      >
        <LiveSummary text={`${c.zakat}: ${spokenMoney(result.zakat)}، ${c.base}: ${spokenMoney(result.base)}`} />
      </Answer>
    </>
  );
}

export function ZakatCompanyCalculator({ head }: CalcProps) {
  const c = zakatCompanyCopy;
  const amount = useNumber();
  const answerRef = useRef<HTMLDivElement>(null);
  const zakat = calcCompanyZakat(v(amount));
  return (
    <>
      <Sheet head={head} title={c.title} titleLevel={3} button={c.button} answerRef={answerRef}>
        <NumberField label={c.amount} field={amount} unit="sar" placeholder={c.placeholder} wide />
      </Sheet>
      <Answer answerRef={answerRef} label={c.result} figure={<Money value={zakat} />} figureText={formatMoney(zakat)} muted={amount.value === null}>
        <LiveSummary text={`${c.result}: ${spokenMoney(zakat)}`} />
      </Answer>
    </>
  );
}

// ---------------------------------------------------------------- band

const registry: Record<CalculatorId, (props: CalcProps) => ReactNode> = {
  vat: VatCalculator,
  discount: DiscountCalculator,
  margin: MarginCalculator,
  pricing: PricingCalculator,
  "salary-net": SalaryNetCalculator,
  "salary-annual": SalaryAnnualCalculator,
  zakat: ZakatCalculator,
  "zakat-base": ZakatBaseCalculator,
  "zakat-company": ZakatCompanyCalculator,
};

/** The switch's label for a calculator that shares a band. */
const tabLabels: Partial<Record<CalculatorId, string>> = { margin: marginCopy.tab, pricing: pricingCopy.tab };

/**
 * The band's contents: one calculator, or two that the old page showed side by
 * side, behind a two-way switch at the top of the sheet. Each keeps its own
 * entries when the visitor switches away and back.
 */
export function CalcBand({ ids }: { ids: CalculatorId[] }) {
  const [active, setActive] = useState(ids[0]);
  const name = useId();
  const head =
    ids.length > 1 ? (
      <fieldset className="tol-switch">
        <legend className="sr-only">{common.switchLegend}</legend>
        {ids.map((id) => (
          <label key={id}>
            <input type="radio" name={name} checked={active === id} onChange={() => setActive(id)} />
            <span>{tabLabels[id] ?? id}</span>
          </label>
        ))}
      </fieldset>
    ) : undefined;
  return (
    <>
      {ids.map((id) => {
        const Calc = registry[id];
        return (
          <div key={id} className="tol-band-grid" hidden={active !== id}>
            <Calc head={head} />
          </div>
        );
      })}
    </>
  );
}
