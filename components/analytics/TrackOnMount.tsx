"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";
import type { AnalyticsEvent, AnalyticsEvents } from "@/lib/analytics/events";

/**
 * Sends one event when it mounts, for a server-rendered page that should be
 * counted as such (the 404 page). Renders nothing, so the page's markup is unchanged.
 */
export function TrackOnMount<E extends AnalyticsEvent>({ event, properties }: { event: E; properties: AnalyticsEvents[E] }) {
  useEffect(() => {
    track(event, properties);
    // Once per page: the properties are fixed by the server.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
