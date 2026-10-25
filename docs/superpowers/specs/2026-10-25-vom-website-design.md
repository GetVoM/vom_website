# getvom.com on Next.js: design document

Date: 2026-10-25. Status: draft for the owner's approval. This is the umbrella document; the detailed plans it points to are `docs/seo/strategy.md`, `docs/architecture.md`, `docs/design/directions.md`, `docs/content/inventory.md`, `PRODUCT.md` and `CLAUDE.md`.

## Intent

Replace the WordPress site at getvom.com with a Next.js 16 site that looks like a modern, premium Saudi product, keeps every ranking the current site has, and grows Arabic organic traffic into free-trial sign-ups. The owner's words for the bar: "gorgeous", "a whole new modern outlook", "extremely SEO focused".

Why now: the current site is dated, heavy (about 1 MB of HTML on the homepage, 461 KB on average), built from a theme and page builder, and its English copy reads as translated. The content library (230 posts, 45 templates, 7 calculators) is a real asset that deserves a better home.

## Goals

1. A distinctive visual identity within the pinned brand (logo, colours, Effra), executed at a craft level the owner would call gorgeous, right-to-left first.
2. Zero loss of organic visibility through the migration: every indexed URL keeps resolving with equivalent content and metadata, and the structured data that exists today is preserved or improved.
3. Core Web Vitals in the green on mobile for every page type.
4. A content foundation (one content layer, MDX now) that a CMS can plug into later without touching pages.
5. Planning documents and project instructions good enough that any future session can build from them.

## Non-goals (for the launch)

- Changing the URL structure of posts, templates, tools or sector pages.
- Choosing or integrating a CMS (deferred by the owner).
- An English edition of the blog.
- New product features on app.getvom.com; the website links to the app and never handles accounts.
- Rewriting the 230 posts; they migrate as they are, with cleanup of markup and metadata only.

## Anti-goals (what would make this a failure even if it worked)

- A site that looks like a SaaS template with VoM's colours applied.
- A migration that drops URLs, breaks hreflang pairs, or loses the author and reviewer schema.
- Invented testimonials, customer logos, numbers or certifications.
- A page that is fast in Lighthouse but reads as a translation in Arabic, or where Arabic falls back to a system font by accident.
- Mixing VoM Flow (the sibling product) into VoM's site, content or analytics.

## Constraints

- Brand: logo, colours and fonts stay (owner, 2026-10-25). Effra covers Arabic and Latin and is the single typeface; only its web-font licence remains to be confirmed.
- Stack: Next.js 16.4.3 App Router with Cache Components, React 19.3, Tailwind v4, TypeScript, pnpm. Hosting: Vercel (owner).
- Languages: Arabic at `/`, English at `/en`, no automatic redirects.
- Data available: full URL inventory with current titles, descriptions, canonicals, H1, schema, dates and sizes (`docs/content/wp-url-inventory.csv`). No Semrush data yet; Search Console export still needed.
- Evidence: 4,000+ users claim, ZATCA approval, customer logos as images, named authors. Testimonials are placeholders and cannot be used.

## Decisions already made

| Decision | Choice | Decided by |
|---|---|---|
| Brand assets | Keep logo, colours, fonts | Owner |
| CMS | Deferred; build on a swappable content layer with MDX first | Owner (deferral), Claude (MDX first) |
| Design review | Three directions as mockups, owner picks | Owner |
| Hosting | Vercel | Owner |
| URL strategy at launch | Preserve every path; 301 only duplicates, 410 junk; `trailingSlash: true` | Claude, pending owner confirmation |
| Locale routing | `app/[lang]` with rewrites so Arabic has no prefix | Claude |
| Rendering | Fully static with tag-based revalidation; `ensureStatic` on layouts | Claude |
| Typeface | Effra for everything, Arabic and Latin | Owner |
| Testimonials | Removed at launch until real ones exist | Claude |

## Open decisions for the owner

1. Which of the three design directions (see `docs/design/directions.md`).
2. Confirm or purchase the Dalton Maag web licence for Effra.
3. Whether to confirm the preserve-first URL strategy or restructure posts under `/blog/` at launch.
4. Where contact-form submissions should go.
5. Whether the growth plan and student package pages stay in the main navigation.

## Left to the builder

- Component architecture, file naming, token naming under the shared design system.
- The exact MDX conversion pipeline and the WordPress import script.
- Test tooling choices (Playwright and Lighthouse CI are recommended).
- Order of page templates after the homepage (recommended: post, sector, template, tool, pricing, features, about, contact, blog index, category).
- Motion implementation, within the one-orchestrated-moment rule.

## Delivery shape

1. Owner picks a direction; the direction contract is recorded; the token system and homepage are built and reviewed.
2. Content import script and content layer; URL index; catch-all route; redirects; metadata and JSON-LD generators; sitemaps; robots.
3. Page templates in priority order, both locales.
4. SEO assertion suite and Lighthouse budgets in CI; preview with noindex.
5. Launch per `docs/seo/strategy.md` §7, then the improvement batches.

## Success criteria

- All 387 `keep` URLs return 200 with matching title, description, canonical, hreflang and JSON-LD on the preview and in production.
- Lighthouse mobile: LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 200 ms on home, a post, a sector page, a template and a tool, in both locales.
- Organic sessions and top-50 rankings within 10 percent of baseline eight weeks after launch, then growing.
- The owner, looking at the homepage on a phone, says it is gorgeous.
