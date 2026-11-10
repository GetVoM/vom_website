/**
 * The plans' facts, in one place: prices, Flex's rates and what each plan includes
 * where the plans differ. Copy lives in ar.ts and en.ts. No "server-only" here, so
 * the JSON-LD builders can read the prices too.
 *
 * Sources: the old pricing page (Advanced, Unlimited, Business and their limits,
 * confirmed current by the owner on 2026-11-10) and the owner's Flex facts of the
 * same day. All prices are in SAR before 15% VAT.
 */

export type PlanId = "flex" | "advanced" | "unlimited" | "business";

/** Order on the page, cheapest first. */
export const planIds: PlanId[] = ["flex", "advanced", "unlimited", "business"];

/** Carries the "most popular" seal and the page's one orange Register. */
export const popularPlan: PlanId = "unlimited";

export const planNames: Record<PlanId, { ar: string; en: string }> = {
  flex: { ar: "الباقة المرنة", en: "Flex" },
  advanced: { ar: "الباقة المتقدمة", en: "Advanced" },
  unlimited: { ar: "الباقة اللامحدودة", en: "Unlimited" },
  business: { ar: "باقة الأعمال", en: "Business" },
};

/** The names in the comparison ledger's narrow column heads. */
export const planShortNames: Record<PlanId, { ar: string; en: string }> = {
  flex: { ar: "المرنة", en: "Flex" },
  advanced: { ar: "المتقدمة", en: "Advanced" },
  unlimited: { ar: "اللامحدودة", en: "Unlimited" },
  business: { ar: "الأعمال", en: "Business" },
};

/** Monthly price. Flex's is its starting price (the first user); Business is quoted by sales. */
export const monthlyPrice: Record<PlanId, number | null> = {
  flex: 29,
  advanced: 270,
  unlimited: 350,
  business: null,
};

/** Annual billing gives two months free, so a year costs ten months. */
export const annualMonths = 10;

/** The fixed plans the billing switch applies to. */
export const switchPlans: PlanId[] = ["advanced", "unlimited"];

export function annualPrice(id: PlanId): number | null {
  const monthly = monthlyPrice[id];
  return switchPlans.includes(id) && monthly !== null ? monthly * annualMonths : null;
}

/** What a year would cost at the monthly price, less the annual price. */
export function annualSaving(id: PlanId): number | null {
  const monthly = monthlyPrice[id];
  const annual = annualPrice(id);
  return monthly !== null && annual !== null ? monthly * 12 - annual : null;
}

/**
 * Flex, pay as you go (owner, 2026-11-10). Sales invoices are priced on their own
 * and the page does not state that price (owner): never present them as 0.10.
 */
export const flexRates = {
  /** Per month, for the first user. */
  firstUser: 29,
  /** Per month, for each user after the first. */
  extraUser: 35,
  /** Per transaction, such as a purchase bill or a journal entry. */
  transaction: 0.1,
  /** Per export of a report to PDF or Excel. */
  export: 0.25,
  /** Per month, for the ZATCA (e-invoicing) integration. */
  zatca: 10,
  /** Per month, for each cost centre. */
  costCentre: 10,
  /** Per month, for the assets module. */
  assets: 7,
  /** Per month, for integrations. */
  integrations: 20,
  /** Usage is charged automatically once it reaches this amount. */
  autoCharge: 250,
} as const;

export const vatPercent = 15;

/** The old page's fourteen reports, in every plan. */
export const reportCount = 14;

/**
 * One cell of the comparison ledger. `rate` is Flex's price per unit, where the
 * fixed plans set a count or no limit; `each` marks a count that applies to each
 * kind of document in the row.
 */
export type Cell =
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "count"; value: number; each?: boolean }
  | { kind: "unlimited" }
  | { kind: "usage" }
  | { kind: "rate"; value: number; per: "transaction" | "user" | "centre" | "month" };

export type RowId =
  | "salesDocs"
  | "purchaseDocs"
  | "entries"
  | "costCentres"
  | "users"
  | "templates"
  | "assets"
  | "apps"
  | "api"
  | "support";

export type GroupId = "documents" | "team" | "extras" | "business";

/**
 * Only the rows where the plans differ; what every plan shares is listed apart.
 * The old page's nine counted documents share their values plan by plan, so they
 * sit in three rows by kind, with cost centres apart (Flex charges them monthly).
 */
export const compareGroups: { id: GroupId; rows: RowId[] }[] = [
  { id: "documents", rows: ["salesDocs", "purchaseDocs", "entries", "costCentres"] },
  { id: "team", rows: ["users", "templates"] },
  { id: "extras", rows: ["assets", "apps"] },
  { id: "business", rows: ["api", "support"] },
];

const yes: Cell = { kind: "yes" };
const no: Cell = { kind: "no" };
const unlimited: Cell = { kind: "unlimited" };

/** Issued documents: Flex pays per transaction, Advanced has 50 of each kind, the rest no limit. */
const documentRow: Record<PlanId, Cell> = {
  flex: { kind: "rate", value: flexRates.transaction, per: "transaction" },
  advanced: { kind: "count", value: 50, each: true },
  unlimited,
  business: unlimited,
};

/** Sales invoices cost Flex more than other transactions; the ledger says "per use" only. */
const salesRow: Record<PlanId, Cell> = { ...documentRow, flex: { kind: "usage" } };

export const cells: Record<RowId, Record<PlanId, Cell>> = {
  salesDocs: salesRow,
  purchaseDocs: documentRow,
  entries: documentRow,
  costCentres: {
    flex: { kind: "rate", value: flexRates.costCentre, per: "centre" },
    advanced: { kind: "count", value: 50 },
    unlimited,
    business: unlimited,
  },
  users: {
    flex: { kind: "rate", value: flexRates.extraUser, per: "user" },
    advanced: { kind: "count", value: 5 },
    unlimited,
    business: unlimited,
  },
  templates: {
    flex: { kind: "count", value: 10 },
    advanced: { kind: "count", value: 1 },
    unlimited: { kind: "count", value: 10 },
    business: { kind: "count", value: 10 },
  },
  assets: { flex: { kind: "rate", value: flexRates.assets, per: "month" }, advanced: no, unlimited: yes, business: yes },
  apps: {
    flex: { kind: "rate", value: flexRates.integrations, per: "month" },
    advanced: no,
    unlimited: yes,
    business: yes,
  },
  api: { flex: no, advanced: no, unlimited: no, business: yes },
  support: { flex: no, advanced: no, unlimited: no, business: yes },
};

/** Western digits with thousands separators, as on the rest of the site: 2,700 and 0.10. */
export function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
