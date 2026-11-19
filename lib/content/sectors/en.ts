import type { SectorCopy, SectorFeature, SectorId } from "./types";

/**
 * The English sector pages: each old English page's own features and questions,
 * rewritten natively (owner, 2026-11-10). Where an old answer belonged to another
 * question, the answer now comes from the Arabic twin's facts. No article cards:
 * the English site has no blog.
 */

const reports: SectorFeature = {
  icon: "reports",
  title: "Issue financial reports",
  body: "Produce the income statement, trial balance and cash flow statement, among 17 ready reports",
};

const invoices: SectorFeature = {
  icon: "operations",
  title: "Issue e-invoices and tax reports",
  body: "Create electronic invoices with the right taxes included, and produce tax reports in summary or in full detail",
};

const attachments: SectorFeature = {
  icon: "attachments",
  title: "Keep documents attached",
  body: "Store receipts, vouchers, bank transfers and customer documents electronically, so nothing needs printing or filing on paper",
};

const expenses: SectorFeature = {
  icon: "expenses",
  title: "Record and track expenses",
  body: "Record every expense, from rent and electricity to government fees and salaries, and add tax as you go so your VAT report is complete and accurate",
};

const customers: SectorFeature = {
  icon: "customers",
  title: "Track customer payments",
  body: "See every customer invoice and whether it has been paid, is overdue or is still open, with alerts from the Notification Center",
};

const logo = (who: string) => ({
  q: "Can I put my own logo on the invoice?",
  a: `Yes. ${who} can add their own logo to invoices in VoM, and the invoice stays in line with the requirements of the Zakat, Tax and Customs Authority (ZATCA)`,
});

const roles = (who: string) => ({
  q: "Can I set permissions by employee role?",
  a: `Yes. ${who} can give each employee access that matches their tasks and position, so everyone reaches only the features and data they need`,
});

