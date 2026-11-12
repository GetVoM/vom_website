"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile inside a lead form. Nothing loads with the page: the
 * script is fetched the first time the visitor focuses or touches the form, so
 * pages with a form pay for it only when the form is used. The widget adds the
 * hidden `cf-turnstile-response` field that `submitLead` checks.
 *
 * `onToken` hears each token as it arrives, and null when one expires or the
 * check fails, so a form can wait for the token before it posts.
 */
export function Turnstile({ locale, onToken }: { locale: "ar" | "en"; onToken?: (token: string | null) => void }) {
  const box = useRef<HTMLDivElement>(null);
  // Read through a ref, so a new callback never re-renders the widget.
  const listener = useRef(onToken);
  useEffect(() => {
    listener.current = onToken;
  }, [onToken]);

  useEffect(() => {
    const element = box.current;
    const form = element?.closest("form");
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!element || !form || !siteKey) return;
    let widget: string | undefined;
    let cancelled = false;

    const render = () => {
      if (cancelled || widget || !window.turnstile) return;
      widget = window.turnstile.render(element, {
        sitekey: siteKey,
        language: locale,
        appearance: "interaction-only",
        callback: (token: string) => listener.current?.(token),
        "expired-callback": () => listener.current?.(null),
        "error-callback": () => listener.current?.(null),
      });
    };
    const load = () => {
      form.removeEventListener("focusin", load);
      form.removeEventListener("pointerdown", load);
      if (window.turnstile) return render();
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    };
    form.addEventListener("focusin", load);
    form.addEventListener("pointerdown", load);
    return () => {
      cancelled = true;
      form.removeEventListener("focusin", load);
      form.removeEventListener("pointerdown", load);
      if (widget) window.turnstile?.remove(widget);
    };
  }, [locale]);

  return <div ref={box} className="turnstile" />;
}
