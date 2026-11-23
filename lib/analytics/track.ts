import { withPostHog } from "./client";
import type { AnalyticsEvent, AnalyticsEvents } from "./events";

/**
 * Sends one custom event to PostHog from the browser. The event must be in the
 * catalogue (lib/analytics/events.ts). PostHog is started in
 * instrumentation-client.ts; an event sent before that waits for it
 * (lib/analytics/client.ts), and with no key nothing is sent.
 */
export function track<E extends AnalyticsEvent>(event: E, properties: AnalyticsEvents[E]): void {
  withPostHog((posthog) => posthog.capture(event, properties));
}

/**
 * For the delegated listener only: the event name comes from a `data-track`
 * attribute or the link classifier, so it is not known to the type checker.
 */
export function trackNamed(event: string, properties: Record<string, unknown>): void {
  withPostHog((posthog) => posthog.capture(event, properties));
}
