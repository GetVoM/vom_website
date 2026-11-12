/**
 * The English ZATCA Phase 2 page, getvom.com/en/zatca-e-invoicing-phase-2/,
 * read from the mirrored WordPress page (Elementor page 13954) on 2026-11-12.
 * English only; its Arabic twin is the e-invoicing hub (lib/i18n/routes.ts
 * `zatcaPhase2Paths`, owner 2026-11-12). Its form posts to the leads backend
 * as `zatca-e-invoicing-phase-2` (lib/leads/zatca-phase-2.ts).
 *
 * The copy is the old page's, one to one, with the typo and punctuation fixes
 * logged in docs/content/zatca-phase-2-text-changes.md. The title and
 * description are new (the old ones were the Arabic blog's), and so is the
 * second "How…" heading (owner, 2026-11-12). Strings marked "new" did not
 * exist on the old page and await the owner's approval.
 */

const dir = "/zatca-phase-2";

export interface PageImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** A heading with the words the old page set in its accent colour: [before, accent, after]. */
export type AccentHeading = readonly [before: string, accent: string, after: string];

/** One of the page's 256 px icons; decorative, beside a text that says the same. */
const icon = (name: string) => ({ src: `${dir}/icon-${name}.webp`, width: 256, height: 256 });

const photo = (name: string, width: number, height: number, alt: string): PageImage => ({ src: `${dir}/${name}.webp`, width, height, alt });

