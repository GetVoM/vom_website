# VoM website (getvom.com) — project instructions

This repo replaces the WordPress site at getvom.com with a Next.js 16 site. Two things outrank everything else here: **design quality** and **SEO**. Read this file, then `PRODUCT.md`, then the doc that matches your task in `docs/`.

## What this is

- VoM (ڤوم / VoM) is a Saudi cloud accounting product: ZATCA-approved e-invoicing, sales, purchases, inventory, reports. The website sells it and hosts a large Arabic content library (blog, downloadable templates, calculators) that drives organic traffic.
- Arabic is the primary language and lives at `/`. English is a full mirror at `/en`. Build right-to-left first; English is the mirror, not the other way round.
- The product app, sign-up and login live on `app.getvom.com`. This site never handles accounts.
- VoM Flow (vomflow.com) is a different product from the same parent company. Nothing from it (its design, its article API, its PostHog project) applies here.

## Non-negotiables

1. **Brand is pinned**: the teal script logo, the colours (teal `#17BAA3`, orange `#FF7300`, blue `#0694FF`, near-black `#020202`, greys `#54595F` / `#6B6B6B`, light `#F4F7FC`) and the Effra typeface stay. Tints and shades of those colours are allowed; new hues are not. See `PRODUCT.md` › Brand Commitments and `docs/design/`.
2. **Every existing URL keeps working.** `docs/content/url-map.csv` is the contract: `keep` rows must resolve at the same path with the same content; `redirect` rows get a 301; `retire` rows get a 410. Never ship a build that drops a `keep` URL.
3. **SEO is a feature with tests.** Every page has a unique title and description, an absolute canonical, hreflang pairs (`ar`, `en`, `x-default`), Open Graph image, and the JSON-LD its page type requires (`docs/seo/strategy.md`). Blog posts keep author and "reviewed by" data.
4. **Performance budgets** (mobile, Lighthouse, 4G): LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 200 ms, HTML ≤ 100 KB, client JS on marketing pages ≤ 150 KB gzipped, fonts ≤ 2 weights per family preloaded. Third-party scripts load after interaction or `lazyOnload`.
5. **No invented facts.** No fabricated testimonials, customer names, numbers, awards or certifications. Demonstration data in UI mock-ups is labelled as such. Prices come from `PRODUCT.md` and must be reconfirmed before launch.
6. **Accessibility floor**: WCAG 2.2 AA contrast, keyboard navigation with visible focus, real `<button>` / `<a>` / `<label>` elements, `prefers-reduced-motion` respected, RTL and LTR parity in every component.

## Stack and conventions

- Next.js 16.4.3 App Router with `cacheComponents` and `partialPrefetching` on, React 19.3, TypeScript strict, Tailwind CSS v4 (tokens in `app/globals.css` under `@theme`), pnpm. Hosting: Vercel.
- **This Next.js differs from older training data.** `AGENTS.md` points at the bundled docs in `node_modules/next/dist/docs/`; the short version is `docs/research/next16-digest.md`. The rules that bite most: `proxy.ts` not `middleware.ts`; `params` / `searchParams` / `cookies()` / `headers()` are async; no `dynamic` / `revalidate` / `dynamicParams` segment exports, use `'use cache'` + `cacheLife()` + `cacheTag()`; `revalidateTag(tag, 'max')` needs the second argument; `preload` not `priority` on `next/image`; `images.remotePatterns` not `domains`; nonce CSP breaks static rendering; `generateStaticParams` must return at least one entry.
- Routing: `app/[lang]/…` with `generateStaticParams` returning `ar` and `en`; `/` rewrites to `/ar` and `/ar/*` redirects to `/*` so Arabic URLs never carry a prefix. Read the locale with `next/root-params`. Details in `docs/architecture.md`.
- Content goes through one content layer (`lib/content/`). Pages never read files or a CMS directly. The storage behind it (MDX now, a CMS later) is swappable.
- Fonts via `next/font` only: Effra from `next/font/local` is the single typeface for Arabic and Latin (`app/fonts.ts`). Never load fonts from a third-party `<link>`. The web-font licence for Effra is an open item.
- Images via `next/image` with explicit `sizes`; one `preload` per page for the LCP element.
- Styling: Tailwind utilities plus the design tokens; no component library that brings its own look. Motion: one orchestrated moment per page, nothing on scroll by default, reduced-motion fallback always.
- Analytics: Google Tag Manager (`GTM-PS28X6L`) through `@next/third-parties`, loaded `afterInteractive`; Web Vitals forwarded with `useReportWebVitals`.
- Commands: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`. Add `pnpm typecheck` (`tsc --noEmit`) and `pnpm test` when tests exist. `next build` no longer lints, so run `pnpm lint` before claiming done.

## How to work here

- Plan before code. Design work goes through the brainstorming and Impeccable flows; a surface's direction contract lives in its surface brief, not in source.
- Read `docs/superpowers/specs/2026-10-25-vom-website-design.md` for the agreed scope and decisions, and `docs/seo/strategy.md` before touching any route, metadata, sitemap or redirect.
- Verify before reporting: `pnpm lint`, `pnpm typecheck`, `pnpm build`, then check the page in the browser at 390 px and 1440 px in both locales. Say what you ran and what the output was.
- Copy is design content. Arabic copy is written natively, direct, second person singular; English copy is rewritten natively, never machine-translated from Arabic.
- Do not create, publish or edit anything on the live getvom.com WordPress site.

## Where things are

- `PRODUCT.md`: product truth, brand commitments, evidence on hand, open decisions.
- `docs/README.md`: index of all planning docs.
- `docs/content/`: WordPress inventory (`wp-url-inventory.csv`), URL contract (`url-map.csv`), migration notes.
- `docs/seo/strategy.md`: keyword clusters, information architecture, technical SEO, structured data, launch and monitoring plan.
- `docs/design/directions.md`: the three design directions, shared constraints, the typeface finding.
- `docs/architecture.md`: routing, content layer, caching, i18n, redirects, analytics, hosting decisions.
- `docs/research/next16-digest.md`: Next.js 16 API digest.
