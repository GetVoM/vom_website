"use client";

import { startTransition, useActionState, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Turnstile } from "@/components/forms/Turnstile";
import type { Locale } from "@/lib/i18n/config";
import { attributionKeys } from "@/lib/leads/attribution";
import type { LeadForm as LeadFormName } from "@/lib/leads/forms";
import { normaliseSaudiMobile } from "@/lib/leads/phone";
import { submitLead, type LeadState } from "@/lib/leads/submit-lead";

type Field = "name" | "phone" | "email" | "sector";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** The page's address never changes while the form is open; on the server there is none. */
const noChange = () => () => {};
const readLocation = () => `${window.location.pathname}${window.location.search}`;

/** How long a submit waits for the Turnstile token before posting anyway (the server then says why). */
const TOKEN_WAIT = 10_000;

/** The words every lead form needs: the two required fields, the button, the failures and the thank-you. */
export interface LeadFormCopy {
  name: string;
  phone: string;
  phonePlaceholder: string;
  submit: string;
  sending: string;
  /** The mark beside an optional field's label; needed only when the form has one. */
  optional?: string;
  errors: { name: string; phone: string; network: string };
  thanks: { heading: string; body: string; whatsapp: string };
}

/** An optional field: its label and the message shown when what was typed cannot be used. */
export interface OptionalEmail {
  label: string;
  error: string;
}
export interface OptionalSector {
  label: string;
  /** The empty option, so the select does not read as already chosen. */
  choose: string;
  options: readonly string[];
  error: string;
}

/** What Google Tag Manager hears once a lead is saved: each page keeps its old Elementor form's words. */
export interface GtmFormSuccess {
  readonly event: string;
  readonly form_name: string;
  readonly form_id: string;
}

interface LeadFormProps {
  /** The form's name in the leads registry (lib/leads/forms.ts), which says what the server accepts. */
  form: LeadFormName;
  locale: Locale;
  copy: LeadFormCopy;
  /** The form's accessible name: the line that asks for the lead. */
  label: string;
  gtm: GtmFormSuccess;
  whatsappUrl: string;
  email?: OptionalEmail;
  sector?: OptionalSector;
}

/** The browser's own checks, mirroring the server's: name and mobile required, email checked only when typed. */
function check(data: FormData): Field[] {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const wrong: Field[] = [];
  if (value("name").length < 2) wrong.push("name");
  if (!normaliseSaudiMobile(value("phone"))) wrong.push("phone");
  if (value("email") && !EMAIL.test(value("email"))) wrong.push("email");
  return wrong;
}

/**
 * A lead form: full name and a Saudi mobile, required, plus an optional email
 * and business sector where the page asks for them. It posts through
 * `submitLead` to the leads table under `form`. On success it swaps itself for
 * a thank-you note, takes focus there, and pushes `gtm` to Google Tag Manager
 * once, in the words the page's old Elementor form used, so the container's
 * triggers keep working. Styled from `.lead-` in app/globals.css; each page
 * dresses it from its own block.
 */
