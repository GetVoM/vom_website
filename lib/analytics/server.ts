import { PostHog } from "posthog-node";
import type { AnalyticsEvent, AnalyticsEvents } from "./events";

/**
 * PostHog from the server, for events the browser cannot vouch for (a lead
 * actually saved). Each event is sent at once and awaited, because a serverless
 * function may stop as soon as it answers. With no key, or no visitor id from
 * the browser, nothing is sent; analytics never fails the request.
 */
let client: PostHog | null | undefined;

function getClient(): PostHog | null {
  if (client !== undefined) return client;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  client = key && host ? new PostHog(key, { host, flushAt: 1, flushInterval: 0 }) : null;
  return client;
}

export interface Visitor {
  /** The browser's PostHog distinct id, so the server's event lands on the same person. */
  distinctId?: string | null;
  sessionId?: string | null;
}

export async function captureServer<E extends AnalyticsEvent>(visitor: Visitor, event: E, properties: AnalyticsEvents[E]): Promise<void> {
  const posthog = getClient();
  if (!posthog || !visitor.distinctId) return;
  try {
    posthog.capture({
      distinctId: visitor.distinctId,
      event,
      // `environment` as the browser registers it (instrumentation-client.ts), so test leads filter out the same way.
      properties: { ...properties, environment: process.env.DEPLOYMENT_ENV, ...(visitor.sessionId && { $session_id: visitor.sessionId }) },
    });
    await posthog.flush();
  } catch (error) {
    console.error("Could not send a PostHog event:", error);
  }
}
