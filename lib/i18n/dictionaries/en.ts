import type { Dictionary } from "./types";

export const en: Dictionary = {
  brand: {
    name: "VoM",
    tagline: "The easiest accounting software in Saudi Arabia",
    description:
      "VoM is a Saudi cloud accounting platform approved by the Zakat, Tax and Customs Authority. It issues ZATCA Phase 2 e-invoices and gives small and mid-sized businesses live financial reports.",
  },
  nav: {
    home: "Home",
    breadcrumb: "Breadcrumb",
    features: "Features",
    sectors: "Industries",
    pricing: "Pricing",
    einvoicing: "E-invoicing",
    blog: "Blog",
    login: "Log in",
    start: "Start free",
    switchLocale: "العربية",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    tierLight: "Your books, kept.",
    tierBold: "Your invoices, approved by ZATCA.",
    body: "VoM issues your e-invoices with the approved QR code, reports them to the Zakat, Tax and Customs Authority the moment they are created, and keeps your financial reports current. No accountant required, no complexity.",
    primary: "Start your free trial",
    secondary: "Book a demo",
    proof: "No credit card. More than 4,000 Saudi businesses run on VoM.",
    demoLabel: "Sample data",
  },
  invoice: {
    kind: "Simplified tax invoice",
    seller: "Al Diwaniya Restaurant",
    vatNumber: "VAT number",
    date: "Date",
    items: [
      ["Lamb kabsa", "2", "90.00"],
      ["Fattoush salad", "1", "22.00"],
      ["Mineral water", "3", "9.00"],
    ],
    subtotal: "Subtotal",
    vat: "VAT 15%",
    total: "Total",
    reported: "Reported to ZATCA",
  },
  certificate: {
    title: "Certificate of compliance",
    establishment: "Establishment",
    status: "Status",
    statusValue: "Phase 2 compliant",
    lastInvoice: "Last reported invoice",
    sealTop: "Zakat, Tax and Customs Authority",
    sealMain: "Approved",
    serial: "Document no.",
  },
  report: {
    title: "Income statement",
    rows: [
      ["Revenue", "184,300"],
      ["Cost of sales", "(96,120)"],
      ["Expenses", "(64,700)"],
    ],
    net: "Net profit",
    netValue: "23,480",
  },
  month: {
    heading: "Every invoice in its place, and you always know where you are in the month.",
    legendOn: "Day with reported invoices",
    legendToday: "Today",
    label: "October 2026",
  },
  steps: {
    heading: "From sale to report in three steps, with the Authority receiving its copy on the way.",
    body: "Every transaction in VoM takes this path. You only write the first line.",
    items: [
      {
        title: "Record the sale",
        body: "From your phone, browser or point of sale, or let Foodics, Zid, Marn and Prexle send it automatically.",
      },
      {
        title: "The e-invoice is issued",
        body: "A tax or simplified invoice with the approved QR code, reported to the Fatoora platform at the same moment.",
      },
      {
        title: "Your report updates",
        body: "Income statement, balance sheet and VAT return, current to the minute, without opening a single spreadsheet.",
      },
    ],
    panels: {
      sale: { title: "New sale", customer: "Customer", amount: "Amount", method: "Payment", methodValue: "mada", button: "Issue invoice" },
      invoice: { title: "E-invoice", status: "Approved", qr: "QR code" },
      report: { title: "Live report", period: "This month" },
    },
  },
  zatca: {
    heading: "Ready for Phase 2 of e-invoicing.",
    body: "VoM is integrated directly with the Fatoora platform. Every invoice it issues carries the approved QR code and is reported or cleared according to its type, with no step from you.",
    cta: "Phase 2 guide",
    types: [
      { title: "Tax invoice", body: "Cleared by the Authority before you share it with the customer." },
      { title: "Simplified invoice", body: "Reported within 24 hours, with the QR code on it from the moment of issue." },
      { title: "Credit and debit notes", body: "For returns and corrections, linked to the original invoice." },
    ],
    timeline: [
      { date: "4 December 2021", label: "Phase 1: invoices issued electronically" },
      { date: "1 January 2023", label: "Phase 2: integration with Fatoora, in waves" },
      { date: "Today", label: "VoM is ready for your wave" },
    ],
  },
  sectors: {
    heading: "Fifteen industries, each with a page on how VoM works there.",
    all: "All industries",
    items: [
      { slug: "accounting-software-for-food-and-beverages-2", name: "Restaurants and cafés", icon: "utensils" },
      { slug: "accounting-software-for-beauty-salons", name: "Beauty salons", icon: "scissors" },
      { slug: "accounting-software-for-gym-and-fitness-centers", name: "Gyms and fitness", icon: "dumbbell" },
      { slug: "accounting-software-for-law-firms-2", name: "Law firms", icon: "scale" },
      { slug: "accounting-software-for-design-offices", name: "Design offices", icon: "pen" },
      { slug: "accounting-software-for-marketing-agencies-2", name: "Marketing agencies", icon: "megaphone" },
      { slug: "accounting-software-for-logistical-services-2", name: "Logistics", icon: "truck" },
      { slug: "accounting-software-for-travel-and-tourism", name: "Travel and tourism", icon: "plane" },
      { slug: "accounting-software-for-car-maintenance-centers-en", name: "Car maintenance", icon: "car" },
      { slug: "accounting-software-for-applications-and-ecommerce-2", name: "Apps and e-commerce", icon: "cart" },
      { slug: "accounting-software-for-perfume-stores-2", name: "Perfume stores", icon: "spray" },
      { slug: "accounting-software-for-real-estate-and-construction-2", name: "Real estate and construction", icon: "building" },
      { slug: "accounting-software-for-investment-firms-2", name: "Investment firms", icon: "chart" },
      { slug: "accounting-software-for-printing-and-advertising-agencies-2", name: "Printing and advertising", icon: "printer" },
      { slug: "accounting-software-for-day-care-centers-2", name: "Day care", icon: "baby" },
    ],
  },
  integrations: {
    heading: "Posted automatically from the systems you already use.",
    items: [
      { name: "Foodics", body: "Restaurant sales arrive as invoices" },
      { name: "Zid", body: "Store orders become entries" },
      { name: "Marn", body: "Point of sale" },
      { name: "Prexle", body: "Cashier" },
      { name: "API", body: "Any other system" },
    ],
  },
  resources: {
    heading: "Guides and tools written by accountants and reviewed by a chartered accountant.",
    all: "All articles and tools",
    guide: "Guide",
    tool: "Tool",
    template: "Template",
    readMinutes: "min read",
    items: [
      { kind: "guide", title: "ZATCA e-invoicing Phase 2: what changes and how to prepare", href: "/zatca-e-invoicing-phase-2/", minutes: 10 },
      { kind: "guide", title: "Sales invoices in VoM", href: "/sales-invoices/", minutes: 6 },
      { kind: "template", title: "Tax invoice template, ready to download", href: "/templates/", minutes: 0 },
    ],
  },
  vat: {
    title: "VAT calculator",
    amount: "Amount",
    rate: "VAT rate",
    inclusive: "Amount includes VAT",
    net: "Before VAT",
    tax: "VAT",
    gross: "Total",
    currency: "SAR",
    more: "All calculators",
  },
  faq: {
    heading: "Questions business owners ask before they start.",
    items: [
      {
        q: "What is VoM?",
        a: "VoM is a Saudi cloud accounting platform for small and mid-sized businesses. It issues e-invoices approved by the Zakat, Tax and Customs Authority, manages sales, purchases, expenses, inventory and assets, and gives you financial reports in real time.",
      },
      {
        q: "Is VoM approved by ZATCA?",
        a: "Yes. VoM is integrated directly with the Fatoora platform for Phase 2 of e-invoicing. It issues tax and simplified invoices with the approved QR code and reports or clears them automatically according to their type.",
      },
      {
        q: "Do I need an accountant to use it?",
        a: "No. VoM is designed for the business owner: a ready chart of accounts, entries posted automatically and readable reports. If you do have an accountant, they work on the same account with their own permissions.",
      },
      {
        q: "How much does VoM cost?",
        a: "The Advanced plan starts at 270 SAR per month and the Unlimited plan at 350 SAR per month; for the Business plan, contact sales. Annual billing gives you two months free, and the free trial needs no credit card.",
      },
      {
        q: "Does VoM work on mobile?",
        a: "Yes. Manage your books from the browser on any device and from the VoM app on iOS, with sales posted automatically from Foodics, Zid, Marn and Prexle.",
      },
    ],
  },
  closing: {
    heading: "Issue your business's certificate and start free.",
    body: "Type your business name to see its certificate, then start your free trial. No credit card.",
    inputLabel: "Your business name",
    placeholder: "Example: Al Diwaniya Restaurant",
    cta: "Issue the certificate and start free",
    pricingLine: "Advanced from 270 SAR a month, Unlimited from 350 SAR. Two months free on annual billing.",
    compare: "Compare plans",
    defaultName: "Your business",
  },
  footer: {
    about: "Saudi cloud accounting software, approved by the Zakat, Tax and Customs Authority. Since 2021.",
    product: "Product",
    support: "Resources",
    company: "VoM",
    links: {
      product: [
        ["Features", "/features-en/"],
        ["Pricing", "/pricing-en/"],
        ["Marketplace", "/vom-foodics-2/"],
        ["API documentation", "https://app.getvom.com/en/docs/api"],
      ],
      support: [
        ["Blog", "/blog-en/"],
        ["ZATCA Phase 2", "/zatca-e-invoicing-phase-2/"],
        ["Sales invoices", "/sales-invoices/"],
        ["Student package", "/student-package-2/"],
      ],
      company: [
        ["About", "/about-us/"],
        ["Contact", "/contact-us/"],
        ["Naming philosophy", "/naming-philosophy/"],
        ["Terms and conditions", "/terms-and-conditions/"],
      ],
    },
    approved: "Approved by the Zakat, Tax and Customs Authority",
    rights: "All rights reserved",
    appStore: "Download on the App Store",
  },
  numbers: {
    heading: "VoM in numbers, as recorded.",
    body: "Saudi businesses issue their invoices from VoM every day, and the Authority receives them at the same moment.",
    asOf: "As of October 2026",
    items: [
      { value: 5000, suffix: "+", unit: "", label: "businesses run on VoM" },
      { value: 1, suffix: "+", unit: "billion SAR", label: "in invoices issued" },
      { value: 10, suffix: "", unit: "", label: "integrations with the systems you use" },
    ],
  },
  clients: {
    heading: "Trusted by business owners in every sector.",
    body: "From a single-branch restaurant to a law office with dozens of clients.",
    count: "More than 5,000 businesses",
    note: "Placeholder logos",
  },
  testimonials: {
    heading: "What daily users say.",
    body: "Business owners and accountants who run their books on VoM.",
    prev: "Previous",
    next: "Next",
    slideOf: "of",
  },
  integrationsSection: {
    heading: "Integrates with the systems you already run.",
    body: "Your sales, payments and stock flow into VoM on their own, and out come reported invoices and current reports.",
    live: "Live",
    soon: "Coming soon",
    api: "Open API",
    apiBody: "Any other system connects to VoM through a documented API.",
    docs: "Developer docs",
    details: {
      clients: "businesses use it with VoM",
      invoices: "invoices posted per month",
      sync: "sync time",
      how: "How the integration works",
      activate: "Enable the integration",
      waitlist: "businesses on the waitlist",
      flow: ["The sale", "VoM", "ZATCA"],
    },
  },
  reports: {
    heading: "More than 14 ready reports, current to the minute.",
    body: "No month-end wait and no spreadsheet to build. Every report your accountant, auditor or bank asks for is here, read from the same entries.",
    countLabel: "reports",
    live: "Live now",
    items: ["VAT return", "Income statement", "Balance sheet", "Cash flow", "Trial balance", "General ledger", "Account statement", "Receivables ageing", "Sales report", "Purchases report", "Cost centres", "Journal entries", "Fixed assets", "Inventory report"],
    cta: "All reports",
  },
  features: {
    heading: "Everything your business needs, in one program.",
    body: "From the first quote to the last closing entry. These are the highlights; the full list is longer.",
    cta: "All features",
    items: [
      { title: "Sales and e-invoicing", body: "Quotes, tax and simplified invoices with QR codes, credit notes, collection tracking, and a payment link on every invoice.", icon: "receipt" },
      { title: "Purchases and expenses", body: "Record a supplier invoice from a photo, track partial payments, and repeat fixed expenses automatically.", icon: "wallet" },
      { title: "Inventory", body: "Unlimited products and services, a minimum-stock alert before you run out, and periodic stocktakes.", icon: "box" },
      { title: "Accounting and assets", body: "A ready chart of accounts, entries with attached documents, cost centres, and automatic depreciation.", icon: "layers" },
      { title: "People and payroll", body: "Employee files, payroll runs, advances and deductions, and payroll entries in one click.", icon: "users" },
      { title: "Reports", body: "More than 14 reports, exported to PDF and Excel, shared with your accountant on read-only access.", icon: "chart" },
      { title: "Branches and permissions", body: "Several branches in one account, precise permissions for every employee and accountant, and a log of every change and who made it.", icon: "building" },
      { title: "Payment links and collection", body: "A payment link on every invoice with mada and Apple Pay, automatic reminders for what is due, and collected amounts reconciled as they arrive.", icon: "card" },
    ],
  },
  apps: {
    heading: "Your books in your pocket, on iOS and Android.",
    body: "Record the sale on the shop floor, issue the e-invoice with its QR code, and send the payment link before the customer leaves. Everything you see in the browser, you see on your phone.",
    ios: "Download on the App Store",
    android: "Get it on Google Play",
    features: ["Issue invoices and send them on WhatsApp", "Photograph purchase invoices and book them", "Live reports wherever you are", "Instant notification on every payment"],
    screen: { title: "New invoice", subtitle: "Al Diwaniya Restaurant", amount: "263.35", button: "Issue and send", status: "Reported to ZATCA" },
  },
  contact: {
    heading: "Contact Us",
    intro: "Thank you for your interest in VoM. We value your comments, questions and requests, so please get in touch using the details here.",
    whatsappCta: "Message us on WhatsApp",
    emailCta: "Send an email",
    info: {
      heading: "Contact information",
      addressLabel: "Address",
      address: "Riyadh, Saudi Arabia",
      phoneLabel: "Phone number",
      emailLabel: "Email",
    },
    follow: {
      heading: "Follow us on social media",
      items: {
        facebook: "Facebook",
        x: "X",
        linkedin: "LinkedIn",
        instagram: "Instagram",
        tiktok: "TikTok",
        whatsapp: "WhatsApp",
      },
    },
    question: {
      heading: "Have a question or comment?",
      body: "If you have any questions or comments, don't hesitate to get in touch. Our customer support team is here to help with anything you need.",
      reply: "We strive to respond to all messages within 24 hours during our business hours.",
      sealUnit: "hours",
      sealNote: "during business hours",
    },
    seo: {
      title: "Contact Us | VoM Cloud Accounting Software in Saudi Arabia",
      description:
        "Contact the VoM team in Riyadh by phone, WhatsApp or email. We strive to respond to all messages within 24 hours during our business hours.",
    },
  },
  about: {
    crumb: "About Us",
    heading: "How It All Started",
    lede: "Accounting has never been just about numbers. It's about time, accuracy, and control.",
    figures: [
      { value: "2021", label: "launched before it was perfect", target: "launch" },
      { value: "200+", label: "user suggestions gathered", target: "feedback" },
      { value: "3", label: "months to gather and implement them", target: "feedback" },
      { value: "2", label: "weeks between every update", target: "updates" },
    ],
    problem: [
      "For years, businesses struggled with manual data entry, endless spreadsheets, and outdated systems that made financial management harder than it needed to be.",
      "When Saudi Arabia introduced electronic invoicing regulations, it was clear that businesses needed a better way to manage their finances. The challenge? Most accounting software was either too complex for small businesses or too basic to meet compliance standards. Accountants were stuck in data entry roles instead of analyzing financial trends and helping businesses grow.",
      "Business owners needed a solution that automated tasks, simplified invoicing, and offered real-time insights, without requiring an accounting degree.",
    ],
    answer: {
      heading: "That's Why We Built VoM",
      body: "A smarter, AI-driven accounting platform that makes financial management seamless, compliant, and effortless.",
    },
    story: {
      heading: "From Idea to Reality",
      rows: [
        {
          id: "launch",
          figures: [0],
          body: "We didn't wait for perfection before launching. When VoM was introduced in 2021, it was still in its early stages. But instead of assuming what businesses needed, we took a different approach: we built VoM alongside its users.",
        },
        {
          id: "feedback",
          figures: [1, 2],
          body: "In the first three months, we gathered over 200 user suggestions and implemented them at record speed. Every piece of feedback shaped the platform, ensuring that VoM wasn't just another accounting tool but a system designed to fit real-world business needs.",
          challenge: {
            heading: "The Biggest Challenge?",
            body: "Balancing compliance with ease of use. Saudi businesses needed a solution that met ZATCA's (Zakat, Tax and Customs Authority) electronic invoicing regulations without adding extra complexity.",
          },
        },
        {
          id: "updates",
          figures: [3],
          body: "Every two weeks, we release a new update. Every feature is shaped by real user feedback, and every improvement is designed to make accounting smarter and more efficient.",
        },
      ],
    },
    why: {
      heading: "That's Why We Focused on",
      items: [
        { icon: "chip", title: "AI-Powered Automation", body: "To eliminate repetitive tasks and manual errors." },
        {
          icon: "pointer", title: "An Intuitive Experience",
          body: "A user-friendly experience that lets business owners focus on growth, not paperwork.",
        },
        {
          icon: "receipt", title: "Seamless Electronic Invoicing",
          body: "Electronic invoicing that fully complies with Saudi regulations.",
        },
      ],
      result: {
        heading: "What Is the Result?",
        body: "An accounting system that simplifies procedures, speeds up performance, and gives business owners a clear financial picture, so they can focus on growing their projects with confidence.",
      },
    },
    today: {
      heading: "More Than Software: Why VoM?",
      body: [
        "We're not just another accounting platform. VoM is built for businesses that need more than bookkeeping. They need a smarter, faster way to manage their finances.",
      ],
      items: [
        { icon: "refresh", title: "Continuous Updates", body: "A new update every two weeks, shaped by real user feedback." },
        {
          icon: "chart", title: "Real-Time Insights for Business Owners",
          body: "Helping them make smarter financial decisions with confidence.",
        },
        {
          icon: "users", title: "Company Culture",
          body: "A diverse team of professionals from different backgrounds, focused on innovation, efficiency, and elevating the user experience.",
        },
      ],
    },
    statement:
      "We're not just building software. We're building a financial partner that helps businesses focus less on paperwork and more on growth. With VoM, accounting is no longer a chore. It's a competitive advantage.",
    approach: {
      heading: "Why Businesses Choose VoM",
      items: [
        { icon: "bolt", title: "AI-Powered Automation", body: "No more manual data entry." },
        { icon: "shield", title: "Effortless Compliance", body: "Stay fully aligned with Saudi tax and invoicing regulations." },
        { icon: "chart", title: "Real-Time Insights", body: "Make better decisions with up-to-date financial data." },
        { icon: "bulb", title: "Continuous Innovation", body: "We release updates every two weeks to keep VoM ahead of the curve." },
      ],
    },
    closingStatement:
      "What started as an idea has now become the go\u2060-\u2060to accounting solution for Saudi businesses, and we're just getting started.",
    vision: {
      heading: "The Future of Accounting: Our Vision",
      body: "We believe that accounting should do more than just track numbers. It should help businesses grow. Our vision at VoM is to redefine accounting for small and medium-sized businesses, making it:",
      list: [
        "Smarter: automating the repetitive work so businesses can focus on strategy.",
        "Faster: eliminating manual processes and providing real-time financial insights.",
        "Simpler: creating a platform that's easy to use, even for non-accountants.",
      ],
    },
    mission: {
      heading: "Our Mission Is Simple: Make Accounting Effortless, Accurate, and Insightful",
      body: "With VoM, businesses can:",
      list: [
        "Automate accounting tasks and save valuable time.",
        "Reduce errors with AI-driven accuracy.",
        "Stay compliant with Saudi tax and invoicing regulations.",
        "Make smarter decisions with real-time financial insights.",
      ],
    },
    values: {
      heading: "Our Core Values: The Principles Behind Every Transaction",
      intro: "At VoM, everything we do is driven by a strong foundation of values:",
      items: [
        {
          icon: "bulb",
          title: "Continuous Innovation",
          body: "We improve and enhance VoM every two weeks, ensuring businesses always have access to the latest advancements.",
        },
        {
          icon: "eye", title: "Transparency",
          body: "We provide clear, accurate financial data, empowering businesses to make confident decisions.",
        },
        {
          icon: "pointer", title: "Simplicity",
          body: "Accounting doesn't have to be complicated. We make financial management accessible and user-friendly for everyone.",
        },
        {
          icon: "shield", title: "Compliance First",
          body: "Staying ahead of regulations is a priority. VoM ensures businesses are always aligned with Saudi Arabia's tax and electronic invoicing laws.",
        },
        {
          icon: "growth", title: "Business Growth Focus",
          body: "We see accounting as more than just bookkeeping. It's a tool for scaling smarter and planning for the future.",
        },
      ],
    },
    team: {
      heading: "The Balance Sheet: Meet Our Team",
      intro:
        "Behind VoM is a team of experts dedicated to reshaping the future of accounting. We're not just developers and accountants. We're problem solvers, innovators, and strategists who believe businesses deserve better, smarter, and more intuitive financial tools.",
      outro:
        "Each team member plays a key role in balancing technology, finance, and user experience, ensuring that VoM is more than just software. It's a true partner in business success.",
      members: [
        { name: "Michael Aswad", role: "Co-Founder & CEO", photo: "/team/michael-aswad.jpg" },
        { name: "Noura Alnafea", role: "Co-Founder & COO", photo: "/team/noura-alnafea.jpg" },
        { name: "Yasmine Mokhtar", role: "Head of Development", photo: "/team/yasmine-mokhtar.jpg" },
      ],
    },
    cta: {
      heading: "Ready to Experience Smarter Accounting?",
      body: "Start today with VoM and take control of your finances efficiently, accurately, and effortlessly.",
      primary: "Register Now",
      secondary: "Book an accounting consultation",
    },
    images: {
      owner: "A delighted business owner looking at a phone beside financial charts",
      growth: "Illustration of a rocket launching from a financial dashboard",
      laptop: "A Saudi businessman holding a laptop",
      reports: "A Saudi businessman reviewing financial data on a screen",
      balance: "A current balance card with a chart",
      boardroom: "Businessmen discussing a dashboard in a boardroom",
      meeting: "A team in a meeting discussing a plan on a board",
    },
    seo: {
      title: "About Us | VoM Cloud Accounting Software in Saudi Arabia",
      description:
        "How VoM started: launched in 2021, built alongside its users and updated every two weeks. Read our vision, mission and core values, and meet the team.",
    },
  },
  terms: {
    heading: "Terms and Conditions",
    sectionCount: "{n} sections",
    noticesLabel: "Official notices:",
    contents: "Contents",
    clauseLink: "Link to clause {n}",
    seo: {
      title: "Terms and Conditions of Use | VoM Cloud Accounting",
      description:
        "The terms that govern your VoM subscription: refunds and training, your data and exports, service and support, liability, and VoM Pay terms for merchants.",
    },
  },
  seo: {
    homeTitle: "The Easiest Accounting Software in Saudi Arabia | VoM",
    homeDescription:
      "VoM is a ZATCA-approved cloud accounting platform for Saudi businesses: Phase 2 e-invoicing, sales, purchases, inventory and live financial reports. Try it free, no credit card.",
  },
};
