import type { InvoiceTemplatesCopy } from "./types";

/**
 * The old English page, rewritten natively with its meaning kept. Its SEO title
 * and description were the blog's Arabic defaults (a WordPress slip), so both
 * are new; its six cards all read "Sales Invoice", so the names mirror the
 * Arabic cards (owner, 2026-11-11). The H1 keeps the old page's wording, which
 * the owner also chose for the nav link. The files are Arabic documents, and the
 * page says so.
 */
export const invoiceTemplatesEn: InvoiceTemplatesCopy = {
  seo: {
    title: "Free Invoice Templates: Word and PDF Downloads | VoM",
    description:
      "Six free invoice and quotation templates you can customise, ready to download in Word or PDF and print. Need ZATCA e-invoices? Try VoM for free.",
  },
  published: "2023-10-13T13:06:43+00:00",
  modified: "2025-08-25T04:20:28+00:00",
  crumb: "Invoice templates",
  h1: "Free Invoices Templates",
  intro:
    "At VoM, we know that professional invoices are a big part of running your business well. To make them easier, here is a selection of high-quality invoice templates you can customise, completely free.",
  note: {
    statement: "Please note: these templates don't support e-invoicing.",
    offer: "If you're looking for e-invoices, you can try VoM here for free.",
  },
  register: "Register now",
  paperLine: "6 templates to print · Word and PDF",
  heroAlt: "Invoice templates: two pages of a sales invoice template in a green and orange design",
  record: {
    alt: "A tax invoice issued in VoM with a QR code: seller and customer details, the service line, VAT and the total",
    caption: "A tax invoice issued in VoM · sample data",
  },
  h2: "Our free templates collection",
  templates: {
    sales: { name: "Sales invoice template", alt: "A sales invoice design with light blue bars, full page" },
    tax: { name: "Tax invoice template", alt: "A sales invoice design with a green and orange header, full page" },
    "e-invoice": { name: "E-invoice template", alt: "A sales invoice design with a green frame and a rounded table, full page" },
    business: { name: "Business invoice template", alt: "A sales invoice design with a blue block for the company details, full page" },
    quote: { name: "Sales quotation", alt: "A sales invoice design with an orange border, full page" },
    "company-quote": { name: "Quotation template for companies", alt: "A grey sales invoice design with a dark table, full page" },
  },
  download: {
    word: "Word",
    pdf: "PDF",
    lead: (name) => `Download the ${name.charAt(0).toLowerCase()}${name.slice(1)} as `,
  },
  filesNote: "All six templates are Arabic documents.",
  createOnline: "Create online",
  close: {
    line: "Looking for e-invoices? Issue them in VoM, approved by ZATCA.",
    cta: "Start a 7-day free trial",
  },
};
