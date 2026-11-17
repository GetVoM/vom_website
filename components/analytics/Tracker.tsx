"use client";

import { useEffect } from "react";
import { classifyLink } from "@/lib/analytics/classify";
import { trackNamed } from "@/lib/analytics/track";

/** `data-track-plan="flex"` becomes `{ plan: "flex" }`; `data-track` and `data-track-section` are not properties. */
function trackProps(element: HTMLElement): Record<string, string> {
  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(element.dataset)) {
    if (!key.startsWith("track") || key === "track" || key === "trackSection" || value === undefined) continue;
    const name = key.slice(5).replace(/[A-Z]/g, (letter, index: number) => `${index ? "_" : ""}${letter.toLowerCase()}`);
    props[name] = value;
  }
  return props;
}

/** What the element says: its text, or its `aria-label` when it is only an icon. */
const textOf = (element: Element | null) =>
  ((element?.textContent ?? "").replace(/\s+/g, " ").trim() || element?.getAttribute("aria-label") || "").slice(0, 120);

/**
 * Where on the page the element sits, and the page's language. The place is the
 * nearest `data-track-section`; without one, the enclosing `<section>`'s id or
 * first class ("faq", "sec-close-band"), so every page is covered unmarked.
 */
function placeOf(element: Element): Record<string, string> {
  const marked = element.closest<HTMLElement>("[data-track-section], section, header, footer");
  // `page-wrap` is the layout container, on many sections; the class after it names the section.
  const named = marked && [...marked.classList].find((name) => name !== "page-wrap");
  const section = marked?.dataset.trackSection ?? (marked?.id || named || marked?.tagName.toLowerCase());
  return { ...(section && { location: section }), locale: document.documentElement.lang || "ar" };
}

/**
 * The one listener that names what visitors do on server-rendered parts of the
 * page, so those parts ship no JavaScript of their own:
 *
 * - a click on any link is named from its address (lib/analytics/classify.ts):
 *   sign-up, login, demo, WhatsApp, downloads, stores, social, outbound;
 * - a click on anything carrying `data-track="event_name"` sends that event,
 *   with its `data-track-*` attributes as properties;
 * - opening a `<details class="faq">` sends `faq_opened`;
 * - the pricing page's billing radios send `pricing_billing_period_changed`.
 *
 * Every event carries `location` (the nearest `data-track-section`, or the
 * enclosing section's id or class) and `locale`. Renders nothing. Mounted in
 * the public root layouts, not the admin.
 */
export function Tracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const named = event.target.closest<HTMLElement>("[data-track]");
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!named && !link) return;
      const source = named ?? link!;
      const base = { ...placeOf(source), label: textOf(link ?? source) };
      const extra = named ? trackProps(named) : link ? trackProps(link) : {};

      if (named?.dataset.track) trackNamed(named.dataset.track, { ...base, ...extra });
      if (!link) return;
      const classified = classifyLink(link.getAttribute("href") ?? "", {
        origin: window.location.origin,
        download: link.hasAttribute("download"),
      });
      // A link may be both: the pricing plan button is `pricing_plan_cta_clicked` and a sign-up click.
      if (classified && classified.event !== named?.dataset.track) {
        trackNamed(classified.event, { ...base, ...extra, ...classified.props });
      }
    };

    // `toggle` does not bubble, so it is heard on the way down.
    const onToggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open || !details.classList.contains("faq")) return;
      trackNamed("faq_opened", { ...placeOf(details), question: textOf(details.querySelector("summary")) });
    };

    const onChange = (event: Event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.name !== "billing" || !input.checked) return;
      trackNamed("pricing_billing_period_changed", { ...placeOf(input), period: input.id.replace(/^billing-/, "") });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("change", onChange);
    };
  }, []);
  return null;
}
