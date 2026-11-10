import type { FeaturesCopy } from "./types";

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/**
 * The old English features page, rewritten natively with the same entries in the
 * same order, plus the owner's additions of 2026-11-10 (VoM Pay, the API, the
 * Android app). The VoM Pay post is Arabic only, so the English entry has no link.
 */
export const featuresEn: FeaturesCopy = {
  seo: {
    title: "VoM features | ZATCA-approved cloud accounting software",
    description:
      "Everything VoM does for your business: ZATCA-approved e-invoicing, purchases and stock, accounting and fixed assets, payroll, 14 ready reports, and apps for iOS and Android.",
  },
  crumb: "Features",
  h1: "VoM features",
  subline: "Every service and feature your business needs to run its accounting from start to finish",
  lede: "See what VoM does, and how each feature fits the way your business already works.",
  register: "Register now",
  demo: "Book a demo",
  contents: {
    title: "What VoM offers",
    label: "Feature sections",
    sections: (n) => plural(n, "section", "sections"),
    entries: (n) => plural(n, "entry", "entries"),
  },
  ledger: { entry: "Entry", limit: "Limit", unlimited: "Unlimited", plan: "Depends on your plan" },
  sheets: { of: "Attachment {n} of {total}", prev: "Previous attachment", next: "Next attachment" },
  modules: [
    {
      id: "sales",
      title: "Sales and e-invoicing",
      entries: [
        { text: "Keep your customer list, and import it from an Excel sheet in one go", unlimited: true },
        { text: "Issue tax and simplified e-invoices approved by ZATCA, each with its QR code", unlimited: true, plan: true },
        { text: "Send invoices to your customers straight from the system", unlimited: true, plan: true },
        { text: "Track what each customer has paid, with reminders from the notification centre" },
        { text: "Send the invoice with a VoM Pay link, so your customer pays by mada, Visa, Mastercard or Apple Pay" },
      ],
    },
    {
      id: "purchases",
      title: "Purchases and expenses",
      entries: [
        { text: "Build your supplier list, or import it from Excel in a single step", unlimited: true },
        { text: "Record purchases and expenses quickly, and repeat any that recur", plan: true },
        { text: "Add purchased quantities to your products and keep your stock up to date" },
        { text: "Track what you owe each supplier, with reminders when a payment is only partly made" },
      ],
    },
    {
      id: "products",
      title: "Products and services",
      entries: [
        { text: "Add products and services, and import them from Excel", unlimited: true },
        { text: "Set a minimum quantity for each product, and get a reminder when it is time to reorder" },
        { text: "Group your products into categories", unlimited: true },
        { text: "Add units of measure", unlimited: true },
      ],
    },
    {
      id: "accounting",
      title: "Accounting and fixed assets",
      entries: [
        {
          text: "Start from a ready chart of accounts, add and change main and sub-accounts at any depth, and import opening balances from Excel",
          unlimited: true,
        },
        { text: "Post journal entries with every supporting document attached", plan: true },
        { text: "Manage every fixed asset through depreciation, upgrades and sale, with detailed reports", plan: true },
        { text: "Add every cost centre in your business, and report on each one", unlimited: true, plan: true },
        { text: "Filter entries by amount, date or transaction type to find one fast" },
      ],
    },
    {
      id: "hr",
      title: "Human resources",
      entries: [
        { text: "Register your employees with their salaries", unlimited: true },
        { text: "Run the monthly payroll on its payment date" },
      ],
    },
    {
      id: "templates",
      title: "Invoice templates",
      entries: [
        { text: "10 invoice templates to choose from", plan: true },
        { text: "Put your bank account details on the invoice" },
        { text: "Match the invoice colour to your brand" },
        { text: "Choose which details your customer sees and which stay hidden" },
        { text: "Add terms, conditions and notes to your templates" },
      ],
    },
    { id: "reports", title: "Reports", entries: [] },
    {
      id: "permissions",
      title: "Users and permissions",
      entries: [
        { text: "Add employees as users, each able to do what their role allows", plan: true },
        {
          text: "Give each role its own permissions to keep work moving: sales staff issue quotations, for example, while the accountant issues the invoice",
        },
        { text: "Account admins can follow each employee's activity log" },
      ],
    },
    {
      id: "apps",
      title: "Integrations",
      intro: "Connect these apps to VoM and your sales and purchases sync on their own",
      entries: [],
    },
    {
      id: "support",
      title: "Customer support",
      entries: [
        { text: "Full business support" },
        { text: "Guides and videos that show you how the system works" },
        { text: "Free onboarding" },
        { text: "Free updates, all the time" },
      ],
    },
    {
      id: "general",
      title: "General features",
      entries: [
        { text: "Real-time, automatic financial analysis" },
        { text: "Export all your reports and records in several formats" },
        { text: "An easy, smooth experience" },
        { text: "Filter every module by date and transaction type" },
        { text: "Apps for iOS and Android" },
        { text: "Strong data security and automatic archiving" },
        { text: "Attach documents to every transaction" },
      ],
    },
  ],
  captions: {
    "sales-invoice": "A tax invoice with its QR code, as your customer receives it",
    "sales-status": "Sales invoices filtered by payment status: paid, on credit, due, overdue",
    "sales-reminders": "The notification centre reminding you of invoices your customers owe",
    "purchases-expenses": "The expenses list, with dates, cost centres and amounts",
    "products-add": "Adding a product, service, expense or bundle, or importing them from Excel",
    "products-categories": "A new category, named in Arabic and English",
    "products-units": "A new unit of measure",
    "accounting-chart": "The chart of accounts with its codes and balances",
    "accounting-entries": "Journal entries, with copying an entry one click away",
    "accounting-assets": "Fixed assets, each with its value and depreciation",
    "hr-employees": "Adding an employee with their salary",
    "hr-payroll": "The payroll with its payment date",
    "hr-positions": "Adding a job title",
    "templates-design": "Choosing the invoice's template, colour and the details it shows",
    "templates-bank": "Payment details on the invoice: bank, account name and IBAN",
    "templates-terms": "The terms and conditions editor in the invoice template",
    "permissions-roles": "Each role's permissions in every module: view, add, edit, export, delete",
    "permissions-users": "Adding a user and setting their permissions",
    "reports-dashboard": "Reports in VoM, exported to PDF and Excel",
  },
  photos: {
    sales: "A Saudi man working on his laptop",
    purchases: "A Saudi woman working on her laptop",
    app: "A hand holding a phone with the VoM app open",
  },
  reports: {
    featured: [
      {
        name: "Income statement",
        body: "Generate it automatically for the whole financial year or any period you choose, and compare months or periods side by side to see each month's net profit or loss. Export it to PDF or Excel.",
      },
      {
        name: "Trial balance",
        body: "Generate it automatically for the whole financial year or any period you choose, and export it to PDF, Excel and more.",
      },
      {
        name: "VAT report",
        body: "Generate it automatically for any period or every quarter, laid out the way ZATCA asks for it, and export it to PDF or Excel.",
      },
    ],
    indexHeading: "And eleven more",
    index: [
      "Account statement",
      "Account summary",
      "Cash flow (direct)",
      "Cash flow (indirect)",
      "Sales report",
      "Purchases report",
      "Cost centres",
      "Fixed assets",
      "General ledger",
      "Balance sheet",
      "Journal entries report",
    ],
  },
  apps: {
    names: { foodics: "Foodics", zid: "Zid", marn: "Marn", prexle: "Prexle" },
    details: "How it connects",
    api: { text: "An open API, so any other system can connect to VoM", plan: true },
    docs: "Developer docs",
  },
  support: { heading: "Talk to us", whatsapp: "WhatsApp", email: "Email" },
  app: { line: "Get the app on your phone now", ios: "Download on the App Store", android: "Get it on Google Play" },
  planNote: {
    text: "These entries depend on your plan: how many documents, users and templates it includes, and whether it has fixed assets, integrations and the API.",
    link: "Compare plans",
  },
  close: {
    line: "Try VoM free for seven days, with no credit card.",
    register: "Register now",
    demo: "Book a demo",
  },
  newTab: "(opens in a new tab)",
};
