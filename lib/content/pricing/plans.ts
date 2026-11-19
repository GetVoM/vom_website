/**
 * The plans' facts, in one place: prices, billing periods, Flex's rates and what
 * each plan includes, row by row. Copy lives in ar.ts and en.ts. No "server-only" here, so
 * the JSON-LD builders can read the prices too.
 *
 * Sources: the old pricing page (Advanced, Unlimited, Business and their limits,
 * confirmed current by the owner on 2026-11-10) and the owner's Flex facts of the
 * same day; yearly-only billing for the fixed plans and the rows every plan shares
 * (owner, 2026-11-19). All prices are in SAR before 15% VAT.
 */

import type { ModuleId } from "@/lib/content/features/assets";

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

/**
 * How each plan is billed (owner, 2026-11-19): Flex is the only monthly plan; the
 * fixed plans are sold yearly only, and Business sits with them under the switch.
 */
export type Period = "monthly" | "annual";
export const planPeriod: Record<PlanId, Period> = {
  flex: "monthly",
  advanced: "annual",
  unlimited: "annual",
  business: "annual",
};

/** The price for the plan's period, before VAT. Flex's is its starting price (the first user); Business is quoted by sales. */
export const planPrice: Record<PlanId, number | null> = {
  flex: 29,
  advanced: 2700,
  unlimited: 3500,
  business: null,
};

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

/** The ready reports in every plan (the features page lists them). */
export const reportCount = 17;

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
  | { kind: "rate"; value: number; per: "transaction" | "user" | "centre" | "month" | "export" };

export type RowId =
  // Sales and collection
  | "customers"
  | "salesDocs"
  | "quoteConvert"
  | "notes"
  | "recurringInvoices"
  | "customerPayments"
  | "vomPay"
  | "sharing"
  // E-invoicing
  | "zatcaPhase1"
  | "zatcaPhase2"
  | "vatCategories"
  // Purchases and expenses
  | "suppliers"
  | "purchaseDocs"
  | "purchaseOrders"
  | "purchaseReturns"
  | "supplierPayments"
  // Products and inventory
  | "products"
  | "categories"
  | "warehouses"
  | "stockMoves"
  | "costing"
  | "minQuantity"
  // Accounting and fixed assets
  | "chart"
  | "entries"
  | "recurringEntries"
  | "costCentres"
  | "bankMatching"
  | "yearClose"
  | "assets"
  // Human resources
  | "employees"
  | "payroll"
  | "positions"
  // Document templates
  | "templates"
  | "printLanguage"
  | "optionalDetails"
  | "quoteDesign"
  | "voucherDesign"
  | "numbering"
  // Reports
  | "reports"
  | "inventoryReports"
  | "exports"
  // Dashboard
  | "dashboard"
  | "vomAi"
  | "weeklyEmail"
  // Users and permissions
  | "users"
  | "roles"
  | "scopedUsers"
  | "activityLog"
  // Integrations
  | "apps"
  | "api"
  // Customer support
  | "care"
  | "support"
  // General
  | "bilingual"
  | "attachments"
  | "customFields"
  | "iosApp";

/** The ledger's groups are the features page's sections, under the same titles and in the same order. */
export type GroupId = ModuleId;

/**
 * Every capability in one ledger, one row each (owner, 2026-11-19), drawn from the
 * features page: what every plan shares and the rows where the plans differ. The
 * old page's nine counted documents share their values plan by plan, so they sit
 * in three rows by kind, with cost centres apart (Flex charges them monthly).
 */
export const compareGroups: { id: GroupId; rows: RowId[] }[] = [
  {
    id: "sales",
    rows: ["customers", "salesDocs", "quoteConvert", "notes", "recurringInvoices", "customerPayments", "vomPay", "sharing"],
  },
  { id: "zatca", rows: ["zatcaPhase1", "zatcaPhase2", "vatCategories"] },
  { id: "purchases", rows: ["suppliers", "purchaseDocs", "purchaseOrders", "purchaseReturns", "supplierPayments"] },
  { id: "inventory", rows: ["products", "categories", "warehouses", "stockMoves", "costing", "minQuantity"] },
  {
    id: "accounting",
    rows: ["chart", "entries", "recurringEntries", "costCentres", "bankMatching", "yearClose", "assets"],
  },
  { id: "hr", rows: ["employees", "payroll", "positions"] },
  {
    id: "templates",
    rows: ["templates", "printLanguage", "optionalDetails", "quoteDesign", "voucherDesign", "numbering"],
  },
  { id: "reports", rows: ["reports", "inventoryReports", "exports"] },
  { id: "dashboard", rows: ["dashboard", "vomAi", "weeklyEmail"] },
  { id: "permissions", rows: ["users", "roles", "scopedUsers", "activityLog"] },
  { id: "apps", rows: ["apps", "api"] },
  { id: "support", rows: ["care", "support"] },
  { id: "general", rows: ["bilingual", "attachments", "customFields", "iosApp"] },
];

