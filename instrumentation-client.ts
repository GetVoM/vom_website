import { postHogStarted } from "@/lib/analytics/client";

const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const missingVariable = !token ? "NEXT_PUBLIC_POSTHOG_KEY" : !host ? "NEXT_PUBLIC_POSTHOG_HOST" : null;

if (token && host) {
  // Imported dynamically: the SDK downloads beside the page rather than before it can hydrate.
  // Events sent before it has started wait in lib/analytics/client.ts.
  void import("@/lib/analytics/posthog").then(({ default: posthog, posthogExtensions }) => {
    posthog.init(token, {
      api_host: host,
      // `host` is the reverse proxy (n.getvom.com); links back to PostHog itself go to the app.
      ui_host: "https://us.posthog.com",
      defaults: "2026-08-30",
      // The slim core and the extensions this site uses (lib/analytics/posthog.ts).
      __extensionClasses: posthogExtensions,
      capture_exceptions: true,
      // Clicks on things that look clickable but do nothing: the page's broken promises.
      capture_dead_clicks: true,
      debug: process.env.NODE_ENV === "development",
    });
    // On every event: which deployment sent it (production, preview or development, from
    // next.config.ts), so tests on a laptop or a preview never pass for visitors, and the
    // page's language, so any insight splits by locale without parsing the address.
    posthog.register({
      environment: process.env.DEPLOYMENT_ENV,
      locale: document.documentElement.lang || "ar",
    });
    postHogStarted(posthog);
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
