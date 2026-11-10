import { integrations, type Raster } from "@/lib/integrations";
import { integrationPaths, type PagePair } from "@/lib/i18n/routes";

/**
 * The features page's images, from the old WordPress page (scripts/features-images.mjs
 * writes them to public/features/). Sizes are the WebP files' own.
 */

export type ModuleId =
  | "sales"
  | "purchases"
  | "products"
  | "accounting"
  | "hr"
  | "templates"
  | "reports"
  | "permissions"
  | "apps"
  | "support"
  | "general";

/** Register order: the old page's order of modules. */
export const moduleIds: ModuleId[] = [
  "sales",
  "purchases",
  "products",
  "accounting",
  "hr",
  "templates",
  "reports",
  "permissions",
  "apps",
  "support",
  "general",
];

export type ExhibitId =
  | "sales-reminders"
  | "sales-invoice"
  | "sales-status"
  | "purchases-expenses"
  | "products-add"
  | "products-categories"
  | "products-units"
  | "accounting-assets"
  | "accounting-chart"
  | "accounting-entries"
  | "hr-positions"
  | "hr-employees"
  | "hr-payroll"
  | "templates-design"
  | "templates-bank"
  | "templates-terms"
  | "permissions-roles"
  | "permissions-users"
  | "reports-dashboard";

export type PhotoId = "sales" | "purchases" | "app";

const size = (width: number, height: number) => ({ width, height });

/** Real VoM screens (October 2023), plus the reports illustration. */
export const exhibitSizes: Record<ExhibitId, { width: number; height: number }> = {
  "sales-reminders": size(910, 1040),
  "sales-invoice": size(1140, 1651),
  "sales-status": size(1239, 433),
  "purchases-expenses": size(817, 476),
  "products-add": size(1055, 547),
  "products-categories": size(1600, 749),
  "products-units": size(1600, 715),
  "accounting-assets": size(1600, 850),
  "accounting-chart": size(1600, 1028),
  "accounting-entries": size(1600, 570),
  "hr-positions": size(1600, 486),
  "hr-employees": size(1600, 645),
  "hr-payroll": size(1600, 996),
  "templates-design": size(1600, 1012),
  "templates-bank": size(1600, 266),
  "templates-terms": size(1600, 658),
  "permissions-roles": size(1526, 887),
  "permissions-users": size(1452, 569),
  "reports-dashboard": size(1572, 849),
};

export const photoSizes: Record<PhotoId, { width: number; height: number }> = {
  sales: size(490, 454),
  purchases: size(347, 321),
  app: size(1568, 1657),
};

/** Each section's attached sheets, in paging order. */
export const moduleExhibits: Partial<Record<ModuleId, ExhibitId[]>> = {
  sales: ["sales-invoice", "sales-status", "sales-reminders"],
  purchases: ["purchases-expenses"],
  products: ["products-add", "products-categories", "products-units"],
  accounting: ["accounting-chart", "accounting-entries", "accounting-assets"],
  hr: ["hr-employees", "hr-payroll", "hr-positions"],
  templates: ["templates-design", "templates-bank", "templates-terms"],
  reports: ["reports-dashboard"],
  permissions: ["permissions-roles", "permissions-users"],
};

/** The old page's cut-out photos, by section. */
export const modulePhotos: Partial<Record<ModuleId, PhotoId>> = {
  sales: "sales",
  purchases: "purchases",
  general: "app",
};

export const exhibitSrc = (id: ExhibitId) => `/features/${id}.webp`;
export const photoSrc = (id: PhotoId) => `/features/photo-${id}.webp`;

export type PartnerId = "foodics" | "zid" | "marn" | "prexle";

/** The integrations the page lists (owner, 2026-11-10): ZenHR and Order are gone. */
export const partnerIds: PartnerId[] = ["foodics", "zid", "marn", "prexle"];

/** Each partner's mark alone; Prexle's is the partner half of its old VoM lockup. */
export const partnerMarks: Record<PartnerId, Raster> = {
  foodics: integrations.foodics.mark,
  zid: integrations.zid.mark,
  marn: integrations.marn.mark,
  prexle: { src: "/features/prexle-mark.webp", width: 841, height: 723 },
};

/**
 * The pages that explain each integration. Prexle's is still to build; these are
 * its kept WordPress paths (docs/content/url-map.csv).
 */
export const partnerPaths: Record<PartnerId, PagePair> = {
  ...integrationPaths,
  prexle: { ar: "/vom-prexle/", en: "/vom-prexel/" },
};

/** The public API's documentation in the app. */
export const apiDocs = "https://app.getvom.com/en/docs/api";

/** The VoM Pay post (Arabic only), kept at its WordPress path. */
export const vomPayPost = "/روابط-دفع-إلكتروني-مع-فاتورة/";
