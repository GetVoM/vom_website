import { z } from "zod";

/**
 * The forms that may save a lead, and what each one accepts. A form that is not
 * listed here is refused. Add an entry when a page gets its form; fields beyond
 * the shared ones (name, email, phone, company, message) go into `payload`.
 *
 * No form is live yet (owner, 2026-11-11: the forms are built with their
 * pages). `contact` is the shape the contact page will use.
 */
const text = (max: number) => z.string().trim().max(max);

export const leadForms = {
  contact: z.object({
    name: text(200).min(2),
    email: z.email().max(320),
    phone: text(40).optional(),
    company: text(200).optional(),
    message: text(5000).min(5),
  }),
} satisfies Record<string, z.ZodType<LeadFields>>;

export type LeadForm = keyof typeof leadForms;

export interface LeadFields {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  /** Anything a form collects beyond the shared fields. */
  payload?: Record<string, string>;
}
