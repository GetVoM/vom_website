import posthog from "posthog-js/dist/module.slim";
import { AnalyticsExtensions, ErrorTrackingExtensions, SessionReplayExtensions, ToolbarExtensions } from "posthog-js/dist/extension-bundles";

/**
 * The one PostHog instance in the browser: the SDK's slim core with only the
 * extensions this site uses, instead of the default bundle with all of them
 * (about 120 KB gzipped against about 73 KB here). Only instrumentation-client.ts
 * imports this file, dynamically, so the SDK loads beside the page; components
 * reach PostHog through lib/analytics/client.ts. Never import "posthog-js"
 * itself: that is a second, uninitialised copy, and it brings the full bundle back.
 *
 * - Analytics: autocapture, the pageviews of client-side navigation, heatmaps,
 *   dead clicks and web vitals.
 * - Session replay: the recorder itself still loads on its own when a session
 *   is recorded.
 * - Error tracking: exceptions, and the observer behind `capture_exceptions`.
 * - Toolbar: PostHog's in-page toolbar, for reading heatmaps on the live site.
 *
 * Left out on purpose: surveys (off in the project; the default bundle fetched
 * their 48 KB script on every visit), feature flags and experiments (unused),
 * product tours, conversations, site apps, logs and tracing. Add the bundle
 * here before using one of them.
 */
export const posthogExtensions = {
  ...AnalyticsExtensions,
  ...SessionReplayExtensions,
  ...ErrorTrackingExtensions,
  ...ToolbarExtensions,
};

export default posthog;
