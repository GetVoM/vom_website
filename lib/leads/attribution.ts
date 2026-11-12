/**
 * Where a visitor came from: the campaign tags and the ad platforms' click ids.
 * A lead form copies them from its page's URL into hidden fields; `submitLead`
 * saves them in the `leads.utm` column; the admin shows and exports them.
 */
export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
