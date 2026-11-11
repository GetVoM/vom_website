/**
 * The six free invoice templates of `/نماذج-فواتير/` and `/en/sales-invoices/`,
 * in the old page's order. Both languages link the same Arabic files, kept byte
 * for byte at their WordPress URLs under public/wp-content/uploads/2023/10/
 * (scripts/invoice-templates-assets.mjs copies them and prints these sizes).
 * Every file is the same «فاتورة مبيعات» form in a different design.
 */
export const templateIds = ["sales", "tax", "e-invoice", "business", "quote", "company-quote"] as const;
export type TemplateId = (typeof templateIds)[number];

export interface TemplateFile {
  href: string;
  bytes: number;
}

export interface InvoiceTemplate {
  id: TemplateId;
  /** The uncropped full-page render, as WebP. */
  image: { src: string; width: number; height: number };
  /**
   * The sheet's empty «QR code» box, in percent of the image (left, top, width,
   * height), measured on the renders: the create-online link fills it with VoM's mark.
   */
  qr: { x: number; y: number; w: number; h: number };
  docx: TemplateFile;
  pdf: TemplateFile;
}

const uploads = "/wp-content/uploads/2023/10";

export const invoiceTemplates: InvoiceTemplate[] = [
  {
    id: "sales",
    image: { src: "/invoice-templates/sales.webp", width: 1141, height: 1600 },
    qr: { x: 8.8, y: 20.3, w: 11.4, h: 8 },
    docx: { href: `${uploads}/INV-1-1.docx`, bytes: 63969 },
    pdf: { href: `${uploads}/INV1.pdf`, bytes: 2305339 },
  },
  {
    id: "tax",
    image: { src: "/invoice-templates/tax.webp", width: 1141, height: 1600 },
    qr: { x: 6, y: 3, w: 11.6, h: 8 },
    docx: { href: `${uploads}/INV-2-.docx`, bytes: 69612 },
    pdf: { href: `${uploads}/INV2.pdf`, bytes: 2304992 },
  },
  {
    id: "e-invoice",
    image: { src: "/invoice-templates/e-invoice.webp", width: 1141, height: 1600 },
    qr: { x: 25, y: 9.4, w: 9.6, h: 7 },
    docx: { href: `${uploads}/INV-3.docx`, bytes: 60483 },
    pdf: { href: `${uploads}/INV3.pdf`, bytes: 2304956 },
  },
  {
    id: "business",
    image: { src: "/invoice-templates/business.webp", width: 1141, height: 1600 },
    qr: { x: 6.8, y: 18.8, w: 11.2, h: 8.1 },
    docx: { href: `${uploads}/INV-4.docx`, bytes: 80641 },
    pdf: { href: `${uploads}/INV4.pdf`, bytes: 2358078 },
  },
  {
    id: "quote",
    image: { src: "/invoice-templates/quote.webp", width: 1159, height: 1600 },
    qr: { x: 9.3, y: 16.8, w: 11, h: 8.1 },
    docx: { href: `${uploads}/INV-5.docx`, bytes: 96042 },
    pdf: { href: `${uploads}/INV5.pdf`, bytes: 2323639 },
  },
  {
    id: "company-quote",
    image: { src: "/invoice-templates/company-quote.webp", width: 1149, height: 1600 },
    qr: { x: 8.5, y: 16.6, w: 11.1, h: 8.1 },
    docx: { href: `${uploads}/INV-6.docx`, bytes: 88042 },
    pdf: { href: `${uploads}/INV6.pdf`, bytes: 2306184 },
  },
];

/** The old hero's two stacked sheets (the green-and-orange design). */
export const heroSheets = { src: "/invoice-templates/hero.webp", width: 1250, height: 1600 };

/** A tax invoice issued in VoM with sample data, cut through its totals, its accent recoloured to brand teal. */
export const recordInvoice = { src: "/invoice-templates/vom-invoice.webp", width: 1124, height: 891 };

/** A file's size the way a file manager shows it (decimal units): "64 KB", "2.3 MB". */
export function fileSize(bytes: number): string {
  if (bytes < 1_000_000) return `${Math.round(bytes / 1000)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}
