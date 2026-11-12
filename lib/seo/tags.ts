/**
 * Whether the page loads Google Tag Manager. Only the production deployment
 * does: the container's conversion triggers (the campaign form's
 * `elementor_form_success`, for one) have no hostname condition, so a form sent
 * from a preview or a laptop would reach Google Ads, GA4, Meta and Stape as a
 * real lead. Seen on 2026-11-12, when a local test submit did exactly that.
 * Set GTM_ON=1 to load it elsewhere on purpose, with the ad endpoints blocked.
 */
export const loadTags = process.env.VERCEL_ENV === "production" || process.env.GTM_ON === "1";
