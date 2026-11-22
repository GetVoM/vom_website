import { integrations, type Raster } from "@/lib/integrations";
import { integrationPaths, type PagePair } from "@/lib/i18n/routes";

/**
 * The features page's images. The screens were captured from the app on 2026-11-16
 * (the VoM team's own test company, 975 by 800 px, once per language) and live in
 * public/features/{ar,en}/. The printed invoice and the three cut-out photos are
 * the old WordPress page's (scripts/features-images.mjs). Sizes are the files' own.
 */

export type ModuleId =
  | "sales"
  | "zatca"
  | "purchases"
  | "inventory"
  | "accounting"
  | "hr"
  | "templates"
  | "reports"
  | "dashboard"
  | "permissions"
  | "apps"
  | "support"
  | "general";

/** Register order: the app's own areas, in the order a business meets them. */
export const moduleIds: ModuleId[] = [
  "sales",
  "zatca",
  "purchases",
  "inventory",
  "accounting",
  "hr",
  "templates",
  "reports",
  "dashboard",
  "permissions",
  "apps",
  "support",
  "general",
];

export type ExhibitId =
  | "sales-invoices"
  | "sales-quotation"
  | "sales-invoice"
  | "zatca-taxes"
  | "purchases-bills"
  | "purchases-bill-new"
  | "inventory-warehouses"
  | "inventory-transfer"
  | "accounting-chart"
  | "accounting-entries"
  | "hr-payroll"
  | "templates-design"
  | "reports-hub"
  | "dashboard-home"
  | "permissions-roles";

export type PhotoId = "sales" | "purchases" | "app";

const size = (width: number, height: number) => ({ width, height });

/** The one exhibit that is not a captured screen: the printed tax invoice, the same file in both languages. */
const sharedExhibits: ExhibitId[] = ["sales-invoice"];

const screen = size(975, 800);

export const exhibitSizes: Record<ExhibitId, { width: number; height: number }> = {
  "sales-invoices": screen,
  "sales-quotation": screen,
  "sales-invoice": size(1140, 1651),
  "zatca-taxes": screen,
  "purchases-bills": screen,
  "purchases-bill-new": screen,
  "inventory-warehouses": screen,
  "inventory-transfer": screen,
  "accounting-chart": screen,
  "accounting-entries": screen,
  "hr-payroll": screen,
  "templates-design": screen,
  "reports-hub": screen,
  "dashboard-home": screen,
  "permissions-roles": screen,
};

export const photoSizes: Record<PhotoId, { width: number; height: number }> = {
  sales: size(490, 454),
  purchases: size(347, 321),
  app: size(1568, 1657),
};

/** Each section's attached sheets, in paging order. */
export const moduleExhibits: Partial<Record<ModuleId, ExhibitId[]>> = {
  sales: ["sales-invoices", "sales-quotation"],
  zatca: ["sales-invoice", "zatca-taxes"],
  purchases: ["purchases-bills", "purchases-bill-new"],
  inventory: ["inventory-warehouses", "inventory-transfer"],
  accounting: ["accounting-chart", "accounting-entries"],
  hr: ["hr-payroll"],
  templates: ["templates-design"],
  reports: ["reports-hub"],
  dashboard: ["dashboard-home"],
  permissions: ["permissions-roles"],
};

/** The old page's cut-out photos, by section. */
export const modulePhotos: Partial<Record<ModuleId, PhotoId>> = {
  sales: "sales",
  purchases: "purchases",
  general: "app",
};

/**
 * A screen replaced after launch takes a new file name, so no image cache (31 days in
 * next.config.ts) can keep serving the old one. On 2026-11-22 the owner supplied new
 * captures of the payroll screen (its Created by column showing Demo Account) and of
 * the taxes screen.
 */
const exhibitFiles: Partial<Record<ExhibitId, string>> = {
  "hr-payroll": "hr-payroll-v2",
  "zatca-taxes": "zatca-taxes-v2",
};

/** A screen in the page's language; the printed invoice is one file for both. */
export const exhibitSrc = (id: ExhibitId, locale: "ar" | "en") => {
  const file = exhibitFiles[id] ?? id;
  return sharedExhibits.includes(id) ? `/features/${file}.webp` : `/features/${locale}/${file}.webp`;
};
export const photoSrc = (id: PhotoId) => `/features/photo-${id}.webp`;

export type PartnerId = "foodics" | "zid" | "marn" | "lazywait";

/** The integrations the page lists (owner, 2026-11-10): ZenHR and Order are gone; Prexle too (owner, 2026-11-12); LazyWait added with its own page (owner, 2026-11-16). */
export const partnerIds: PartnerId[] = ["foodics", "zid", "marn", "lazywait"];

/** Each partner's mark alone. */
export const partnerMarks: Record<PartnerId, Raster> = {
  foodics: integrations.foodics.mark,
  zid: integrations.zid.mark,
  marn: integrations.marn.mark,
  lazywait: integrations.lazywait.mark,
};

/** The pages that explain each integration. */
export const partnerPaths: Record<PartnerId, PagePair> = integrationPaths;

/** The public API's documentation in the app. */
export const apiDocs = "https://app.getvom.com/en/docs/api";

/** The VoM Pay post (Arabic only), kept at its WordPress path. */
export const vomPayPost = "/روابط-دفع-إلكتروني-مع-فاتورة/";
