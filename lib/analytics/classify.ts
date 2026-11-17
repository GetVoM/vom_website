import { site } from "../seo/site.ts";

/**
 * Names the PostHog event a clicked link stands for, from its address alone.
 * Pure (no DOM, no PostHog), so `pnpm test` can run it. The delegated listener
 * in components/analytics/Tracker.tsx calls it for every `<a href>` click, which
 * is how the server-rendered links (buttons, footer, article HTML) are tracked
 * without becoming Client Components.
 *
 * A link inside the site returns null: those are named, where they matter, with
 * a `data-track` attribute instead.
 */
export interface ClassifiedLink {
  event:
    | "signup_cta_clicked"
    | "login_clicked"
    | "demo_booking_clicked"
    | "whatsapp_clicked"
    | "phone_clicked"
    | "email_clicked"
    | "file_downloaded"
    | "app_store_clicked"
    | "social_link_clicked"
    | "student_offer_clicked"
    | "growth_form_clicked"
    | "help_center_clicked"
    | "api_docs_clicked"
    | "outbound_link_clicked";
  props: Record<string, string>;
}

const DOCUMENT = /\.(pdf|docx?|xlsx?|pptx?|csv|zip)$/i;
/** Hosts that are this site: its own pages and its media bucket. */
const OWN_HOSTS = new Set(["getvom.com", "www.getvom.com", "media.getvom.com"]);
const hostOf = (url: string) => new URL(url).hostname;
const APP_HOST = hostOf(site.appUrl);
const DEMO_HOST = hostOf(site.demo);
const STUDENT_HOST = hostOf(site.studentLinks.student.ar);
const SOCIAL: [string, string][] = Object.entries(site.social).map(([network, url]) => [hostOf(url).replace(/^www\./, ""), network]);

function fileName(pathname: string): string {
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  try {
    return decodeURIComponent(last).slice(0, 200);
  } catch {
    return last.slice(0, 200);
  }
}

export function classifyLink(href: string, options: { origin: string; download?: boolean }): ClassifiedLink | null {
  const raw = href.trim();
  if (/^mailto:/i.test(raw)) return { event: "email_clicked", props: {} };
  if (/^tel:/i.test(raw)) return { event: "phone_clicked", props: {} };

  let url: URL;
  try {
    url = new URL(raw, options.origin);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  const host = url.hostname.toLowerCase();
  const bare = host.replace(/^www\./, "");
  const path = url.pathname;
  const own = host === new URL(options.origin).hostname || OWN_HOSTS.has(host);

  const extension = DOCUMENT.exec(path)?.[1]?.toLowerCase();
  if (options.download || extension) {
    return { event: "file_downloaded", props: { file_name: fileName(path), file_type: extension ?? "file", host } };
  }
  if (own) return null;

  if (host === "docs.google.com" || host === "drive.google.com") {
    if (path.startsWith("/forms/")) return { event: "growth_form_clicked", props: {} };
    const kind = path.split("/").filter(Boolean)[0] ?? "drive";
    return { event: "file_downloaded", props: { file_name: fileName(path), file_type: `google_${kind}`, host } };
  }
  if (host === APP_HOST) {
    if (path.includes("company-register-show")) return { event: "signup_cta_clicked", props: {} };
    if (path.includes("/docs/api")) return { event: "api_docs_clicked", props: {} };
    return { event: "login_clicked", props: {} };
  }
  if (host === DEMO_HOST) return { event: "demo_booking_clicked", props: {} };
  if (host === "wa.me" || bare.endsWith("whatsapp.com")) return { event: "whatsapp_clicked", props: {} };
  if (host === "apps.apple.com") return { event: "app_store_clicked", props: { store: "app_store" } };
  if (host === "play.google.com") return { event: "app_store_clicked", props: { store: "google_play" } };
  if (host === STUDENT_HOST) return { event: "student_offer_clicked", props: {} };
  if (bare.endsWith("zendesk.com")) return { event: "help_center_clicked", props: {} };
  const social = SOCIAL.find(([domain]) => bare === domain || (domain === "x.com" && bare === "twitter.com"));
  if (social) return { event: "social_link_clicked", props: { network: social[1] } };

  return { event: "outbound_link_clicked", props: { domain: bare, href: url.href.slice(0, 500) } };
}
