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

export interface Dictionary {
  brand: { name: string; tagline: string; description: string };
  nav: {
    features: string;
    sectors: string;
    pricing: string;
    einvoicing: string;
    blog: string;
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
    details: { clients: string; invoices: string; sync: string; how: string; activate: string; waitlist: string; flow: [string, string, string] };
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
  seo: { homeTitle: string; homeDescription: string };
}
