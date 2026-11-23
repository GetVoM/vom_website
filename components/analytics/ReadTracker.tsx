"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";
import type { Locale } from "@/lib/i18n/config";

/**
 * Sends `article_read` once, when the last block of the article's body comes
 * into view: the reader reached the end. `body` is a selector for the
 * server-rendered body element (one per page). Renders nothing, so the page's
 * markup is unchanged; PostHog adds the address, and `seconds` (since the page
 * opened) tells a read from a quick scroll to the bottom.
 */
export function ReadTracker({ body, contentType, locale }: { body: string; contentType: string; locale: Locale }) {
  useEffect(() => {
    const container = document.querySelector(body);
    const end = container?.lastElementChild ?? container;
    if (!end || typeof IntersectionObserver === "undefined") return;
    const opened = performance.now();
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      track("article_read", { content_type: contentType, locale, seconds: Math.round((performance.now() - opened) / 1000) });
    });
    observer.observe(end);
    return () => observer.disconnect();
  }, [body, contentType, locale]);
  return null;
}
