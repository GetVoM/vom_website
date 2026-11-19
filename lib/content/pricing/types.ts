import type { PlanId, RowId } from "./plans";

export interface PlanCopy {
  /** One factual line under the plan's name. */
  summary: string;
  /** What sets the plan apart, as a ticked list on its sheet. */
  points: string[];
  cta: string;
}

export interface PricingQuestion {
  q: string;
  a: string;
}

/** The pricing page's copy in one language. Prices and limits come from plans.ts. */
export interface PricingCopy {
  breadcrumb: string;
  h1: string;
  lede: string;
  noCard: string;
  billing: {
    legend: string;
    monthly: string;
    annual: string;
    /** The chip under Flex's price: it has no annual billing. */
    monthlyOnly: string;
    /** Under the sheets while annual is chosen, where Flex is hidden. */
    flexHidden: string;
    /** Under the sheets while monthly is chosen, where only Flex shows. */
    annualOnly: string;
  };
  /** The button beside the billing switch that jumps to the comparison ledger. */
  compareJump: string;
  /** Units after a figure: "/ شهريًا", "/ year", "per transaction". */
  per: {
    month: string;
    year: string;
    transaction: string;
    user: string;
    /** Per cost centre, each month. */
    centre: string;
    /** After Flex's starting price: what it covers. */
    firstUser: string;
    /** Per export of a report. */
    export: string;
  };
  /** Before Flex's starting price. */
  from: string;
  /** Business's figure: it is quoted by sales. */
  contactPrice: string;
  /** The same, short enough for the ledger's column head. */
  contactShort: string;
  popular: string;
  sealMicro: string;
  /** The riyal sign's spoken name. */
  currency: string;
  vatNote: string;
  plans: Record<PlanId, PlanCopy>;
  flex: {
    /** Labels of the rate chips: the monthly ones, then the per-use ones. */
    extraUser: string;
    zatca: string;
    costCentre: string;
    assets: string;
    integrations: string;
    transaction: string;
    export: string;
    /** Before the amount at which usage is charged automatically; set as a ticked point. */
    autoCharge: string;
  };
  /** The ledger. Its group heads are the features page's section titles. */
  compare: {
    heading: string;
    caption: string;
    feature: string;
    rows: Record<RowId, string>;
    /** A small line under a row's label. */
    notes: Partial<Record<RowId, string>>;
    /** The link after the ledger to the features page. */
    more: string;
    yes: string;
    no: string;
    unlimited: string;
    /** Flex's cell where a row's documents are priced differently. */
    usage: string;
    /** Under a count that applies to each kind of document in the row. */
    each: string;
  };
  faqHeading: string;
  faq: PricingQuestion[];
  close: { line: string; register: string; demo: string };
  seo: { title: string; description: string };
}
