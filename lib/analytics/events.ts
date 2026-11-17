/**
 * The catalogue of PostHog custom events on the public site: every name and the
 * properties it carries. Names are snake_case `object_verb` in the past tense;
 * property keys are snake_case. Add an event here before sending it.
 *
 * Sent three ways:
 * - `track()` (lib/analytics/track.ts) from Client Components;
 * - the delegated listener (components/analytics/Tracker.tsx), which names link
 *   clicks from their address (lib/analytics/classify.ts), reads `data-track`
 *   attributes on server-rendered elements, and adds `location` (the nearest
 *   `data-track-section`), `label` and `locale` to what it sends;
 * - `captureServer()` (lib/analytics/server.ts) from the lead action.
 *
 * Nothing a visitor types (calculator amounts, form fields) is an event
 * property. A lead's contact details reach PostHog only as person properties,
 * when the lead form succeeds (components/forms/LeadForm.tsx).
 */
type Locale = "ar" | "en";

/** What the delegated listener adds to every event it sends. */
interface Placed {
  location?: string;
  label?: string;
  locale?: string;
}

export interface AnalyticsEvents {
  // Conversion: the ways out to the app and to the team.
  signup_cta_clicked: Placed & { plan?: string };
  login_clicked: Placed;
  demo_booking_clicked: Placed;
  whatsapp_clicked: Placed;
  phone_clicked: Placed;
  email_clicked: Placed;
  student_offer_clicked: Placed;
  growth_form_clicked: Placed;
  app_store_clicked: Placed & { store: string };

  // Lead forms.
  lead_form_started: { form: string; locale: Locale };
  lead_form_validation_failed: { form: string; locale: Locale; fields: string[] };
  lead_form_submit_failed: { form: string; locale: Locale; reason: string };
  lead_form_submitted: { form: string; locale: Locale };
  return_to_form_clicked: Record<string, never>;
  /** Server-side, from lib/leads/record.ts. */
  lead_recorded: { form: string; locale: string; page_path?: string } & Record<string, string | undefined>;
  lead_rejected: { form: string; reason: string };

  // Pricing.
  pricing_billing_period_changed: Placed & { period: string };
  pricing_plan_cta_clicked: Placed & { plan: string };

  // Downloads and links out.
  file_downloaded: Placed & { file_name: string; file_type: string; host: string; template?: string };
  social_link_clicked: Placed & { network: string };
  help_center_clicked: Placed;
  api_docs_clicked: Placed;
  outbound_link_clicked: Placed & { domain: string; href: string };

  // Navigation.
  nav_menu_opened: { menu: string };
  nav_link_clicked: { group: string; label: string };
  mobile_menu_opened: Record<string, never>;
  mobile_menu_section_opened: { section: string };
  locale_switched: { from: Locale; to: Locale };
  footer_link_clicked: Placed & { group: string };
  not_found_exit_clicked: Placed;

  // Tools.
  calculator_used: { calculator: string };
  calculator_result_copied: { calculator: string };
  calculator_result_saved: { calculator: string };
  calculator_reset: { calculator: string };
  calculator_switched: { from: string; to: string };

  // Homepage.
  integration_selected: { integration_id: string; is_live: boolean };
  certificate_name_entered: Record<string, never>;
  testimonial_slide_changed: { index: number; method: string };
  sector_card_clicked: Placed & { sector: string };

  // Content.
  faq_opened: Placed & { question: string };
  contents_link_clicked: { surface: string; target: string };
  feature_exhibit_changed: { index: number; method: string };
  video_played: { video_id: string; trigger: string };
  video_playlist_item_selected: { video_id: string };
  blog_pagination_clicked: Placed & { direction: string };
  blog_topic_clicked: Placed & { topic: string };
  related_post_clicked: Placed;
  author_link_clicked: Placed & { role: string };
  guide_card_clicked: Placed & { guide: string };
  tool_card_clicked: Placed & { tool: string };

  // VoM Pay result pages.
  pay_result_viewed: { outcome: string; locale: Locale; error_code?: string };
}

export type AnalyticsEvent = keyof AnalyticsEvents;
