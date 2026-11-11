# Architecture decisions

Status: proposed on 2026-10-25, to be confirmed with the owner before implementation. Each decision names the alternative it rejected. Technical facts about Next.js 16 come from `docs/research/next16-digest.md`.

## 1. Rendering: fully static, revalidated by tag

Every public page is prerendered. Content reads sit behind `'use cache'` with `cacheLife('max')` and tags (`pages`, `posts`, `post-<slug>`, `sectors`, `templates`, `tools`). Marketing and blog layouts export `ensureStatic = 'navigation'` so the build fails if anything makes a page dynamic by accident. Posts, news, templates, categories and authors come from Supabase (§13) through `lib/content/posts/`, tagged `posts`, `post-<id>`, `categories`, `category-<id>` and `authors`. The admin's save and publish actions expire those tags with `updateTag`, so a published change shows without a redeploy; scripts use the secret-protected Route Handler `/api/revalidate`, which calls `revalidateTag(tag, 'max')`. A post published after the last build is rendered on first request and cached. Only `/admin` and `/api` render per request; `proxy.ts` matches `/admin` alone, so public pages never pass through it.

Rejected: request-time rendering with a CDN in front. It would cost Core Web Vitals and complicate hreflang-correct caching for no benefit on a content site.

## 2. Locales: Arabic at `/`, English at `/en`, no automatic redirects

Routes live under `app/[lang]/` with `generateStaticParams` returning `ar` and `en`. `next.config.ts` rewrites `/` and every non-`/en` path to `/ar/...` (`beforeFiles`), and permanently redirects any literal `/ar/...` request to the unprefixed path. The locale is read with `next/root-params`, never from `params` at the top of a layout. There is no `Accept-Language` redirect: search engines and users get exactly the URL they asked for; the header offers the language switch, which points at the hreflang twin of the current page.

Rejected: two separate route trees (`app/(ar)` and `app/en`): duplicates every layout and loses the shared root param. Rejected: locale detection in `proxy.ts`: it hides pages from crawlers and splits caches.

## 3. URLs: preserve first, restructure later

`trailingSlash: true` so WordPress paths resolve byte-for-byte. A catch-all route `app/[lang]/[...slug]/page.tsx` resolves any preserved path through the content layer's URL index (posts under `/<category>/<arabic-slug>/`, sector pages under `/<arabic-slug>/`, e-invoicing guides under `/الفوترة-الإلكترونية/<slug>/`, templates under `/templates/<slug>/`, tools under `/tools/<slug>/`). Dedicated routes exist only for pages whose structure is new (home, pricing, features, about, contact, blog index, category archives). Redirects for the `redirect` and `retire` rows of `docs/content/url-map.csv` go in `next.config.ts` `redirects()` with `statusCode: 301` (about 25 entries) and a small `410` handler.

Rejected for launch: moving posts to `/blog/<slug>/`. It is cleaner but adds about 230 redirects and temporary ranking volatility during a migration that already changes platform, design and markup. It can be done later as its own change with its own redirect map.

## 4. Content layer: one interface, swappable storage

`lib/content/` exposes typed functions (`getPage(path, lang)`, `getPost(slug)`, `listPosts({ category, page })`, `getSector(slug, lang)`, `listTemplates()`, `getTool(slug)`, `getAuthor(slug)`, `getUrlIndex()`), each cached with `'use cache'`. The first implementation reads MDX files with frontmatter from `content/` (imported from WordPress by a one-off script that pulls the REST API, converts HTML to MDX, downloads media to `public/media/`, and strips editor artefacts such as `data-start` attributes). A later CMS plugs in behind the same interface. Pages never import from `content/` directly.

Why MDX first: the owner deferred the CMS decision; MDX needs no service, keeps Git history, and lets Claude Code edit content. The import script is kept so the migration is repeatable. First in place (2026-11-10): the e-invoicing hub and guides, through `@next/mdx` (bodies loaded by dynamic import in `lib/content/einvoicing/`, house components mapped in the root `mdx-components.tsx`, `remark-gfm` named as a string for Turbopack). Metadata lives in a typed catalogue (`lib/content/einvoicing/catalogue.ts`) rather than frontmatter, and the import read the saved WordPress HTML (`scripts/import-einvoicing.mjs`) rather than the REST API. Long-form pages exceed the 100 KB HTML budget because the RSC payload repeats every word (130–238 KiB raw, 26–45 KiB gzipped); the template's own markup is kept lean. The features page (2026-11-10) is the same case at 134 KB Arabic / 120 KB English raw (23 / 21 KB gzipped): its register rows carry no per-cell classes, CSS counters draw every entry number, and its images carry their display width so each srcset holds only 1x and 2x. The site chrome (header with mega menus, footer, their RSC) is already about 90 KB on every page.

