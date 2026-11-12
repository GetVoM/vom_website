import { annualPrice, flexRates, formatAmount as f, monthlyPrice, reportCount, vatPercent } from "./plans";
import type { PricingCopy } from "./types";

const advanced = monthlyPrice.advanced!;
const unlimited = monthlyPrice.unlimited!;

/** Rewritten natively from the old English page and the app's Flex card. */
export const pricingEn: PricingCopy = {
  breadcrumb: "Pricing",
  h1: "VoM plans and pricing",
  lede: "Pay monthly or yearly, or pay as you go with Flex.",
  noCard: "No credit card required",
  billing: {
    legend: "Billing period",
    monthly: "Monthly",
    annual: "Yearly",
    free: "2 months free",
  },
  per: {
    month: "a month",
    year: "a year",
    transaction: "per transaction",
    user: "per extra user",
    centre: "per centre a month",
    firstUser: "a month, first user",
  },
  from: "From",
  save: "Save",
  contactPrice: "Talk to our sales team",
  contactShort: "Contact us",
  popular: "Most popular",
  sealMicro: "VoM",
  currency: "SAR",
  vatNote: `Prices exclude ${vatPercent}% VAT`,
  plans: {
    flex: {
      summary: "Pay as your business grows",
      points: [
        "Everything in Unlimited",
      ],
      cta: "Register now",
    },
    advanced: {
      summary: "5 users and 50 of each document",
      points: [
        "5 users",
        "50 each of sales invoices, quotes and receipts",
        "50 each of purchase bills, expenses and payment vouchers",
        "50 each of journal entries and cost centres",
        "1 sales invoice template",
      ],
      cta: "Register now",
    },
    unlimited: {
      summary: "No limit on users or documents",
      points: [
        "Unlimited users and documents",
        "10 sales invoice templates",
        "Fixed assets: purchase, depreciation, upgrade and sale",
        "Foodics, Zid and Marn integrations",
      ],
      cta: "Register now",
    },
    business: {
      summary: "Everything, plus the API",
      points: [
        "Everything in Unlimited",
        "Connect your app or website to VoM through the API",
        "Dedicated technical support",
      ],
      cta: "Contact sales",
    },
  },
  flex: {
    extraUser: "Extra user, monthly",
    zatca: "ZATCA link, monthly",
    costCentre: "Cost centre, monthly",
    assets: "Assets, monthly",
    integrations: "Integrations, monthly",
    transaction: "Each transaction",
    export: "Each export",
    autoCharge: "Charged automatically when your usage reaches",
  },
  compare: {
    heading: "Compare the plans",
    caption: "What differs between VoM's four plans",
    feature: "Feature",
    groups: {
      documents: "Documents and entries",
      team: "Users and templates",
      extras: "Assets and apps",
      business: "API and support",
    },
    rows: {
      salesDocs: "Sales invoices, quotes and customer receipts",
      purchaseDocs: "Purchase bills, expenses and payment vouchers",
      entries: "Journal entries and easy entries",
      costCentres: "Cost centres",
      users: "Users",
      templates: "Sales invoice templates",
      assets: "Fixed assets: purchase, depreciation, upgrade and sale",
      apps: "Foodics, Zid and Marn integrations",
      api: "API connection to your app or website",
      support: "Dedicated technical support",
    },
    yes: "Included",
    no: "Not included",
    unlimited: "Unlimited",
    usage: "Pay per use",
    each: "of each",
  },
  included: {
    heading: "In every plan",
    lede: "These come with all four plans, whichever you choose.",
    groups: [
      { heading: "Sales", items: ["Unlimited customer list", "Customer payment tracking and filters"] },
      { heading: "Purchases", items: ["Unlimited supplier list", "Supplier payment tracking and filters"] },
      { heading: "Accounting", items: ["Chart of accounts with unlimited levels"] },
      { heading: "Products and services", items: ["Products", "Services", "Expense items", "Categories", "Units"] },
      {
        heading: "Document design",
        items: ["Show or hide optional details", "Quote design", "Receipt and payment voucher design"],
      },
      { heading: "Users and permissions", items: ["Roles and permissions"] },
      { heading: "HR", items: ["Employee and salary records", "Payroll runs"] },
      {
        heading: `${reportCount} reports`,
        items: [
          "VAT return",
          "Account statement",
          "Account summary",
          "Income statement",
          "Cash flow (direct)",
          "Cash flow (indirect)",
          "Trial balance",
          "General ledger",
          "Balance sheet",
          "Sales",
          "Purchases",
          "Cost centres",
          "Journal entries",
          "Fixed assets",
        ],
      },
    ],
  },
  faqHeading: "Pricing questions",
  faq: [
    {
      q: "Do the prices include VAT?",
      a: `No. Prices are shown before tax, and ${vatPercent}% VAT is added to the invoice total.`,
    },
    {
      q: "How much do I save with yearly billing?",
      a: `Two months free: Advanced is SAR ${f(annualPrice("advanced")!)} a year instead of SAR ${f(advanced * 12)}, and Unlimited is SAR ${f(annualPrice("unlimited")!)} instead of SAR ${f(unlimited * 12)}.`,
    },
    {
      q: "How is Flex billed, and what does it include?",
      a: `Flex starts at SAR ${f(flexRates.firstUser)} a month for the first user, then SAR ${f(flexRates.extraUser)} a month for each extra user. You pay SAR ${f(flexRates.transaction)} per transaction, such as a purchase bill or a journal entry, and SAR ${f(flexRates.export)} each time you export a report to PDF or Excel. The modules you add are billed monthly: SAR ${f(flexRates.zatca)} for the ZATCA integration, SAR ${f(flexRates.costCentre)} per cost centre, SAR ${f(flexRates.assets)} for assets and SAR ${f(flexRates.integrations)} for integrations. Your usage is charged automatically when it reaches SAR ${f(flexRates.autoCharge)}. Flex includes everything in Unlimited.`,
    },
    {
      q: "Do I need a credit card to try VoM?",
      a: "No. You can register and try VoM without entering a credit card.",
    },
    {
      q: "What does Business add?",
      a: "Everything in Unlimited, plus an API connection between your app or website and VoM, and dedicated technical support. Talk to our sales team for a price.",
    },
  ],
  close: {
    line: "Try VoM free. No credit card needed.",
    register: "Register now",
    demo: "Book a demo",
  },
  seo: {
    title: `VoM Pricing | Accounting Software Plans from SAR ${f(flexRates.firstUser)} a Month`,
    description: `Compare VoM plans: Flex starts at SAR ${f(flexRates.firstUser)} a month and you pay as you go; Advanced is SAR ${f(advanced)} and Unlimited SAR ${f(unlimited)} a month, with two months free yearly.`,
  },
};
