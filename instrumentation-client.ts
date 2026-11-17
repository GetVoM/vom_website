import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const missingVariable = !token ? "NEXT_PUBLIC_POSTHOG_KEY" : !host ? "NEXT_PUBLIC_POSTHOG_HOST" : null;

if (token && host) {
  posthog.init(token, {
    api_host: host,
    // `host` is the reverse proxy (n.getvom.com); links back to PostHog itself go to the app.
    ui_host: "https://us.posthog.com",
    defaults: "2026-08-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
} else if (process.env.NODE_ENV === "development") {
  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

/**
 * Tells the page a client-side navigation has started, so the loader between pages
 * (components/site/NavLoader.tsx) can show when it takes more than a moment.
 */
export function onRouterTransitionStart(url: string) {
  window.dispatchEvent(new CustomEvent("vom:navigation-start", { detail: url }));
}
