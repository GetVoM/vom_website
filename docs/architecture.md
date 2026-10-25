# Architecture decisions

Status: proposed on 2026-10-25, to be confirmed with the owner before implementation. Each decision names the alternative it rejected. Technical facts about Next.js 16 come from `docs/research/next16-digest.md`.

## 1. Rendering: fully static, revalidated by tag

Every public page is prerendered. Content reads sit behind `'use cache'` with `cacheLife('max')` and tags (`pages`, `posts`, `post-<slug>`, `sectors`, `templates`, `tools`). Marketing and blog layouts export `ensureStatic = 'navigation'` so the build fails if anything makes a page dynamic by accident. A Route Handler at `/api/revalidate` (secret-protected) calls `revalidateTag(tag, 'max')` when content changes; it is unused until a CMS exists.

Rejected: request-time rendering with a CDN in front. It would cost Core Web Vitals and complicate hreflang-correct caching for no benefit on a content site.

## 2. Locales: Arabic at `/`, English at `/en`, no automatic redirects

Routes live under `app/[lang]/` with `generateStaticParams` returning `ar` and `en`. `next.config.ts` rewrites `/` and every non-`/en` path to `/ar/...` (`beforeFiles`), and permanently redirects any literal `/ar/...` request to the unprefixed path. The locale is read with `next/root-params`, never from `params` at the top of a layout. There is no `Accept-Language` redirect: search engines and users get exactly the URL they asked for; the header offers the language switch, which points at the hreflang twin of the current page.

Rejected: two separate route trees (`app/(ar)` and `app/en`): duplicates every layout and loses the shared root param. Rejected: locale detection in `proxy.ts`: it hides pages from crawlers and splits caches.

## 3. URLs: preserve first, restructure later

`trailingSlash: true` so WordPress paths resolve byte-for-byte. A catch-all route `app/[lang]/[...slug]/page.tsx` resolves any preserved path through the content layer's URL index (posts under `/<category>/<arabic-slug>/`, sector pages under `/<arabic-slug>/`, e-invoicing guides under `/الفوترة-الإلكترونية/<slug>/`, templates under `/templates/<slug>/`, tools under `/tools/<slug>/`). Dedicated routes exist only for pages whose structure is new (home, pricing, features, about, contact, blog index, category archives). Redirects for the `redirect` and `retire` rows of `docs/content/url-map.csv` go in `next.config.ts` `redirects()` with `statusCode: 301` (about 25 entries) and a small `410` handler.

Rejected for launch: moving posts to `/blog/<slug>/`. It is cleaner but adds about 230 redirects and temporary ranking volatility during a migration that already changes platform, design and markup. It can be done later as its own change with its own redirect map.

## 4. Content layer: one interface, swappable storage

`lib/content/` exposes typed functions (`getPage(path, lang)`, `getPost(slug)`, `listPosts({ category, page })`, `getSector(slug, lang)`, `listTemplates()`, `getTool(slug)`, `getAuthor(slug)`, `getUrlIndex()`), each cached with `'use cache'`. The first implementation reads MDX files with frontmatter from `content/` (imported from WordPress by a one-off script that pulls the REST API, converts HTML to MDX, downloads media to `public/media/`, and strips editor artefacts such as `data-start` attributes). A later CMS plugs in behind the same interface. Pages never import from `content/` directly.

Why MDX first: the owner deferred the CMS decision; MDX needs no service, keeps Git history, and lets Claude Code edit content. The import script is kept so the migration is repeatable.

## 5. Metadata and structured data: generated from one source

`lib/seo/` builds `Metadata` objects and JSON-LD from content records: title templates per type, absolute canonical, `alternates.languages` from the hreflang pairs in the URL index, Open Graph with a generated image (`opengraph-image.tsx` per route type, Arabic font passed to `ImageResponse`), and JSON-LD by type (`Organization` + `WebSite` in the root layout; `SoftwareApplication` with `Offer` on home, features and pricing; `Article` with `author` and `reviewedBy` on posts and guides; `BreadcrumbList` everywhere; `FAQPage` where a page has FAQs; `HowTo` on calculators if they qualify). Sitemaps are split by type with `generateSitemaps` and listed in `robots.ts`.

## 6. Fonts: self-hosted through `next/font`, two families at most

Effra from `next/font/local` in four weights is the only typeface; its files cover Arabic, Latin and Greek, so one family serves both locales and all digits. Convert the TTFs to subset WOFF2 once the Dalton Maag web licence is confirmed (the licence is the open item, not the glyph coverage).

## 7. Images and media

`next/image` with `formats: ['image/avif', 'image/webp']`, `minimumCacheTTL` of 31 days, `remotePatterns` for `getvom.com` only during the migration window. Media downloaded from WordPress lives in `public/media/` with the original paths so existing image URLs can be redirected or served directly.

## 8. Analytics and third parties

GTM `GTM-PS28X6L` via `@next/third-parties/google` (`afterInteractive`). Web Vitals forwarded to GA4 from `useReportWebVitals`. Chat (Crisp) and help centre (Zendesk) widgets load only after the first user interaction or on the contact page. TikTok and other pixels stay inside GTM. Consent handling is a launch checklist item.

## 9. Forms and conversion

Primary CTAs link to `app.getvom.com` registration (`/ar/company-register-show`, `/en/company-register-show`) with UTM parameters. Demo booking keeps the Calendly link. The contact form posts through a Server Action to the owner's chosen inbox or CRM (open item).

## 10. Security headers

Static CSP in `headers()` (no nonces, because nonce CSP forces dynamic rendering), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`.

## 11. Testing and quality gates

- `pnpm lint`, `pnpm typecheck`, `pnpm build` in CI.
- Playwright: smoke navigation in both locales at 390 px and 1440 px; an SEO assertion suite that loads every URL in `url-map.csv` and checks status, title, description, canonical, hreflang, and JSON-LD validity.
- Lighthouse CI with the budgets from `CLAUDE.md` on home, a sector page, a post, a template, a tool, in both locales.
- Visual regression on the design system components in RTL and LTR.

## 12. Hosting and environments

Vercel, with preview deployments per branch and a `deploymentId` so caches invalidate on deploy. Launch is a DNS cut-over with the WordPress site kept reachable on a temporary hostname for two weeks for comparison and media fallback.

## Open items

- CMS choice and editorial workflow (deferred by the owner).
- Arabic typeface licence.
- Contact form destination.
- Whether the English blog exists (today all posts are Arabic).
- Vector logo master and high-resolution product screenshots from the team.