/** A row whose label links to its full list on the features page. */
export const rowLinks: Partial<Record<RowId, ModuleId>> = { reports: "reports" };

const yes: Cell = { kind: "yes" };
const no: Cell = { kind: "no" };
const unlimited: Cell = { kind: "unlimited" };

/** In all four plans alike. */
const everyPlan: Record<PlanId, Cell> = { flex: yes, advanced: yes, unlimited: yes, business: yes };
/** No limit in any plan. */
const noLimit: Record<PlanId, Cell> = { flex: unlimited, advanced: unlimited, unlimited, business: unlimited };

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
  customers: noLimit,
  salesDocs: salesRow,
  quoteConvert: everyPlan,
  notes: everyPlan,
  recurringInvoices: everyPlan,
  customerPayments: everyPlan,
  vomPay: everyPlan,
  sharing: everyPlan,

  zatcaPhase1: everyPlan,
  // Flex pays for its ZATCA module monthly.
  zatcaPhase2: { ...everyPlan, flex: { kind: "rate", value: flexRates.zatca, per: "month" } },
  vatCategories: everyPlan,

  suppliers: noLimit,
  purchaseDocs: documentRow,
  purchaseOrders: everyPlan,
  purchaseReturns: everyPlan,
  supplierPayments: everyPlan,

  products: everyPlan,
  categories: everyPlan,
  warehouses: everyPlan,
  stockMoves: everyPlan,
  costing: everyPlan,
  minQuantity: everyPlan,

  chart: everyPlan,
  entries: documentRow,
  recurringEntries: everyPlan,
  costCentres: {
    flex: { kind: "rate", value: flexRates.costCentre, per: "centre" },
    advanced: { kind: "count", value: 50 },
    unlimited,
    business: unlimited,
  },
  bankMatching: everyPlan,
  yearClose: everyPlan,
  assets: { flex: { kind: "rate", value: flexRates.assets, per: "month" }, advanced: no, unlimited: yes, business: yes },

  employees: everyPlan,
  payroll: everyPlan,
  positions: everyPlan,

  templates: {
    flex: { kind: "count", value: 11 },
    advanced: { kind: "count", value: 1 },
    unlimited: { kind: "count", value: 11 },
    business: { kind: "count", value: 11 },
  },
  printLanguage: everyPlan,
  optionalDetails: everyPlan,
  quoteDesign: everyPlan,
  voucherDesign: everyPlan,
  numbering: everyPlan,

  reports: everyPlan,
  inventoryReports: everyPlan,
  // Flex pays for each export of a report.
  exports: { ...everyPlan, flex: { kind: "rate", value: flexRates.export, per: "export" } },

  dashboard: everyPlan,
  vomAi: everyPlan,
  weeklyEmail: everyPlan,

  users: {
    flex: { kind: "rate", value: flexRates.extraUser, per: "user" },
    advanced: { kind: "count", value: 5 },
    unlimited,
    business: unlimited,
  },
  roles: everyPlan,
  scopedUsers: everyPlan,
  activityLog: everyPlan,

  apps: {
    flex: { kind: "rate", value: flexRates.integrations, per: "month" },
    advanced: no,
    unlimited: yes,
    business: yes,
  },
  api: { flex: no, advanced: no, unlimited: no, business: yes },

  care: everyPlan,
  // In Unlimited (owner, 2026-11-19), so in Flex, which has every Unlimited feature.
  support: { flex: yes, advanced: no, unlimited: yes, business: yes },

  bilingual: everyPlan,
  attachments: everyPlan,
  customFields: everyPlan,
  iosApp: everyPlan,
};

/** Western digits with thousands separators, as on the rest of the site: 2,700 and 0.10. Shared with the calculators. */
export { formatAmount } from "@/lib/tools/format";
