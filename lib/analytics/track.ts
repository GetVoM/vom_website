import posthog from "posthog-js";
import type { AnalyticsEvent, AnalyticsEvents } from "./events";

/**
 * Sends one custom event to PostHog from the browser. The event must be in the
 * catalogue (lib/analytics/events.ts). PostHog is started in
 * instrumentation-client.ts; before that, or with no key, this does nothing.
 */
export function track<E extends AnalyticsEvent>(event: E, properties: AnalyticsEvents[E]): void {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}

/**
 * For the delegated listener only: the event name comes from a `data-track`
 * attribute or the link classifier, so it is not known to the type checker.
 */
export function trackNamed(event: string, properties: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}
