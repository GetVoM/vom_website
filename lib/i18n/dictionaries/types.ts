export type SectorIcon =
  | "utensils"
  | "scissors"
  | "dumbbell"
  | "scale"
  | "pen"
  | "megaphone"
  | "truck"
  | "plane"
  | "car"
  | "cart"
  | "spray"
  | "building"
  | "chart"
  | "printer"
  | "baby";

export type ResourceKind = "guide" | "tool" | "template";

export type SocialId = "facebook" | "x" | "linkedin" | "instagram" | "tiktok" | "whatsapp";

export interface Dictionary {
  brand: { name: string; tagline: string; description: string };
  nav: {
    home: string;
    breadcrumb: string;
    features: string;
    sectors: string;
    pricing: string;
    einvoicing: string;
    /** The Business support menu's button. */
    support: string;
    /**
     * Business support's links in labelled groups. The last group sits on the
     * menu's teal field. `href` is a path without the locale, or a full URL.
     */
    supportGroups: { heading: string; links: { label: string; href: string }[] }[];
    login: string;
    start: string;
    switchLocale: string;
    menu: string;
    close: string;
  };
  hero: {
    tierLight: string;
    tierBold: string;
    body: string;
    primary: string;
    secondary: string;
    proof: string;
    demoLabel: string;
  };
  invoice: {
    kind: string;
    seller: string;
    vatNumber: string;
    date: string;
    items: [string, string, string][];
    subtotal: string;
    vat: string;
    total: string;
    reported: string;
  };
  certificate: {
    title: string;
    establishment: string;
    status: string;
    statusValue: string;
    lastInvoice: string;
    sealTop: string;
    sealMain: string;
    serial: string;
  };
  report: { title: string; rows: [string, string][]; net: string; netValue: string };
  month: { heading: string; legendOn: string; legendToday: string; label: string };
  steps: {
    heading: string;
    body: string;
    items: { title: string; body: string }[];
    panels: {
      sale: { title: string; customer: string; amount: string; method: string; methodValue: string; button: string };
      invoice: { title: string; status: string; qr: string };
      report: { title: string; period: string };
    };
  };
  zatca: {
    heading: string;
    body: string;
    cta: string;
    types: { title: string; body: string }[];
    timeline: { date: string; label: string }[];
  };
  sectors: { heading: string; all: string; items: { slug: string; name: string; icon: SectorIcon }[] };
  integrations: { heading: string; items: { name: string; body: string }[] };
  resources: {
    heading: string;
    all: string;
    guide: string;
    tool: string;
    template: string;
    readMinutes: string;
    items: { kind: ResourceKind; title: string; href: string; minutes: number }[];
  };
  vat: {
    title: string;
    amount: string;
    rate: string;
    inclusive: string;
    net: string;
    tax: string;
    gross: string;
    currency: string;
    more: string;
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  closing: {
    heading: string;
    body: string;
    inputLabel: string;
    placeholder: string;
    cta: string;
    pricingLine: string;
    compare: string;
    defaultName: string;
  };
  footer: {
    about: string;
    product: string;
    support: string;
    company: string;
    /** Heading of the column that lists the integration pages. */
    marketplace: string;
    links: { product: [string, string][]; support: [string, string][]; company: [string, string][] };
    approved: string;
    rights: string;
    appStore: string;
  };
  numbers: {
    heading: string;
    body: string;
    asOf: string;
    items: { value: number; suffix: string; unit: string; label: string }[];
  };
  clients: { heading: string; body: string; count: string; note: string };
  testimonials: { heading: string; body: string; prev: string; next: string; slideOf: string };
  integrationsSection: {
    heading: string;
    body: string;
    live: string;
    soon: string;
    api: string;
    apiBody: string;
    docs: string;
    details: {
      clients: string;
      invoices: string;
      sync: string;
      how: string;
      activate: string;
      waitlist: string;
      flow: [string, string, string];
      /** Link to a partner's integration page; `{partner}` is the partner's name. */
      page: string;
    };
  };
  reports: { heading: string; body: string; countLabel: string; items: string[]; cta: string; live: string };
  features: { heading: string; body: string; cta: string; items: { title: string; body: string; icon: string }[] };
  apps: {
    heading: string;
    body: string;
    ios: string;
    android: string;
    features: string[];
    screen: { title: string; subtitle: string; amount: string; button: string; status: string };
  };
  contact: {
    heading: string;
    intro: string;
    whatsappCta: string;
    emailCta: string;
    info: { heading: string; addressLabel: string; address: string; phoneLabel: string; emailLabel: string };
    follow: { heading: string; items: Record<SocialId, string> };
    question: { heading: string; body: string; reply: string; sealUnit: string; sealNote: string };
    seo: { title: string; description: string };
  };
  about: {
    crumb: string;
    heading: string;
    lede: string;
    figures: { value: string; label: string; target: string }[];
    problem: string[];
    answer: { heading: string; body: string };
    story: {
      heading: string;
      rows: {
        id: string;
        /** Positions in `figures`, shown above this row's text. */
        figures: number[];
        body: string;
        challenge?: { heading: string; body: string };
      }[];
    };
    why: {
      heading: string;
      body?: string;
      listHeading?: string;
      items: AboutItem[];
      result: { heading: string; body: string };
    };
    today: { heading: string; body: string[]; items: AboutItem[] };
    statement: string;
    approach: { heading: string; items: AboutItem[] };
    closingStatement: string;
    vision: AboutCharter;
    mission: AboutCharter;
    values: { heading: string; intro: string; items: AboutItem[] };
    team: {
      heading: string;
      intro: string;
      outro: string;
      members: { name: string; role: string; photo: string }[];
    };
    cta: { heading: string; body: string; primary: string; secondary: string };
    images: Record<"owner" | "growth" | "laptop" | "reports" | "balance" | "boardroom" | "meeting", string>;
    seo: { title: string; description: string };
  };
  growth: {
    crumb: string;
    heading: string;
    /** Phrases of the tagline; a line never breaks inside one. */
    tagline: string[];
    lede: string;
    /** Hidden text after a link that opens the program's Google Form in a new tab. */
    newTab: string;
    startups: {
      heading: string;
      /** The discount, set as a figure. */
      figure: string;
      figureLabel: string;
      duration: string;
      apply: string;
      included: string;
    };
    partners: {
      heading: string;
      body: string;
      question: string;
      apply: string;
      items: GrowthPartner[];
    };
    features: { heading: string; items: GrowthFeature[] };
    /** The closing line, split around the figure: before, figure, after. */
    close: { before: string; figure: string; after: string; apply: string };
    images: { hand: string };
    seo: { title: string; description: string };
  };
  integrationPages: {
    register: string;
    /** Accessible name of a video's play button; `{title}` is the video's title. */
    play: string;
    /** Marks a video whose soundtrack is Arabic; empty where that goes without saying. */
    inArabic: string;
    /** Heads of the posting ledger's two columns; the partner's or VoM's mark follows. */
    ledgerFrom: string;
    ledgerTo: string;
    others: string;
    items: Record<IntegrationId, IntegrationCopy>;
  };
  student: {
    crumb: string;
    heading: string;
    lede: string;
    /** A student signs up in the app; a university fills in a Google Form, in a new tab. */
    register: { student: string; university: string };
    /** Hidden text after a link that opens the university form in a new tab. */
    newTab: string;
    /** The double-ring seal: the offer, and its English micro-label (on paper only). */
    seal: { word: string; micro: string };
    /** The opening spread: one entry as the textbook writes it, and as VoM records it. */
    hero: {
      book: StudentBookEntry;
      record: StudentRecord;
    };
    features: {
      heading: string;
      /** The textbook page's running foot; the VoM page's letterhead is VoM's mark. */
      bookHead: string;
      spreads: StudentSpread[];
    };
    reports: {
      /** The heading, split around the figure: before, figure, after. */
      heading: { before: string; figure: string; after: string };
      footnote: string;
      items: { id: StudentReportId; name: string }[];
    };
    benefits: { heading: string; items: { title: string; body: string; alt: string }[] };
    close: { line: string; body: string };
    seo: { title: string; description: string };
  };
  terms: {
    heading: string;
    /** `{n}` is the number of numbered sections. */
    sectionCount: string;
    /** Label before the email address the agreement names for official notices. */
    noticesLabel: string;
    contents: string;
    /** Accessible name of a clause number, which links to the clause; `{n}` is the number. */
    clauseLink: string;
    seo: { title: string; description: string };
  };
  seo: { homeTitle: string; homeDescription: string };
}

export type AboutIcon =
  | "chip"
  | "pointer"
  | "receipt"
  | "refresh"
  | "support"
  | "users"
  | "chart"
  | "spark"
  | "bolt"
  | "plug"
  | "flag"
  | "shield"
  | "bulb"
  | "eye"
  | "growth";

export interface AboutItem {
  icon: AboutIcon;
  title: string;
  body: string;
}

export type GrowthIcon = "receipt" | "book" | "wallet" | "users" | "box" | "history" | "chart";

export interface GrowthFeature {
  icon: GrowthIcon;
  title: string;
  body: string;
}

export type IntegrationId = "foodics" | "marn" | "zid";

/** One integration page. Assets and video facts live in lib/integrations.ts. */
export interface IntegrationCopy {
  /** The partner's name as this language writes it; also the alt text of its mark. */
  partner: string;
  /** What the partner is, in a few words: its subtitle in the homepage's integration tabs. */
  category: string;
  /** The page's name: the breadcrumb, and the tile that links here from the other pages. */
  crumb: string;
  heading: string;
  lede: string;
  /** The ghost link to the video beside the register button. */
  watch: string;
  /** What the partner's records become in VoM, as the old page states it. */
  sync: { heading: string; rows: { from: string; to: string }[] };
  /** What the partner's own product offers; omitted when the old page listed nothing. */
  offer?: { heading: string; items: string[] };
  /** Display titles of the videos, in the order of lib/integrations.ts. */
  videos: string[];
  close: string;
  images: { lockup: string };
  seo: { title: string; description: string };
}

export type StudentReportId =
  | "vat"
  | "balance-sheet"
  | "cash-flow-direct"
  | "cash-flow-indirect"
  | "account-statements"
  | "general-ledger"
  | "income-statement"
  | "journal"
  | "purchases"
  | "sales"
  | "account-summary"
  | "assets"
  | "trial-balance"
  | "cost-centres";

/** A journal entry in the notation of this language's textbooks. */
export interface StudentBookEntry {
  /** Column heads: the entry's wording, then debit and credit. */
  columns: [string, string, string];
  /** The debited account, then the credited one, as the textbook writes them. */
  debit: string;
  credit: string;
  /** The explanation under the entry, in parentheses. */
  memo: string;
  amount: string;
}

/** The same entry as a VoM journal record, with demonstration figures. */
export interface StudentRecord {
  title: string;
  serialLabel: string;
  serial: string;
  dateLabel: string;
  date: string;
  /** Column heads: account, debit, credit. */
  columns: [string, string, string];
  lines: [string, string];
  total: string;
  attachment: string;
  /** Labels the figures as demonstration data. */
  demo: string;
}

/**
 * One feature group as a spread: the concept as the textbook teaches it, beside
 * what VoM does. `labels` are the words printed on the drawn form, by kind:
 * taccount [debited account, credited account, debit, credit];
 * invoice [title, seller, VAT number, item, VAT line, total];
 * ledger [title, debit, credit, balance];
 * voucher [title, number, received from, the sum of, being].
 */
export interface StudentSpread {
  form: { kind: "taccount" | "invoice" | "ledger" | "voucher"; labels: string[] };
  concept: string;
  conceptLine: string;
  title: string;
  items: string[];
}

export interface GrowthPartner {
  name: string;
  /** Path under /growth/partners/. */
  logo: string;
}

export interface AboutCharter {
  heading: string;
  body: string;
  list?: string[];
}