export function LeadForm({ form, locale, copy, label, gtm, whatsappUrl, email, sector }: LeadFormProps) {
  const id = useId();
  // A failed call (no network, a server error) must not cost the visitor the form: it becomes a message, the entries stay.
  const send = async (previous: LeadState | null, data: FormData): Promise<LeadState> => {
    try {
      return await submitLead(form, previous, data);
    } catch {
      return { ok: false, message: copy.errors.network };
    }
  };
  const [state, action, pending] = useActionState(send, null);
  const [errors, setErrors] = useState<Field[]>([]);
  const [waiting, setWaiting] = useState(false);
  const [phone, setPhone] = useState("");
  const token = useRef<string | null>(null);
  const waiters = useRef<((token: string | null) => void)[]>([]);
  const thanks = useRef<HTMLHeadingElement>(null);
  const announced = useRef(false);

  // Where the visitor landed and from which ad: read in the browser only, so the page stays static.
  const location = useSyncExternalStore(noChange, readLocation, () => null);
  const context = useMemo(() => {
    if (!location) return null;
    const url = new URL(location, "https://getvom.com");
    const attribution = attributionKeys.flatMap((key): [string, string][] => {
      const value = url.searchParams.get(key);
      return value ? [[key, value.slice(0, 200)]] : [];
    });
    return { path: url.pathname, attribution };
  }, [location]);

  useEffect(() => {
    if (!state?.ok || announced.current) return;
    announced.current = true;
    // GTM's queue (typed by @next/third-parties); created here if GTM has not loaded yet.
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ ...gtm });
    thanks.current?.focus();
  }, [state, gtm]);

  const onToken = (value: string | null) => {
    token.current = value;
    if (!value) return;
    for (const resolve of waiters.current) resolve(value);
    waiters.current = [];
  };
  // Without a site key no widget renders, so there is no token to wait for; the server then refuses the lead and says why.
  const tokenReady = () =>
    token.current || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      ? Promise.resolve(token.current)
      : new Promise<string | null>((resolve) => {
          waiters.current.push(resolve);
          window.setTimeout(() => resolve(token.current), TOKEN_WAIT);
        });

  const busy = pending || waiting;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const element = event.currentTarget;
    const data = new FormData(element);
    const wrong = check(data);
    setErrors(wrong);
    if (wrong.length > 0) {
      element.querySelector<HTMLElement>(`[name="${wrong[0]}"]`)?.focus();
      return;
    }
    setWaiting(true);
    await tokenReady();
    setWaiting(false);
    // The token field is filled now; read the form again so it is included.
    startTransition(() => action(new FormData(element)));
  };

  const shown = (field: Field) => errors.includes(field) || (!pending && !state?.ok && state?.fields?.includes(field));
  const describe = (field: Field) => (shown(field) ? `${id}-${field}-error` : undefined);
  const clear = (field: Field) => errors.includes(field) && setErrors(errors.filter((each) => each !== field));

  if (state?.ok) {
    return (
      <div className="lead-thanks" role="status">
        <h2 ref={thanks} tabIndex={-1}>
          {copy.thanks.heading}
        </h2>
        <p>{copy.thanks.body}</p>
        <a href={whatsappUrl} target="_blank" rel="noopener" className="lead-thanks-link">
          {copy.thanks.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" name={gtm.form_name} aria-label={label} noValidate onSubmit={submit}>
      <div className="lead-field">
        <label htmlFor={`${id}-name`}>{copy.name}</label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={200}
          aria-invalid={shown("name") || undefined}
          aria-describedby={describe("name")}
          onChange={() => clear("name")}
        />
        {shown("name") && (
          <p id={`${id}-name-error`} className="lead-error">
            {copy.errors.name}
          </p>
        )}
      </div>

      <div className="lead-field">
        <label htmlFor={`${id}-phone`}>{copy.phone}</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel-national"
          required
          maxLength={20}
          placeholder={copy.phonePlaceholder}
          value={phone}
          aria-invalid={shown("phone") || undefined}
          aria-describedby={describe("phone")}
          onChange={(event) => {
            setPhone(event.target.value);
            clear("phone");
          }}
          onBlur={() => {
            if (!phone.trim()) return;
            const normal = normaliseSaudiMobile(phone);
            // A valid number is shown as it will be saved: ٠٥١٢٣٤٥٦٧٨ or +966 51… become 0512345678.
            if (normal) setPhone(normal);
            else if (!errors.includes("phone")) setErrors([...errors, "phone"]);
          }}
        />
        {shown("phone") && (
          <p id={`${id}-phone-error`} className="lead-error">
            {copy.errors.phone}
          </p>
        )}
      </div>

      {email && (
        <div className="lead-field">
          <label htmlFor={`${id}-email`}>
            {email.label} <span className="lead-optional">{copy.optional}</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            maxLength={320}
            aria-invalid={shown("email") || undefined}
            aria-describedby={describe("email")}
            onChange={() => clear("email")}
          />
          {shown("email") && (
            <p id={`${id}-email-error`} className="lead-error">
              {email.error}
            </p>
          )}
        </div>
      )}

      {sector && (
        <div className="lead-field">
          <label htmlFor={`${id}-sector`}>
            {sector.label} <span className="lead-optional">{copy.optional}</span>
          </label>
          <select id={`${id}-sector`} name="sector" defaultValue="" aria-invalid={shown("sector") || undefined} aria-describedby={describe("sector")}>
            <option value="">{sector.choose}</option>
            {sector.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {shown("sector") && (
            <p id={`${id}-sector-error`} className="lead-error">
              {sector.error}
            </p>
          )}
        </div>
      )}

      <input type="hidden" name="locale" value={locale} />
      {context && <input type="hidden" name="page_path" value={context.path} />}
      {context?.attribution.map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
      <Turnstile locale={locale} onToken={onToken} />

      <button type="submit" className="lead-submit" aria-disabled={busy || undefined}>
        {busy ? copy.sending : copy.submit}
      </button>
      <p className="lead-status" role="status" aria-live="polite">
        {!busy && state && !state.ok ? state.message : ""}
      </p>
    </form>
  );
}