export const sectorsEn: Record<SectorId, SectorCopy> = {
  restaurants: {
    forName: "for restaurants and cafés",
    lede: "VoM gives restaurants and cafés features that sharpen their accounting, with precise financial reports any time, anywhere",
    photoAlt: "Diners at tables in a busy restaurant and café",
    features: [
      {
        icon: "connect",
        title: "Connect your point of sale",
        body: "Link VoM to your POS so orders, both sales and purchases, post automatically as journal entries, with no developer or extra accountant needed",
      },
      {
        icon: "customers",
        title: "Track suppliers",
        body: "Follow each supplier's standing in VoM and record payments with payment vouchers to produce a statement of account for every supplier. Connected to a POS, future supplier orders are entered automatically",
      },
      {
        icon: "expenses",
        title: "Record and track expenses",
        body: "Record every expense, such as rent, electricity, government fees and salaries, so tax is worked out as you go and your VAT reports stay precise and complete",
      },
      reports,
    ],
    clientsHeading: "Our restaurant and café clients",
    close: "Restaurants and cafés run on one connected system of features and apps, built to help them grow",
    faq: [
      {
        q: "Can I use VoM across several branches?",
        a: "Yes. Add each branch as its own cost center to track its revenue and expenses, then report on every branch and everything that happens in it",
      },
      {
        q: "Can I set access by employee role?",
        a: "Yes. You set each person's permissions to match their responsibilities and position in your business",
      },
      {
        q: "Can VoM connect to my POS?",
        a: "Yes. VoM connects to Foodics, Marn and LazyWait, and your sales post to your books automatically",
      },
      {
        q: "Does VoM handle a restaurant's stock and warehouses?",
        a: "Yes. Keep a warehouse for the central kitchen and one for each branch, move stock between them with transfer requisitions, and set up menu items as bundles that deduct their ingredients when sold, with an alert when an item reaches its minimum",
      },
    ],
    seo: {
      title: "Accounting Software for Restaurants and Cafés | VoM",
      description:
        "Accounting software for restaurants and cafés in Saudi Arabia: connect your POS, track suppliers and expenses, and issue precise financial reports",
    },
  },

  beauty: {
    forName: "for beauty salons",
    lede: "VoM gives your beauty salon features that improve its accounting, so you can produce precise financial reports with ease and keep the business on track",
    photoAlt: "A beauty salon with hair-washing chairs and styling mirrors",
    features: [invoices, attachments, reports, expenses],
    clientsHeading: "Our beauty salon clients",
    close: "Beauty salons run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Beauty salons"),
      roles("Beauty salons"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. Beauty salons rely on VoM to handle sales, invoicing, tax and detailed reports in one place, tailored to the beauty business",
      },
      {
        q: "Can I collect payment with a link?",
        a: "Yes. Add a VoM Pay link to the invoice or the proforma, so your customer pays by mada, Visa, Mastercard or Apple Pay, and the receipt is created for you on payment",
      },
    ],
    seo: {
      title: "Accounting Software for Beauty Salons in Saudi Arabia | VoM",
      description:
        "Accounting software for beauty salons: e-invoices with tax, summary and detailed tax reports, paperless attachments, expense tracking and 17 reports",
    },
  },

  gyms: {
    forName: "for gyms and fitness centers",
    lede: "VoM gives your gym or fitness club features that improve its accounting, so you can produce precise financial reports that support your growth",
    photoAlt: "A gym floor with treadmills, weights and exercise mats",
    features: [attachments, invoices, reports, expenses],
    clientsHeading: "Our gym and fitness clients",
    close: "Gyms and fitness centers run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Gyms and fitness centers"),
      roles("Gyms and fitness centers"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM gives gyms and fitness centers full accounting for sales, invoices, tax and reports, designed with the fitness business in mind",
      },
      {
        q: "Can membership invoices go out automatically?",
        a: "Yes. Set up a recurring invoice for each membership, monthly or yearly, and it is issued on its date with nothing for you to do. Pause it whenever you like",
      },
    ],
    seo: {
      title: "Accounting Software for Gyms and Fitness Centers | VoM",
      description:
        "Accounting software for gyms and fitness centers in Saudi Arabia: e-invoices with tax, paperless attachments, expense tracking and 17 financial reports",
    },
  },

  law: {
    forName: "for law firms",
    lede: "VoM gives law firms features that strengthen their accounting, with precise financial reports from any device, at any time",
    photoAlt: "Scales of justice and a judge's gavel on a law office desk",
    features: [
      expenses,
      customers,
      reports,
      {
        icon: "operations",
        title: "Issue ZATCA-compliant e-invoices",
        body: "Create electronic invoices that comply with ZATCA, with the applicable taxes included, and produce tax reports in summary or in full detail",
      },
    ],
    clientsHeading: "Our law firm clients",
    close: "Lawyers run on one connected system of features and apps, built to help their firms grow",
    faq: [
      {
        q: "Is there a limit on the number of customers?",
        a: "No. You can add as many customers as you need",
      },
      roles("Law firms"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM gives law firms the accounting they need to manage sales, invoices and tax and to produce full reports, shaped around how a legal practice works",
      },
      {
        q: "Can I follow the fees and costs of each case separately?",
        a: "Yes. Add each case as a cost center, tag its invoices and expenses to it, and run the cost center report for that case. For retainers, a recurring invoice goes out on its date",
      },
    ],
    seo: {
      title: "Accounting Software for Law Firms in Saudi Arabia | VoM",
      description:
        "Accounting software for law firms: ZATCA-compliant e-invoices, customer payment tracking, expense records and 17 financial reports",
    },
  },

  design: {
    forName: "for design offices",
    lede: "VoM gives design offices features that improve their accounting, with accurate financial reports any time, anywhere",
    photoAlt: "A design team marking up architectural plans on a worktable",
    features: [invoices, reports, customers, expenses],
    clientsHeading: "Our design office clients",
    close: "Design offices run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Design offices"),
      roles("Design offices"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM is easy to use and helps design offices manage sales, invoices and tax and produce reports, even without much accounting experience",
      },
      {
        q: "Can I send a quotation and then turn it into an invoice?",
        a: "Yes. Write the quotation and send it to your client, then convert it to a proforma or a sales invoice without retyping it",
      },
    ],
    seo: {
      title: "Accounting Software for Design Offices in Saudi Arabia | VoM",
      description:
        "Accounting software for design offices: e-invoices with tax, summary and detailed tax reports, customer payment tracking, expenses and 17 reports",
    },
  },

  marketing: {
    forName: "for marketing agencies",
    lede: "VoM gives your agency features that strengthen its accounting, so you can produce precise financial reports with ease",
    photoAlt: "A marketing team reviewing printed charts around a table",
    features: [reports, invoices, expenses, customers],
    clientsHeading: "Our marketing agency clients",
    close: "Marketing agencies run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Marketing agencies"),
      roles("Marketing agencies"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM gives marketing agencies solid accounting to run sales, invoices and tax and to produce detailed reports for the business",
      },
      {
        q: "Can monthly retainer invoices go out automatically?",
        a: "Yes. Set up a recurring invoice for each retainer client, and follow the overdue ones in the customer ageing report",
      },
    ],
    seo: {
      title: "Accounting Software for Marketing Agencies | VoM",
      description:
        "Accounting software for marketing agencies in Saudi Arabia: e-invoices with tax, customer payment tracking, expense records and 17 financial reports",
    },
  },

  logistics: {
    forName: "for logistics companies",
    lede: "VoM gives logistics companies features that strengthen their accounting, with accurate financial reports from anywhere, at any time",
    photoAlt: "Stacked shipping containers at a port under loading cranes",
    features: [
      expenses,
      customers,
      reports,
      {
        icon: "costs",
        title: "Organize costs by project",
        body: "Set up as many cost centers as you need, follow customers with outstanding payments, and produce detailed reports on how each part of the business performs",
      },
    ],
    clientsHeading: "Our logistics clients",
    close: "Logistics companies run on one connected system of features and apps, built to help them grow",
    faq: [
      roles("Logistics companies"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM connects with your systems through its API, and handles finances, invoices, tax and the reports a logistics company needs",
      },
      {
        q: "Do you have cost centers?",
        a: "Yes, with no limit on how many you create. Track expenses by project or department and produce detailed reports for each cost center",
      },
      {
        q: "Does VoM manage the fleet as fixed assets?",
        a: "Yes, on plans that include asset management. Register each vehicle as a fixed asset, choose straight-line or declining-balance depreciation, and it is posted automatically. Upgrades and sales are recorded when they happen",
      },
    ],
    seo: {
      title: "Accounting Software for Logistics Companies | VoM",
      description:
        "Accounting software for logistics companies in Saudi Arabia: unlimited cost centers, customer payment tracking, expense records and 17 financial reports",
    },
  },

  travel: {
    forName: "for travel and tourism companies",
    lede: "VoM gives travel and tourism companies features that improve their accounting, so you can produce accurate financial reports from anywhere, at any moment",
    photoAlt: "Landmarks from around the world on a globe, with a plane flying past",
    features: [reports, attachments, expenses, invoices],
    clientsHeading: "Our travel and tourism clients",
    close: "Travel and tourism companies run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Travel and tourism companies"),
      roles("Travel and tourism companies"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM gives travel and tourism companies integrated accounting that handles finances, invoices, tax and industry reports",
      },
      {
        q: "Can I collect a booking's payment with a link?",
        a: "Yes. Send your customer a proforma or an invoice with a VoM Pay link, so they pay by mada, Visa, Mastercard or Apple Pay, and the receipt is created for you on payment",
      },
    ],
    seo: {
      title: "Accounting Software for Travel and Tourism Companies | VoM",
      description:
        "Accounting software for travel and tourism companies in Saudi Arabia: e-invoices with tax, paperless attachments, expense tracking and 17 reports",
    },
  },

  "car-care": {
    forName: "for car maintenance centers",
    lede: "VoM gives car maintenance centers features that improve their accounting, so you can produce precise financial reports from anywhere, whenever you choose",
    photoAlt: "Cars raised on lifts inside a large maintenance center",
    features: [invoices, attachments, reports, expenses],
    clientsHeading: "Our car maintenance clients",
    close: "Car maintenance centers run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Car maintenance centers"),
      roles("Car maintenance centers"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM handles sales, invoices, tax and detailed reports for car maintenance centers, tailored to the automotive trade",
      },
      {
        q: "Does VoM track spare-parts stock?",
        a: "Yes. Keep the parts in your warehouses, set a minimum for each item to be alerted when it runs low, and cost of goods sold is posted with every invoice",
      },
    ],
    seo: {
      title: "Accounting Software for Car Maintenance Centers | VoM",
      description:
        "Accounting software for car maintenance centers in Saudi Arabia: e-invoices with tax, paperless attachments, expense tracking and 17 financial reports",
    },
  },

  ecommerce: {
    forName: "for apps and online stores",
    lede: "VoM gives online stores and apps features that strengthen their accounting, so you can get accurate financial insight whenever you need it",
    photoAlt: "A hand on a computer mouse in front of screens of store data",
    features: [
      {
        icon: "connect",
        title: "Connect your online store",
        body: "Link VoM to your Zid online store so orders post automatically as journal entries, with no accountant needed in between",
      },
      {
        icon: "customers",
        title: "Track suppliers",
        body: "Follow each supplier's status and record payments with payment vouchers to produce a statement of account for every supplier",
      },
      expenses,
      reports,
    ],
    clientsHeading: "Our app and online store clients",
    close: "Online stores and apps run on one connected system of features and apps, built to help them grow",
    faq: [
      {
        q: "Is VoM right for my business?",
        a: "Yes. If you run an app or an online store, VoM handles sales, invoices, tax and reports, and you can use it from anywhere",
      },
      roles("Apps and online stores"),
      {
        q: "Can I connect VoM to my online store?",
        a: "Yes. VoM connects to your Zid store so your orders move into VoM automatically, and any other system can connect through the API",
      },
      {
        q: "Can I connect a system other than Zid?",
        a: "Yes, through the documented API, which comes with the Business plan",
      },
    ],
    seo: {
      title: "Accounting Software for Apps and Online Stores | VoM",
      description:
        "Accounting software for online stores and apps in Saudi Arabia: connect your store, track suppliers and expenses, and issue 17 financial reports",
    },
  },

  perfume: {
    forName: "for perfume stores",
    lede: "VoM gives perfume stores features that improve their accounting, so you can produce precise financial reports from any location, at any time",
    photoAlt: "Luxury perfume bottles lined up on a perfume store's shelves",
    features: [attachments, reports, expenses, invoices],
    clientsHeading: "Our perfume store clients",
    close: "Perfume stores run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Perfume stores"),
      roles("Perfume stores"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. Perfume stores use VoM to manage sales, invoices and tax and to produce the reports the fragrance trade needs",
      },
      {
        q: "Does VoM manage stock across several shops or kiosks?",
        a: "Yes. Keep a warehouse for each outlet, move stock between them with transfer requisitions, and set up gift sets as bundles that deduct their components when sold",
      },
    ],
    seo: {
      title: "Accounting Software for Perfume Stores in Saudi Arabia | VoM",
      description:
        "Accounting software for perfume stores: e-invoices with tax, summary and detailed tax reports, paperless attachments, expense tracking and 17 reports",
    },
  },

  "real-estate": {
    forName: "for real estate and construction",
    lede: "VoM gives real estate and construction companies features that improve their accounting, with precise financial reports from anywhere, at any time",
    photoAlt: "A glass tower rising into the sky, its facade reflecting the clouds",
    features: [
      {
        icon: "projects",
        title: "Add cost centers",
        body: "Set up as many cost centers as you need, one for each project",
      },
      expenses,
      {
        icon: "costs",
        title: "Organize project costs",
        body: "Follow customers with outstanding payments and produce detailed reports on how each project performs",
      },
      reports,
    ],
    clientsHeading: "Our real estate and construction clients",
    close: "Real estate and construction companies run on one connected system of features and apps, built to help them grow",
    faq: [
      {
        q: "Do you have cost centers?",
        a: "Yes. Add as many cost centers as you need and produce a detailed report for every project",
      },
      roles("Real estate and construction companies"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM gives real estate and construction companies one place to manage finances, invoices and tax and to produce the reports they need",
      },
      {
        q: "Does VoM support retention on contract work?",
        a: "Yes. Switch on retention in the accounting settings and set its percentage on the invoice; it is calculated and booked to its own account",
      },
    ],
    seo: {
      title: "Accounting Software for Real Estate and Construction | VoM",
      description:
        "Accounting software for real estate and construction in Saudi Arabia: unlimited cost centers, project cost reports, expense tracking and 17 reports",
    },
  },

  investment: {
    forName: "for investment firms",
    lede: "VoM gives investment firms features that strengthen their accounting, with precise financial reports from anywhere, at any time",
    photoAlt: "A trading screen showing a stock price chart",
    features: [invoices, attachments, reports, expenses],
    clientsHeading: "Our investment firm clients",
    close: "Investment firms run on one connected system of features and apps, built to help them grow",
    faq: [
      roles("Investment firms"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. Investment firms use VoM to track sales, manage invoices and tax and produce full reports for the investment sector",
      },
      {
        q: "Do you have cost centers?",
        a: "Yes, with no limit on how many you create. Group expenses by investment project and produce a detailed report on the finances of each one",
      },
      {
        q: "Can I compare financial statements across periods?",
        a: "Yes. Compare the income statement and the balance sheet with the previous period or with earlier months, up to 11 of them, and export them to PDF or Excel",
      },
    ],
    seo: {
      title: "Accounting Software for Investment Firms in KSA | VoM",
      description:
        "Accounting software for investment firms: e-invoices with tax, paperless attachments, unlimited cost centers, expense tracking and 17 financial reports",
    },
  },

  printing: {
    forName: "for printing and advertising companies",
    lede: "VoM gives printing and advertising companies features that improve their accounting, so you can produce accurate financial reports from any location, at any time",
    photoAlt: "A team around a table of laptops and design sketches",
    features: [reports, invoices, expenses, attachments],
    clientsHeading: "Our printing and advertising clients",
    close: "Printing and advertising companies run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Printing and advertising companies"),
      roles("Printing and advertising companies"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. VoM handles sales, invoices, tax and industry reports for printing and advertising companies, so the finances stay in order",
      },
      {
        q: "Can I send a customer a quotation and then turn it into an invoice?",
        a: "Yes. Write the quotation and send it, then convert it to a proforma or a sales invoice without retyping it, and add a payment link for the deposit",
      },
    ],
    seo: {
      title: "Accounting Software for Printing and Advertising | VoM",
      description:
        "Accounting software for printing and advertising companies in Saudi Arabia: e-invoices with tax, attachments, expense tracking and 17 financial reports",
    },
  },

  childcare: {
    forName: "for day care centers",
    lede: "VoM gives day care centers features that make the accounting simpler, with accurate financial reports any time, anywhere",
    photoAlt: "A day care room with colorful tables, chairs and toys",
    features: [reports, invoices, expenses, attachments],
    clientsHeading: "Our day care clients",
    close: "Day care centers run on one connected system of features and apps, built to help them grow",
    faq: [
      logo("Day care centers"),
      roles("Day care centers"),
      {
        q: "Is VoM right for my business?",
        a: "Yes. Day care centers rely on VoM for sales, invoicing, tax and full reports, without the accounting hassle",
      },
      {
        q: "Can monthly fee invoices go out automatically?",
        a: "Yes. Set up a recurring invoice for each child and it is issued every month on its date. Follow overdue fees in the customer ageing report",
      },
    ],
    seo: {
      title: "Accounting Software for Day Care Centers in KSA | VoM",
      description:
        "Accounting software for day care centers: e-invoices with tax, summary and detailed tax reports, paperless attachments, expense tracking and 17 reports",
    },
  },
};