Since 2026-11-11 posts and news are not MDX. They live in Supabase and are edited in the site's own admin at `/admin` (§13): `lib/content/posts/` exposes `getPostByPath`, `listPosts`, `listCategories`, `getCategory`, `getAuthor`, `postPaths` and `relatedPosts`. Bodies are stored twice, as the editor's document and as HTML rendered from it on the server; one schema (`lib/editor/extensions.ts`) is shared by the editor, the save action and `scripts/import-wordpress.mjs`. The catch-all route resolves blog paths against one cached index of every published path, so an unknown URL is a 404 without a database query. The e-invoicing guides and the accounting guide stay on MDX.

## 5. Metadata and structured data: generated from one source

`lib/seo/` builds `Metadata` objects and JSON-LD from content records: title templates per type, absolute canonical, `alternates.languages` from the hreflang pairs in the URL index, Open Graph with a generated image (`opengraph-image.tsx` per route type, Arabic font passed to `ImageResponse`), and JSON-LD by type (`Organization` + `WebSite` in the root layout; `SoftwareApplication` with `Offer` on home, features and pricing; `Article` with `author` and `reviewedBy` on posts and guides; `BreadcrumbList` everywhere; no `FAQPage`, since Google no longer shows FAQ rich results for sites like this one (owner, 2026-11-10); `HowTo` on calculators if they qualify). Sitemaps are split by type with `generateSitemaps` and listed in `robots.ts`.

## 6. Fonts: self-hosted through `next/font`, two families at most

Effra from `next/font/local` in four weights is the only typeface; its files cover Arabic, Latin and Greek, so one family serves both locales and all digits. Convert the TTFs to subset WOFF2 once the Dalton Maag web licence is confirmed (the licence is the open item, not the glyph coverage).

## 7. Images and media

`next/image` with `formats: ['image/avif', 'image/webp']`, `minimumCacheTTL` of 31 days, `remotePatterns` for `media.getvom.com`. Blog media lives in a Cloudflare R2 bucket served at `media.getvom.com`. The import copied every file a post uses to its WordPress key (`wp-content/uploads/YYYY/MM/<file>`), with a `<stem>.webp` beside each image (at most 1600 px wide) that the content uses. `/wp-content/uploads/:path*` on the site 301s to the same key on the media domain, and WordPress size variants (`name-300x135.jpg`) 301 to the original. Files the site still serves itself from `public/wp-content/uploads/` (the invoice templates, the e-invoicing PDF) are read at config time and left out of that redirect. New images are resized to WebP in the browser and sent straight to R2 through a five-minute presigned PUT, under `uploads/YYYY/MM/`.

## 8. Analytics and third parties

GTM `GTM-PS28X6L` via `@next/third-parties/google` (`afterInteractive`). Web Vitals forwarded to GA4 from `useReportWebVitals`. Chat (Crisp) and help centre (Zendesk) widgets load only after the first user interaction or on the contact page. TikTok and other pixels stay inside GTM. Consent handling is a launch checklist item.

## 9. Forms and conversion

Primary CTAs link to `app.getvom.com` registration (`/ar/company-register-show`, `/en/company-register-show`) with UTM parameters. Demo booking keeps the Calendly link. Lead forms post to one Server Action, `submitLead(form, data)` (`lib/leads/`): it validates against the form's schema, verifies the Cloudflare Turnstile token, inserts into the `leads` table with the secret key (the public key cannot write there, owner 2026-11-11), then sends an optional Resend notification. The insert comes first, so an email failure never loses a lead. No form is live yet: each is built with its page. The admin lists leads with filters and a CSV export.

## 10. Security headers

Static CSP in `headers()` (no nonces, because nonce CSP forces dynamic rendering; scripts and styles therefore allow `'unsafe-inline'`), naming Turnstile, Supabase, `media.getvom.com`, the R2 upload endpoint, YouTube's no-cookie player and Google Tag Manager; HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`.

## 11. Testing and quality gates

