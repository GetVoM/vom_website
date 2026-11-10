import type { SectorId } from "@/lib/i18n/dictionaries/types";

export type { SectorId };

/**
 * The old pages' ten feature icons, redrawn as line icons (drawn in CSS from
 * data-feature): costs, customers, expenses, reports, operations, attachments,
 * payroll, billing, connect, projects.
 */
export type FeatureIcon =
  | "costs"
  | "customers"
  | "expenses"
  | "reports"
  | "operations"
  | "attachments"
  | "payroll"
  | "billing"
  | "connect"
  | "projects";

export interface SectorFeature {
  icon: FeatureIcon;
  title: string;
  body: string;
}

export interface SectorQuestion {
  q: string;
  a: string;
}

/** An article card: the post's kept URL and the old card's image in public/sectors/reading/. */
export interface SectorArticle {
  title: string;
  href: string;
  image: string;
}

/** One sector page's copy in one language. The template's own words are in the dictionaries. */
export interface SectorCopy {
  /** The sector after "برنامج محاسبة" / "Accounting software" in the H1, e.g. "للمطاعم والمقاهي". */
  forName: string;
  lede: string;
  photoAlt: string;
  features: [SectorFeature, SectorFeature, SectorFeature, SectorFeature];
  /** Shown only when the sector has client logos. */
  clientsHeading: string;
  /** The old page's band line, set on the closing teal band. */
  close: string;
  faq: SectorQuestion[];
  /** Arabic only: the old page's four article cards. */
  reading?: SectorArticle[];
  seo: { title: string; description: string };
}

export interface Raster {
  src: string;
  width: number;
  height: number;
}