export const zatcaPhase2 = {
  path: "/zatca-e-invoicing-phase-2/",
  /** New (owner, 2026-11-12): the old page's title and description were the Arabic blog's. */
  seoTitle: "ZATCA E-Invoicing Phase 2: The Integration Phase | VoM",
  description:
    "What ZATCA's second e-invoicing phase requires, how to connect to Fatoora step by step, and how VoM submits your tax and simplified invoices for you.",
  ogImage: "/og/zatca-phase-2-en.png",
  /** The breadcrumb's name for the page. */
  crumb: "ZATCA Phase 2 e-invoicing",

  h1: "Integration Phase",
  /** ZATCA's bilingual "Phase 2 e-invoicing" mark; on the old page it sat beside the VoM logo. */
  badge: photo("badge", 1600, 384, "Zakat, Tax and Customs Authority: Phase 2 e-invoicing"),
  lede: "The second phase of electronic invoicing integration with direct submission to the Zakat, Tax, and Customs Authority.",

  what: {
    heading: ["What is the ", "Second Phase", " of Electronic Invoicing?"] as AccentHeading,
    body: "The second phase, known as the integration phase, requires linking the taxpayer’s electronic invoicing systems with the Zakat, Tax, and Customs Authority system (Fatoora platform). Electronic invoices must be issued in the required format. It will be implemented gradually, and taxpayers will be notified by the Zakat, Tax, and Customs Authority of the second phase at least 6 months in advance.",
    image: photo("laptop", 1600, 810, "VoM’s dashboard on a laptop, with a Phase 2 e-invoice in front of it"),
  },

  importance: {
    heading: ["Importance of the ", "Second Phase", " of Electronic Invoicing"] as AccentHeading,
    body: "This phase adds more transparency and accuracy to financial reporting processes, enhancing confidence in the business environment and facilitating business operations in general.",
  },

  readiness: {
    heading: ["Readiness Conditions for Any Facility for the ", "Second Phase", " of Electronic Invoicing"] as AccentHeading,
    items: [
      {
        title: "Approval",
        body: [
          "Use an electronic accounting software with a billing system that complies with the Kingdom’s second-phase electronic invoicing requirements. This system should be capable of issuing and storing invoices in XML or PDF/A-3 format, including XML data and all required fields.",
          "Ensure the accounting software and billing system are cloud-based and internet-connected",
        ],
        icon: icon("approval"),
      },
      { title: "Integrate", body: ["Integrate invoices with the “Fatoora” platform launched by the Zakat, Tax, and Customs Authority."], icon: icon("integrate") },
      {
        title: "Commitment",
        body: ["Adhere to data security standards in the Kingdom, including the inclusion of a Quick Response (QR) Code on invoices to prevent forgery or manipulation"],
        icon: icon("commitment"),
      },
    ],
  },

  requirements: {
    heading: ["Requirements for Electronic Invoicing in the ", "Second Phase", ""] as AccentHeading,
    items: [
      {
        title: "Ensure",
        body: "Ensure that the technical solution of the establishment complies with all electronic invoicing requirements, including verification of internet connectivity capability",
        photo: photo("ensure", 1535, 567, "Hands typing on a smartphone"),
      },
      {
        title: "Enhance",
        body: "Enhance integration and linkage between the electronic invoicing technical solution and the “Fatoora” system of the authority",
        photo: photo("enhance", 1535, 567, "Someone typing on an open laptop held in one arm"),
      },
      {
        title: "Issue",
        body: "Issue and store electronic invoices according to the specified format (XML) or (PDF/A-3, including XML format)",
        photo: photo("issue", 1536, 565, "Hands holding printed sheets of figures"),
      },
      {
        title: "Comply",
        body: "Comply with the technical and technological specifications of the second phase of electronic invoicing (Fatoora)",
        photo: photo("comply", 1538, 565, "Someone writing in a notebook at a desk"),
      },
    ],
  },

  start: {
    heading: ["How to Get Started in the ", "Second Phase", "?"] as AccentHeading,
    /** Only the first step had a title on the old page. */
    steps: [
      { title: "Taxpayers Notification", body: "The Zakat, Tax, and Customs Authority notifies taxpayers about the wave of linking and integration specific to them", icon: icon("notify") },
      { body: "Accessing the taxpayer portal.", icon: icon("portal") },
      { body: "Clicking on the “Fatoora platform” icon.", icon: icon("fatoora") },
      { body: "Clicking on setting up the electronic invoicing solution.", icon: icon("setup") },
      { body: "Generate OTP", icon: icon("otp-generate") },
      { body: "Insert OTP in your accounting service provider", icon: icon("otp-insert") },
      { body: "After setting up the device, the taxpayer begins generating invoices", icon: icon("invoicing") },
    ] as { title?: string; body: string; icon: ReturnType<typeof icon> }[],
  },

  mechanism: {
    /** Renamed (owner, 2026-11-12): the old page repeated "How to Get Started in the Second Phase ?" here. */
    heading: ["How Does the ", "Second Phase", " Work?"] as AccentHeading,
    intro: "Some wonder about the mechanism of operation of the second phase of electronic invoicing. Below, we’ll provide a simple explanation along with the differences.",
    flows: [
      {
        title: "Tax Invoices",
        intro: "The mechanism of electronic invoicing for tax invoices often involves linking and integrating between one establishment and another in the second phase.",
        steps: [
          { body: "The seller issues the electronic invoice containing all elements of the tax invoice.", icon: icon("seller") },
          {
            body: "The seller shares the invoice with the Zakat, Tax, and Customs Authority through electronic linking for approval by the authority, and then resends the invoice to the seller after electronic approval.",
            icon: icon("authority"),
          },
          { body: "The seller shares the electronically approved invoice from the authority with the buyer in a readable format.", icon: icon("buyer") },
          { body: "The seller electronically stores the invoice.", icon: icon("stored") },
        ],
      },
      {
        title: "Simplified Tax Invoices",
        intro: "The mechanism of electronic invoicing for simplified tax invoices often involves linking and integrating between one establishment and another in the second phase.",
        steps: [
          { body: "The seller issues the electronic invoice containing all elements of the simplified tax invoice.", icon: icon("seller") },
          { body: "The seller delivers the invoice to the buyer.", icon: icon("buyer") },
          { body: "The seller electronically stores the invoice.", icon: icon("stored") },
          {
            body: "The seller shares the invoice with the authority within a timeframe not exceeding 24 hours, automatically through linking their technical solution with the “Fatoora” platform.",
            icon: icon("authority"),
          },
        ],
      },
    ],
  },

  vom: {
    heading: ["Features of Integrating the ", "Second Phase", " of Electronic Invoicing with VoM"] as AccentHeading,
    intro: "The second phase of integration with the Zakat, Tax, and Customs Authority is an important step towards facilitating your business operations and enhancing compliance.",
    helpHeading: ["How Does ", "VoM", " Help You Integrate With the Zakat, Tax, and Customs Authority?"] as AccentHeading,
    items: [
      {
        title: "Facilitating the Submission Process",
        body: "All taxpayers can now submit their invoices easily to the Zakat, Tax, and Customs Authority through the VoM accounting software, while saving time and effort as VoM ensures invoice submission according to the required schedule and revenue classification.",
      },
      {
        title: "Smooth Invoice Submission",
        body: "Our clients can now smoothly submit invoices, whether tax invoices or simplified tax invoices, directly through the integrated VoM accounting software.",
      },
      {
        title: "Ease of Handling Debit and Credit Notifications",
        body: "VoM users can partially or fully use debit and credit notifications in their invoices. They are sent to the Zakat, Tax, and Customs Authority according to its requirements, ensuring complete transparency and accuracy.",
      },
      {
        title: "Immediate Support in Case of Non-submission",
        body: "We deal with submission issues as quickly as possible, as our VoM accounting software automatically resubmits invoices in case of non-submission.",
      },
      {
        title: "Simplifying Operations",
        body: "The VoM accounting platform primarily aims to simplify dealing with all settings related to electronic invoices, providing customers with ease of use and ensuring compliance with ZATCA regulations.",
      },
    ],
  },

  closing: {
    body: "We are here to ensure a stress-free and successful experience. Join us today and enjoy the great benefits offered by the second phase “Integration Phase” with the Zakat, Tax, and Customs Authority.",
    call: "Book a call to learn more",
  },
  /** Read after a link that opens in a new tab; never shown. The site's wording. */
  newTab: "(opens in a new tab)",

  /** The old page's sign-up button, under three sections and at the close (site.signup.en). */
  register: "Register Now",

  form: {
    /** The old placeholders, now the labels; the example number stays as the mobile's placeholder. */
    name: "Full Name",
    phone: "Phone",
    phonePlaceholder: "0512345678",
    /** «Regester Now» on the old page. */
    submit: "Register Now",
    /** new */
    sending: "Sending…",
    /** new */
    errors: {
      name: "Enter your full name.",
      phone: "Enter a 10-digit Saudi mobile number starting with 05, like 0512345678.",
      network: "We couldn’t send your details just now. Check your connection and try again, or message us on WhatsApp.",
    },
    /** new */
    thanks: {
      heading: "Thank you, we have your details.",
      body: "Our team will contact you as soon as possible.",
      whatsapp: "Need a faster reply? Message us on WhatsApp",
    },
  },
} as const;
