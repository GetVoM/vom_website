/**
 * The calculators against the worked examples in the old pages' own copy, plus
 * the edges. Run with `pnpm test`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
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
  nisabFor,
} from "./calc.ts";

test("VAT: the page's example, 100 + 15% = 115", () => {
  assert.deepEqual(calcVat(100, 15, false), { net: 100, tax: 15, gross: 115 });
});

test("VAT: the page's four-month table", () => {
  for (const [sales, tax, total] of [
    [100_000, 15_000, 115_000],
    [120_000, 18_000, 138_000],
    [80_000, 12_000, 92_000],
    [150_000, 22_500, 172_500],
  ]) {
    assert.deepEqual(calcVat(sales, 15, false), { net: sales, tax, gross: total });
  }
});

test("VAT: taken out of an inclusive amount, the parts add up", () => {
  assert.deepEqual(calcVat(115, 15, true), { net: 100, tax: 15, gross: 115 });
  assert.deepEqual(calcVat(2875, 15, true), { net: 2500, tax: 375, gross: 2875 });
  const odd = calcVat(99.99, 15, true);
  assert.equal(Math.round((odd.net + odd.tax) * 100), 9999);
});

test("VAT: the default rate is 15%, not the old widget's 20%", () => {
  assert.deepEqual(calcVat(2500), { net: 2500, tax: 375, gross: 2875 });
});

test("discount: the page's example, 20% off 1,000", () => {
  assert.deepEqual(calcDiscount(1000, 20), { ok: true, saving: 200, after: 800 });
});

test("discount: 0% and 100% are allowed, above 100% is refused", () => {
  assert.deepEqual(calcDiscount(1000, 0), { ok: true, saving: 0, after: 1000 });
  assert.deepEqual(calcDiscount(1000, 100), { ok: true, saving: 1000, after: 0 });
  assert.deepEqual(calcDiscount(1000, 101), { ok: false, error: "tooHigh" });
});

test("margin: a 25% markup is a 20% margin", () => {
  assert.deepEqual(calcMarkup(100, 25), { price: 125, profit: 25, marginPercent: 20 });
});

test("margin: a cost of 0 has no margin", () => {
  assert.deepEqual(calcMarkup(0, 50), { price: 0, profit: 0, marginPercent: null });
});

test("product pricing: the five costs add up, empty ones count as 0", () => {
  assert.deepEqual(calcProductPricing([40, 30, 10, null, 20], 50), { cost: 100, price: 150, profit: 50, marginPercent: 33.33 });
});

test("salary: net after the percentage entered", () => {
  assert.deepEqual(calcNetSalary(10_000, 10), { ok: true, deduction: 1000, net: 9000 });
  assert.deepEqual(calcNetSalary(10_000, 0), { ok: true, deduction: 0, net: 10_000 });
  assert.deepEqual(calcNetSalary(10_000, 120), { ok: false, error: "tooHigh" });
});

test("salary: annual to monthly", () => {
  assert.equal(annualToMonthly(120_000), 10_000);
  assert.equal(annualToMonthly(50_000), 4166.67);
});

test("personal zakat: the page's example, (100,000 + 50,000 + 20,000 − 10,000) × 2.5% = 4,000", () => {
  const result = calcPersonalZakat(
    { savings: 100_000, investments: 50_000, goldSilver: 20_000, loansGiven: null, otherAssets: null, debts: 10_000 },
    null,
  );
  assert.equal(result.assets, 170_000);
  assert.equal(result.net, 160_000);
  assert.equal(result.meetsNisab, null);
  assert.equal(result.zakat, 4000);
});

test("personal zakat: loans given count, debts come off before the nisab test", () => {
  const nisab = nisabFor(400); // 85 g × 400 = 34,000
  assert.equal(nisab, 34_000);
  const below = calcPersonalZakat({ savings: 30_000, investments: null, goldSilver: null, loansGiven: 10_000, otherAssets: null, debts: 8_000 }, 400);
  assert.equal(below.net, 32_000);
  assert.equal(below.meetsNisab, false);
  assert.equal(below.zakat, 0);
  const above = calcPersonalZakat({ savings: 30_000, investments: null, goldSilver: null, loansGiven: 10_000, otherAssets: null, debts: 4_000 }, 400);
  assert.equal(above.meetsNisab, true);
  assert.equal(above.zakat, 900);
});

test("personal zakat: debts larger than assets give no zakat, never a negative one", () => {
  const result = calcPersonalZakat({ savings: 1000, investments: null, goldSilver: null, loansGiven: null, otherAssets: null, debts: 5000 }, null);
  assert.equal(result.zakat, 0);
});

test("zakat base: cash, metal at the prices typed, investments", () => {
  const result = calcZakatBase({ cash: 100_000, goldGrams: 100, goldPrice: 400, silverGrams: 1000, silverPrice: 5, investments: 30_000 });
  assert.equal(result.goldValue, 40_000);
  assert.equal(result.silverValue, 5000);
  assert.equal(result.base, 175_000);
  assert.equal(result.zakat, 4375);
  assert.deepEqual(result.missing, []);
});

test("zakat base: a weight without its price is flagged", () => {
  const result = calcZakatBase({ cash: 1000, goldGrams: 10, goldPrice: null, silverGrams: null, silverPrice: null, investments: null });
  assert.deepEqual(result.missing, ["goldPrice"]);
  assert.equal(result.base, 1000);
});

test("company zakat: the page's example, 550,000 × 2.5% = 13,750", () => {
  assert.equal(calcCompanyZakat(550_000), 13_750);
  assert.equal(calcCompanyZakat(0), 0);
});
