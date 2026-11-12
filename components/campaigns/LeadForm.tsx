"use client";

import { startTransition, useActionState, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Turnstile } from "@/components/forms/Turnstile";
import type { digitalAds2023 } from "@/lib/content/campaigns/digital-ads-2023";
import { attributionKeys } from "@/lib/leads/attribution";
import { DIGITAL_ADS_FORM, gtmFormSuccess, sectorLabel, sectors } from "@/lib/leads/digital-ads-2023";
import { normaliseSaudiMobile } from "@/lib/leads/phone";
import { submitLead, type LeadState } from "@/lib/leads/submit-lead";

type Field = "name" | "phone" | "email" | "sector";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** The page's address never changes while the form is open; on the server there is none. */
const noChange = () => () => {};
const readLocation = () => `${window.location.pathname}${window.location.search}`;

/** How long a submit waits for the Turnstile token before posting anyway (the server then says why). */
const TOKEN_WAIT = 10_000;

/** The browser's own checks, mirroring the server's (lib/leads/forms.ts): name and mobile required, email checked only when typed. */
function check(data: FormData): Field[] {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const wrong: Field[] = [];
  if (value("name").length < 2) wrong.push("name");
  if (!normaliseSaudiMobile(value("phone"))) wrong.push("phone");
  if (value("email") && !EMAIL.test(value("email"))) wrong.push("email");
  return wrong;
}

/**
 * The campaign's lead form. It posts through `submitLead` to the leads table
 * as `digital-ads-2023-landing-page`. On success it swaps itself for a thank-you
 * note and tells Google Tag Manager in the words the old Elementor form used,
 * which fire the campaign's conversion tags (lib/leads/digital-ads-2023.ts).
 */
export function LeadForm({ copy, label, whatsappUrl }: { copy: (typeof digitalAds2023)["form"]; label: string; whatsappUrl: string }) {
  const id = useId();
  // A failed call (no network, a server error) must not cost the visitor the form: it becomes a message, the entries stay.
  const send = async (previous: LeadState | null, data: FormData): Promise<LeadState> => {
    try {
      return await submitLead(DIGITAL_ADS_FORM, previous, data);
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
    window.dataLayer.push({ ...gtmFormSuccess });
    thanks.current?.focus();
  }, [state]);

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
    const form = event.currentTarget;
    const data = new FormData(form);
    const wrong = check(data);
    setErrors(wrong);
    if (wrong.length > 0) {
      form.querySelector<HTMLElement>(`[name="${wrong[0]}"]`)?.focus();
      return;
    }
    setWaiting(true);
    await tokenReady();
    setWaiting(false);
    // The token field is filled now; read the form again so it is included.
    startTransition(() => action(new FormData(form)));
  };

  const shown = (field: Field) => errors.includes(field) || (!pending && !state?.ok && state?.fields?.includes(field));
  const describe = (field: Field) => (shown(field) ? `${id}-${field}-error` : undefined);

  if (state?.ok) {
    return (
      <div className="lp-thanks" role="status">
        <h2 ref={thanks} tabIndex={-1}>
          {copy.thanks.heading}
        </h2>
        <p>{copy.thanks.body}</p>
        <a href={whatsappUrl} target="_blank" rel="noopener" className="lp-thanks-link">
          {copy.thanks.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form className="lp-form" name={gtmFormSuccess.form_name} aria-label={label} noValidate onSubmit={submit}>
      <div className="lp-field">
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
          onChange={() => errors.includes("name") && setErrors(errors.filter((field) => field !== "name"))}
        />
        {shown("name") && (
          <p id={`${id}-name-error`} className="lp-error">
            {copy.errors.name}
          </p>
        )}
      </div>

      <div className="lp-field">
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
            if (errors.includes("phone")) setErrors(errors.filter((field) => field !== "phone"));
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
          <p id={`${id}-phone-error`} className="lp-error">
            {copy.errors.phone}
          </p>
        )}
      </div>

      <div className="lp-field">
        <label htmlFor={`${id}-email`}>
          {copy.email} <span className="lp-optional">{copy.optional}</span>
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
          onChange={() => errors.includes("email") && setErrors(errors.filter((field) => field !== "email"))}
        />
        {shown("email") && (
          <p id={`${id}-email-error`} className="lp-error">
            {copy.errors.email}
          </p>
        )}
      </div>

      <div className="lp-field">
        <label htmlFor={`${id}-sector`}>
          {sectorLabel} <span className="lp-optional">{copy.optional}</span>
        </label>
        <select id={`${id}-sector`} name="sector" defaultValue="" aria-invalid={shown("sector") || undefined} aria-describedby={describe("sector")}>
          <option value="">{copy.sectorChoose}</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        {shown("sector") && (
          <p id={`${id}-sector-error`} className="lp-error">
            {copy.errors.sector}
          </p>
        )}
      </div>

      <input type="hidden" name="locale" value="ar" />
      {context && <input type="hidden" name="page_path" value={context.path} />}
      {context?.attribution.map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
      <Turnstile locale="ar" onToken={onToken} />

      <button type="submit" className="lp-submit" aria-disabled={busy || undefined}>
        {busy ? copy.sending : copy.submit}
      </button>
      <p className="lp-status" role="status" aria-live="polite">
        {!busy && state && !state.ok ? state.message : ""}
      </p>
    </form>
  );
}
