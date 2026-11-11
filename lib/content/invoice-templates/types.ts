import type { TemplateId } from "./templates";

export interface InvoiceTemplatesCopy {
  seo: { title: string; description: string };
  /** WordPress dates of this language's old page. */
  published: string;
  modified: string;
  crumb: string;
  h1: string;
  intro: string;
  /** The old note, split where the hinge breaks it: the statement, then the offer. */
  note: { statement: string; offer: string };
  register: string;
  /** The paper side's line under the stacked sheets. */
  paperLine: string;
  heroAlt: string;
  record: { alt: string; caption: string };
  h2: string;
  templates: Record<TemplateId, { name: string; alt: string }>;
  /** The buttons show the format and size; `lead` is read before them, naming the template. */
  download: { word: string; pdf: string; lead: (name: string) => string };
  /** The English page says once that the files are Arabic documents. */
  filesNote?: string;
  createOnline: string;
  /** The closing band: the trial once more, after the downloads. */
  close: { line: string; cta: string };
}
