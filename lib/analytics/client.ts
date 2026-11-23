import type { PostHog } from "posthog-js/dist/module.slim";

/**
 * Where browser code reaches PostHog. The SDK itself (lib/analytics/posthog.ts)
 * is imported dynamically by instrumentation-client.ts, so its code downloads
 * beside the page instead of holding up hydration; until it has started, calls
 * wait here in order and run as soon as it has. Never import posthog-js, or
 * lib/analytics/posthog.ts, from a component: a static import puts the SDK back
 * on the page's critical path.
 */
let instance: PostHog | null = null;
const waiting: ((posthog: PostHog) => void)[] = [];

/** Runs `run` with PostHog now if it has started, or as soon as it does. */
export function withPostHog(run: (posthog: PostHog) => void): void {
  if (typeof window === "undefined") return;
  if (instance) run(instance);
  // Bounded, for a build with no PostHog key, where nothing ever starts.
  else if (waiting.length < 200) waiting.push(run);
}

/** PostHog if it has started, or null: for reads that cannot wait, like the visitor's id on a form. */
export function startedPostHog(): PostHog | null {
  return instance;
}

/** Called once by instrumentation-client.ts after `posthog.init`. */
export function postHogStarted(posthog: PostHog): void {
  instance = posthog;
  for (const run of waiting.splice(0)) run(posthog);
}
