import type { ExhibitId, ModuleId, PartnerId, PhotoId } from "./assets";

/** One entry of the register: a capability, as the old page stated it. */
export interface FeatureEntry {
  text: string;
  /** Part of `text` that links out, with where it goes. */
  link?: { term: string; href: string };
  /** The old page says "بعدد لا محدود" / "unlimited": the limit column is stamped. */
  unlimited?: true;
  /** Differs between the plans (pricing's comparison ledger): marked to the plan note. */
  plan?: true;
}

/** A report the old page described at length. */
export interface FeaturedReport {
  name: string;
  body: string;
}

/** A section of the register: one of the old page's eleven modules. */
export interface FeatureModule {
  id: ModuleId;
  title: string;
  /** A line before the entries (the apps section's own introduction). */
  intro?: string;
  entries: FeatureEntry[];
}

/** The features page's copy in one language. Images and their order live in assets.ts. */
export interface FeaturesCopy {
  seo: { title: string; description: string };
  crumb: string;
  h1: string;
  /** The old page's second heading, kept as the promise under the title. */
  subline: string;
  lede: string;
  register: string;
  demo: string;
  /** The contents sheet on the teal field. */
  contents: {
    title: string;
    label: string;
    /** "11 قسمًا" */
    sections: (n: number) => string;
    /** "58 بندًا", also each section's count. */
    entries: (n: number) => string;
  };
  /** The register's column heads and the plan marker's accessible name. */
  ledger: { entry: string; limit: string; unlimited: string; plan: string };
  /** The attached sheets' controls; `of` takes {n} and {total}. */
  sheets: { of: string; prev: string; next: string };
  /** In register order (assets.ts moduleIds). */
  modules: FeatureModule[];
  /** Each attached screen's caption, which is also its alt text. */
  captions: Record<ExhibitId, string>;
  photos: Record<PhotoId, string>;
  reports: { featured: FeaturedReport[]; index: string[]; indexHeading: string };
  apps: {
    names: Record<PartnerId, string>;
    /** After each partner's name, on the link to its page. */
    details: string;
    api: FeatureEntry;
    docs: string;
  };
  support: { heading: string; whatsapp: string; email: string };
  app: { line: string; ios: string; android: string };
  planNote: { text: string; link: string };
  close: { line: string; register: string; demo: string };
  newTab: string;
}
