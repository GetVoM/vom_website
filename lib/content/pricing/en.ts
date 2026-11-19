import { flexRates, formatAmount as f, planPrice, reportCount, vatPercent } from "./plans";
import type { PricingCopy } from "./types";

const advanced = planPrice.advanced!;
const unlimited = planPrice.unlimited!;

/**
 * Rewritten natively from the old English page and the app's Flex card; yearly-only
 * billing and the ledger's rows are the owner's of 2026-11-19, as in Arabic.
 */
export const pricingEn: PricingCopy = {
  breadcrumb: "Pricing",
  h1: "VoM plans and pricing",
  lede: "Pay yearly for Advanced or Unlimited, or monthly as you go with Flex",
  noCard: "No credit card required",
  billing: {
    legend: "Billing period",
    monthly: "Monthly",
    annual: "Yearly",
    monthlyOnly: "Monthly billing only",
    flexHidden: "Flex is billed monthly only. Switch to Monthly to see it",
    annualOnly: "The other plans are billed yearly only. Switch to Yearly to see them",
  },
  compareJump: "Compare all features",
  per: {
    month: "a month",
    year: "a year",
    transaction: "per transaction",
    user: "per extra user",
    centre: "per centre a month",
    firstUser: "a month, first user",
    export: "per export",
  },
  from: "From",
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
        "11 sales invoice templates",
        "Fixed assets: purchase, depreciation, upgrade and sale",
        "Foodics, Zid, Marn and LazyWait integrations",
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
    caption: "What each of VoM's four plans includes",
    feature: "Feature",
    rows: {
      customers: "Customers",
      salesDocs: "Sales invoices, quotes and customer receipts",
      quoteConvert: "Quotes turned into proforma or sales invoices",
      notes: "Credit and debit notes",
      recurringInvoices: "Recurring invoices",
      customerPayments: "Customer payment tracking and filters",
      vomPay: "VoM Pay payment links",
      sharing: "Documents sent by email or WhatsApp",

      zatcaPhase1: "Phase 1: e-invoices with a QR code",
      zatcaPhase2: "Phase 2: linked to ZATCA's Fatoora platform",
      vatCategories: "Ready VAT categories with exemption reasons",

      suppliers: "Suppliers",
      purchaseDocs: "Purchase bills, expenses and payment vouchers",
      purchaseOrders: "Purchase orders",
      purchaseReturns: "Purchase returns",
      supplierPayments: "Supplier payment tracking and filters",

      products: "Products, services, bundles and expense items",
      categories: "Categories and units",
      warehouses: "Several warehouses, main and sub",
      stockMoves: "Inbound, outbound and transfer requisitions",
      costing: "Weighted-average stock costing",
      minQuantity: "Minimum-quantity alerts",

      chart: "Chart of accounts with unlimited levels",
      entries: "Journal entries and easy entries",
      recurringEntries: "Recurring entries",
      costCentres: "Cost centres",
      bankMatching: "Bank statement matching",
      yearClose: "Year-end close and carried-forward balances",
      assets: "Fixed assets: purchase, depreciation, upgrade and sale",

      employees: "Employee and salary records",
      payroll: "Payroll runs",
      positions: "Job positions",

      templates: "Sales invoice templates",
      printLanguage: "Print in Arabic, English or both",
      optionalDetails: "Show or hide optional details",
      quoteDesign: "Quote design",
      voucherDesign: "Receipt and payment voucher design",
      numbering: "Numbering prefix and start for each document",

      reports: `${reportCount} ready reports`,
      inventoryReports: "Three inventory reports",
      exports: "Report exports to PDF or Excel",

      dashboard: "Dashboard: sales, purchases, expenses and net profit",
      vomAi: "VoM AI (beta)",
      weeklyEmail: "Weekly summary email",

      users: "Users",
      roles: "Roles and permissions",
      scopedUsers: "Users limited to a branch or warehouse",
      activityLog: "Activity log for each user",

      apps: "Foodics, Zid, Marn and LazyWait integrations",
      api: "API connection to your app or website",

      care: "Customer support, free onboarding and free updates",
      support: "Dedicated technical support",

      bilingual: "Arabic and English interface",
      attachments: "Attachments on every transaction",
      customFields: "Custom fields",
      iosApp: "iOS app",
    },
    notes: { reports: "The fixed-assets report comes with plans that include asset management" },
    more: "See every feature in detail",
    yes: "Included",
    no: "Not included",
    unlimited: "Unlimited",
    usage: "Pay per use",
    each: "of each",
  },
  faqHeading: "Pricing questions",
  faq: [
    {
      q: "Do the prices include VAT?",
      a: `No. Prices are shown before tax, and ${vatPercent}% VAT is added to the invoice total`,
    },
    {
      q: "How is Flex billed, and what does it include?",
      a: `Flex is billed monthly only; it has no yearly option. It starts at SAR ${f(flexRates.firstUser)} a month for the first user, then SAR ${f(flexRates.extraUser)} a month for each extra user. You pay SAR ${f(flexRates.transaction)} per transaction, such as a purchase bill or a journal entry, and SAR ${f(flexRates.export)} each time you export a report to PDF or Excel. The modules you add are billed monthly: SAR ${f(flexRates.zatca)} for the ZATCA integration, SAR ${f(flexRates.costCentre)} per cost centre, SAR ${f(flexRates.assets)} for assets and SAR ${f(flexRates.integrations)} for integrations. Your usage is charged automatically when it reaches SAR ${f(flexRates.autoCharge)}. Flex includes everything in Unlimited`,
    },
    {
      q: "Do I need a credit card to try VoM?",
      a: "No. You can register and try VoM without entering a credit card",
    },
    {
      q: "What does Business add?",
      a: "Everything in Unlimited, plus an API connection between your app or website and VoM. Talk to our sales team for a price",
    },
  ],
  close: {
    line: "Try VoM free. No credit card needed",
    register: "Register now",
    demo: "Book a demo",
  },
  seo: {
    title: `VoM Pricing | Accounting Software Plans from SAR ${f(flexRates.firstUser)} a Month`,
    description: `Compare VoM plans: Flex starts at SAR ${f(flexRates.firstUser)} a month and you pay as you go; Advanced is SAR ${f(advanced)} and Unlimited SAR ${f(unlimited)} a year`,
  },
};
