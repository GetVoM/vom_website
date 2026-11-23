"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Forwards each Core Web Vital to Google Tag Manager as a `web_vitals` event
 * (CLAUDE.md, docs/architecture.md §8), for a GA4 event tag in the container to
 * pick up. PostHog takes its own `$web_vitals`, so nothing goes there. CLS is
 * multiplied by 1000 so GA4 can keep it as an integer, as Google's own recipe
 * does. Renders nothing; mounted with GTM, on production only.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: "web_vitals",
      metric_name: metric.name,
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_delta: Math.round(metric.name === "CLS" ? metric.delta * 1000 : metric.delta),
      metric_id: metric.id,
      metric_rating: metric.rating,
      navigation_type: metric.navigationType,
    });
  });
  return null;
}
