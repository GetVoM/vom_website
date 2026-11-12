import { z } from "zod";
import { normaliseSaudiMobile } from "./phone.ts";
import { DIGITAL_ADS_FORM, sectors } from "./digital-ads-2023.ts";

/**
 * The forms that may save a lead, and what each one accepts. A form that is not
 * listed here is refused. Each key is the form's name in the `leads` table and
 * in the admin's filter.
 *
 * Every form posts the shared fields (name, email, phone, company, message)
 * that it collects; `payloadFields` names the extra ones, saved in `payload`,
 * with the heading the admin gives each column. `unused` lists the shared
 * fields a form never collects, so the admin can hide those columns.
 *
 * Empty inputs never reach a schema: `submitLead` turns them into undefined.
 */
const text = (max: number) => z.string().trim().max(max);

/** A Saudi mobile in any spelling, stored as 05XXXXXXXX (lib/leads/phone.ts). */
const saudiMobile = z
  .string()
  .refine((raw) => normaliseSaudiMobile(raw) !== null)
  .transform((raw) => normaliseSaudiMobile(raw) as string);

export interface LeadFormDefinition {
  schema: z.ZodType<LeadFields>;
  payloadFields?: Record<string, string>;
  unused?: SharedField[];
}

export const leadForms = {
  /** The contact page's shape; not live yet (the forms are built with their pages). */
  contact: {
    schema: z.object({
      name: text(200).min(2),
      email: z.email().max(320),
      phone: text(40).optional(),
      company: text(200).optional(),
      message: text(5000).min(5),
    }),
  },
  /**
   * The paid-campaign landing page (owner, 2026-11-12): name and mobile are
   * required, email and sector optional; the mobile is the one format check.
   */
  [DIGITAL_ADS_FORM]: {
    schema: z.object({
      name: text(200).min(2),
      phone: saudiMobile,
      email: z.email().max(320).optional(),
      payload: z.object({ sector: z.enum(sectors).optional() }).optional(),
    }),
    payloadFields: { sector: "القطاع" },
    unused: ["company", "message"],
  },
} satisfies Record<string, LeadFormDefinition>;

export type LeadForm = keyof typeof leadForms;

export const isLeadForm = (name: string): name is LeadForm => Object.hasOwn(leadForms, name);

export type SharedField = "name" | "email" | "phone" | "company" | "message";

export interface LeadFields {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  /** Anything a form collects beyond the shared fields. */
  payload?: Record<string, string | undefined>;
}
