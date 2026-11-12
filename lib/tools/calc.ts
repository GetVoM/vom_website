/**
 * The calculators' arithmetic, as pure functions. Each keeps the old WordPress
 * widget's fields (owner, 2026-11-12) and fixes what made it wrong; the old
 * behaviour against the new is in docs/content/tools/calculator-rules.md.
 * Results are rounded to halalas at the output only.
 *
 * Kept free of path aliases so `node --test` can load it directly.
 */
import { roundHalala as r } from "./format.ts";
import { rates } from "./rates.ts";

/** A field's parsed value: null when it is empty. */
type Value = number | null;
const n = (value: Value) => value ?? 0;

// ---------------------------------------------------------------- VAT

export interface VatResult {
  /** The amount before VAT. */
  net: number;
  tax: number;
  /** The amount with VAT. */
  gross: number;
}

/**
 * VAT added to an amount, or taken out of one that already includes it. The
 * parts always add up: the tax is the difference between the two rounded totals.
 */
export function calcVat(amount: number, ratePercent: number = rates.vatPercent, inclusive = false): VatResult {
  const rate = ratePercent / 100;
  if (inclusive) {
    const net = r(amount / (1 + rate));
    return { net, tax: r(amount - net), gross: r(amount) };
  }
  const tax = r(amount * rate);
  return { net: r(amount), tax, gross: r(amount + tax) };
}

// ---------------------------------------------------------------- discount

export type DiscountResult = { ok: true; saving: number; after: number } | { ok: false; error: "tooHigh" };

/** A percentage off a price. A discount above 100% is refused. */
export function calcDiscount(amount: number, percent: number): DiscountResult {
  if (percent > 100) return { ok: false, error: "tooHigh" };
  const saving = r((amount * percent) / 100);
  return { ok: true, saving, after: r(amount - saving) };
}

// ---------------------------------------------------------------- margin

export interface MarkupResult {
  price: number;
  profit: number;
  /** Profit as a share of the selling price; null when the price is 0. */
  marginPercent: number | null;
}

/** A cost marked up by a percentage: the selling price, the profit and the gross margin. */
export function calcMarkup(cost: number, markupPercent: number): MarkupResult {
  const price = r(cost * (1 + markupPercent / 100));
  const profit = r(price - cost);
  return { price, profit, marginPercent: price > 0 ? r((profit / price) * 100) : null };
}

/** The product-pricing calculator: its five cost lines added up, then marked up. */
export function calcProductPricing(costs: Value[], markupPercent: number): MarkupResult & { cost: number } {
  const cost = r(costs.reduce<number>((sum, value) => sum + n(value), 0));
  return { cost, ...calcMarkup(cost, markupPercent) };
}

// ---------------------------------------------------------------- salary

export type NetSalaryResult = { ok: true; deduction: number; net: number } | { ok: false; error: "tooHigh" };

/** The old widget's net salary: the monthly salary less the percentage the visitor enters. */
export function calcNetSalary(salary: number, deductionPercent: number): NetSalaryResult {
  if (deductionPercent > 100) return { ok: false, error: "tooHigh" };
  const deduction = r((salary * deductionPercent) / 100);
  return { ok: true, deduction, net: r(salary - deduction) };
}

/** A yearly salary spread over twelve months. */
export function annualToMonthly(annual: number): number {
  return r(annual / 12);
}

// ---------------------------------------------------------------- zakat

const zakatOn = (amount: number) => r((Math.max(0, amount) * rates.zakatPercent) / 100);

/** Nisab in riyals for a gold price per gram, or null without one. */
export function nisabFor(goldPricePerGram: Value): number | null {
  return goldPricePerGram && goldPricePerGram > 0 ? r(goldPricePerGram * rates.nisabGoldGrams) : null;
}

export interface PersonalZakatInput {
  savings: Value;
  investments: Value;
  /** The value of gold and silver held, in riyals. */
  goldSilver: Value;
  loansGiven: Value;
  otherAssets: Value;
  debts: Value;
}

export interface PersonalZakatResult {
  /** Everything owned and owed to you. */
  assets: number;
  /** Assets less debts: the amount zakat is due on. */
  net: number;
  nisab: number | null;
  /** Whether the net amount reaches the nisab; null when no gold price was given. */
  meetsNisab: boolean | null;
  zakat: number;
}

/**
 * Personal zakat. Debts come off before the nisab test (the old widget tested
 * first and then subtracted, so zakat could go negative), and loans given count
 * as wealth (the old widget read the field and dropped it).
 */
export function calcPersonalZakat(input: PersonalZakatInput, goldPricePerGram: Value): PersonalZakatResult {
  const assets = r(n(input.savings) + n(input.investments) + n(input.goldSilver) + n(input.loansGiven) + n(input.otherAssets));
  const net = r(assets - n(input.debts));
  const nisab = nisabFor(goldPricePerGram);
  const meetsNisab = nisab === null ? null : net >= nisab;
  return { assets, net, nisab, meetsNisab, zakat: meetsNisab === false ? 0 : zakatOn(net) };
}

export interface ZakatBaseInput {
  cash: Value;
  goldGrams: Value;
  goldPrice: Value;
  silverGrams: Value;
  silverPrice: Value;
  investments: Value;
}

export interface ZakatBaseResult {
  goldValue: number;
  silverValue: number;
  /** The zakat base: cash, metal at today's prices, investments. */
  base: number;
  zakat: number;
  /** Prices still needed to value the metal the visitor entered. */
  missing: ("goldPrice" | "silverPrice")[];
}

/** The zakat base from the old widget's four fields, the two weights valued at the prices the visitor types. */
export function calcZakatBase(input: ZakatBaseInput): ZakatBaseResult {
  const missing: ZakatBaseResult["missing"] = [];
  if (n(input.goldGrams) > 0 && !input.goldPrice) missing.push("goldPrice");
  if (n(input.silverGrams) > 0 && !input.silverPrice) missing.push("silverPrice");
  const goldValue = r(n(input.goldGrams) * n(input.goldPrice));
  const silverValue = r(n(input.silverGrams) * n(input.silverPrice));
  const base = r(n(input.cash) + goldValue + silverValue + n(input.investments));
  return { goldValue, silverValue, base, zakat: zakatOn(base), missing };
}

/** The company zakat widget: 2.5% of the amount entered. */
export function calcCompanyZakat(amount: number): number {
  return zakatOn(amount);
}
