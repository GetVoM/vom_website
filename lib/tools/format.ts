/**
 * Number formatting for amounts and percentages: Western digits with thousands
 * separators, as on the rest of the site (DESIGN.md, Numbers).
 *
 * Kept free of imports so `node --test` can load it directly.
 */

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 2,700 and 0.10: whole amounts without decimals, others with two. */
export function formatAmount(value: number): string {
  return Number.isInteger(value) ? whole.format(value) : cents.format(value);
}

/** A calculator result: always two decimals, so a column of results lines up (2,875.00). */
export function formatMoney(value: number): string {
  return cents.format(value);
}

/** 15% and 33.33%: at most two decimals, none when whole. */
export function formatPercent(value: number): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)}%`;
}

/** Rounds to halalas (two decimals) without the 1.005 → 1.00 float trap. */
export function roundHalala(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