- `pnpm lint`, `pnpm typecheck`, `pnpm build` in CI.
- Playwright: smoke navigation in both locales at 390 px and 1440 px; an SEO assertion suite that loads every URL in `url-map.csv` and checks status, title, description, canonical, hreflang, and JSON-LD validity.
- Lighthouse CI with the budgets from `CLAUDE.md` on home, a sector page, a post, a template, a tool, in both locales.
- Visual regression on the design system components in RTL and LTR.

## 12. Hosting and environments

Vercel, with preview deployments per branch and a `deploymentId` so caches invalidate on deploy. Launch is a DNS cut-over with the WordPress site kept reachable on a temporary hostname for two weeks for comparison and media fallback.

## 13. Backend services (blog, admin, leads)

Decided by the owner on 2026-11-11; the full design is `docs/superpowers/specs/2026-11-11-blog-backend.md`. It replaces "MDX first, CMS later" for posts and news; the e-invoicing guides and the accounting guide stay on MDX.

- **Supabase** (free plan): project `vom-website`, ref `miwhkjcqhmebeojlqlqm`, region `eu-central-1` (Frankfurt), Postgres 17, in the GetVoM organisation. It holds posts, categories, authors, leads and the admin allowlist, and Supabase Auth signs admins in. Migrations live in `supabase/migrations/` and are applied through the Supabase MCP; `lib/supabase/types.ts` is regenerated after each one. Row level security is on for every table: the public key reads published posts, categories and authors and may add a lead; everything else needs a user on the `admins` list.
- **Vercel functions** are pinned to `fra1` in `vercel.json`, beside the database.
- **Cloudflare R2** serves media at `media.getvom.com`; a second private bucket keeps database backups.
- **Cloudflare Turnstile** protects public forms.
- **Admin** at `/admin` by default, under its own root layout outside `app/[lang]`, never indexed. The private variable `ADMIN_PATH` moves it to `/<ADMIN_PATH>/` and makes `/admin` a 404 (rewrites in `next.config.ts`; `lib/admin/path.ts` builds every admin link; the value reaches client components through a provider, never a `NEXT_PUBLIC_` variable, and is not named in `robots.txt`). Supabase Auth with email and password, public sign-ups off. Every page and action checks the session and the `admins` list on the server (`lib/admin/auth.ts`); the panel's layout renders nothing, not even its menu, before that check passes. `proxy.ts` only keeps the session fresh: it runs for requests carrying the `vom_admin` cookie that signing in sets, so the public never passes through it. The editor is Tiptap on one schema (`lib/editor/extensions.ts`) with a full toolbar, image upload by picking, dropping or pasting, an HTML view and full screen. Content types: posts, news and templates.
- **Free-plan safety**: `.github/workflows/supabase-keepalive.yml` reads one row daily so the project is not paused; `supabase-backup.yml` dumps the database weekly into the private backup bucket and keeps eight.
- **Checks**: `node scripts/check-blog-urls.mjs` asserts every post, news and category row of `url-map.csv` against a running site.

Environment variables (`.env.example`):

| Variable | Vercel (Production and Preview) | GitHub Actions | Local |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | yes (keep-alive) | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | yes (leads only, server side) | no | yes (import) |
| `SUPABASE_DB_URL` | no | yes (backup) | no |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | yes (uploads) | yes (backup) | yes (import) |
| `R2_BUCKET`, `MEDIA_BASE_URL` | yes | no | yes |
| `R2_BACKUP_BUCKET` | no | yes | no |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | yes | no | yes |
| `RESEND_API_KEY`, `LEADS_NOTIFY_EMAIL`, `LEADS_FROM_EMAIL` | yes (optional) | no | optional |
| `REVALIDATE_SECRET` | yes | no | yes |
| `ADMIN_PATH` (optional; needed at build time) | yes | no | optional |
| `WP_BASE_URL`, `WP_USER`, `WP_APP_PASSWORD` | no | no | yes (import) |

## Open items

- Real author bios and credentials (WordPress held placeholders; none were imported), and Arabic display names for the writers.
- Six records have no reviewer on WordPress (two posts, four news items).
- Turnstile keys, the backup bucket, the R2 CORS rule for browser uploads, and the Vercel and GitHub secrets.
- The 410 handler for `retire` rows (they answer 404 today).
- Arabic typeface licence.
- The lead forms themselves (contact first), built with their pages.
- Whether the English blog exists (today all posts are Arabic).
- Vector logo master and high-resolution product screenshots from the team.
