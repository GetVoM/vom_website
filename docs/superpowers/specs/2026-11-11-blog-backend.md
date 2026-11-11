# Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import

Status: approved by the owner on 2026-11-11.

## Context

The marketing pages are built; the blog (230 posts, 5 news items, 23 kept categories, authors) is not. The owner replaced "MDX first, CMS later" for posts with: Supabase (free plan) for data and admin login, Cloudflare R2 at `media.getvom.com` for media, our own Tiptap editor under `/admin`, Turnstile on public forms, Vercel hosting. E-invoicing guides and the accounting guide stay on MDX, untouched.

**Order changed by circumstances.** The brief says Phase 0 (create the Supabase project) comes before the plan. Two things block that now: the Supabase MCP has no tools in this session (it is configured in `.mcp.json` but not signed in), and plan mode forbids creating anything. So: approve this plan first; then I copy it to `docs/superpowers/specs/2026-11-11-blog-backend.md`, and Phase 0 starts with your MCP sign-in (`/mcp` → `supabase` → Authenticate → finish the browser sign-in). Nothing in the plan depends on the project ref or region.

**Owner ruling (2026-11-11):** no lead forms are built now. Phase 4 delivers only the plumbing; forms come when their pages do.

## What exploration found (facts the plan rests on)

- **Repo today:** no `proxy.ts`, no API routes, no server actions, no CSP, no tests, no CI, no `.env.example`, no `vercel.json` (so Vercel functions default to `iad1`). `.env*` is already gitignored. `ensureStatic = "navigation"` is on `app/[lang]/layout.tsx`. The catch-all `app/[lang]/[...slug]/page.tsx` resolves sector, guide and accounting-guide paths through a `Resolved` union.
- **Nav and footer already link to unbuilt pages:** `/blog/`, `/news/`, eight category paths, and `/blog-en/` in the English footer and `components/home/Resources.tsx` (should be `/blog/`, since `/en/blog-en/` redirects to `/en/blog/`).
- **The counts in the brief need correcting.** `url-map.csv` has 230 `post` rows, but one is `/blog/` (the index) and one is `/en/accounting-software/choose-accounting-software/` (carries the blog index's title; needs a look). The REST API reports 231 posts. News: 5 articles plus the `/news/` and `/en/news/` indexes make the 7 rows. Categories: 23 keep, 5 redirect to `/blog/`, 2 retire. There are no rows for `/blog/page/N/` or `/author/…`.
- **Post paths:** 226 at `/<category>/<slug>/`, 2 at root. Categories sit at root (`/accounting/`), with no `/category/` base.
- **Public REST API exposes:** `authors[]` (PublishPress: slug, display_name, job_title, description, `author_category`), `_embedded` featured media and terms, `content.rendered` (keeps `data-start` and in-body H1s, but has no Elementor CTA or lazy-load markup). It does **not** expose Rank Math fields, a per-post language, or translations; `rankmath/v1/getHead` is 404.
- **Reviewer:** Faisal Al-Mutairi is the second PublishPress author on about 98% of posts. The live JSON-LD hard-codes him as `reviewedBy` on every post, with `jobTitle` «محاسب قانوني ومراجع معتمد».
- **Author bios are junk** ("test1", lorem ipsum), and the live SASWP schema leaks two authors' email addresses. Neither is imported.
- **Live posts show no author, reviewer, date or breadcrumb visibly**; the new template adds them (strategy §4, §9).
- **`public/wp-content/uploads/`** holds 13 files (the e-invoicing PDF and the 12 invoice templates). A blanket `/wp-content/uploads/:path*` redirect would shadow them, because redirects run before the filesystem.

## Decisions I am making (say if you disagree)

1. **SEO title and description come from `wp-url-inventory.csv`**, not Rank Math (not reachable). For records missing there, the import reads the live page's `<head>` (GET). Titles are stored whole and rendered absolute, so they match the inventory exactly.
2. **Reviewer = the PublishPress author with the reviewer category (Faisal); writer = the other one.** Posts with no reviewer in PublishPress are listed in the report rather than filled in silently.
3. **Media keeps old URLs alive two ways.** Each original is uploaded to R2 at its original key and bytes (so indexed image URLs and Google Images keep resolving through the 301), plus a `<stem>.webp` beside it that the content uses. WordPress size variants (`-300x135.jpg`) 301 to the original.
4. **The `/wp-content/uploads` redirect excludes whatever is in `public/wp-content/`.** `next.config.ts` walks that folder at config time and builds the exclusion, so the PDF and the 12 templates keep serving from the site, byte for byte.
5. **Unknown URLs never hit the database.** The catch-all resolves against one cached path index (`postPaths()`, tag `posts`), then loads the record.
6. **Body is stored as Tiptap JSON and sanitised HTML; pages render the HTML.** Import and editor share one extension list, and the import round-trips HTML → JSON → HTML and reports any post whose text changed.
7. **A second H1 inside a body becomes H2** (strategy §6); those posts are listed in the report.
8. **Category pagination** `/<category>/page/N/` is built like `/blog/page/N/`, self-canonical. Page size matches the live site (checked during the build).
9. **Related posts:** three latest from the same primary category.
10. **Author pages at `/author/<slug>/`** (WordPress's path), Arabic, with empty bios until real ones are written. No invented credentials.
11. **Language** comes from the `/en/` prefix of the WordPress link, since Polylang's field is not exposed (re-checked with your app password).
12. **New surfaces go through the Impeccable flow** as every page has: post template, blog index, category archive and author page as one "read" family; the admin as a plain "operate" tool in brand tokens. You pick the post layout before I build it.

## Risks to know before approving

- **Leads with the anon key.** The anon key is public, so anyone can insert into `leads` directly and skip Turnstile. I follow the brief (anon insert, no select) and add length and format `CHECK` constraints. The stronger fix is inserting from the server with a secret key; that needs your ruling since the brief limits the service key to scripts.
- **Builds depend on Supabase being awake.** A paused project fails the build; the daily keep-alive covers it.
- **Long posts will exceed 100 KB of HTML**, as the guides do (the RSC payload repeats the body). I will measure and report; the template markup stays lean.
- **A CSP does not exist yet.** Adding a static one site-wide needs `'unsafe-inline'` for scripts (no nonces on static pages) and a pass over every page.
- **A second root layout** (admin) makes `lang()` from `next/root-params` typed `string | undefined` everywhere; existing code already narrows with `isLocale`, and typecheck will catch the rest.
- **Self-hosted runners:** no `.github/` exists. The workflows will use `runs-on: self-hosted` and run `pg_dump` from a `postgres:17` container; tell me if your runners have a label or no Docker.

## Phase 0: Supabase project (after approval, through the MCP)

Exactly as the brief: verify MCP tools respond → list organisations and projects (stop if two active projects exist; ask if several organisations) → propose the region and wait → confirm $0 → create `vom-website` with a generated password shown once → wait for healthy → write URL and publishable key to `.env.local` → checklist for the service role key and auth settings the MCP cannot change → record ref and region in `docs/architecture.md`.

Region I expect to propose: **eu-central-1 (Frankfurt)**, with Vercel functions pinned to `fra1` in a new `vercel.json` (they default to Washington today). Supabase has no Gulf region; public pages are static, so the database is only reached by builds, revalidation, the admin and lead inserts. Mumbai (`ap-south-1` + `bom1`) is the alternative. Confirmed against the MCP's region list at that step.

## Phase 1: schema and content layer

**Migrations** in `supabase/migrations/` (applied with the MCP migration tool):

- `posts`, `categories`, `post_categories`, `authors`, `leads`, `admins` with the columns in the brief. Additions: `posts.type` and `status` and `lang` as `text` with `CHECK` (easy to extend to `template`); `categories.wp_id`, `authors.wp_id` for idempotent upserts; `updated_at` triggers; indexes on `posts(status, lang, published_at desc)`, `posts(primary_category_id)`, `post_categories(category_id)`, and every foreign key.
- **RLS on every table, default deny.** `is_admin()` (`security definer`, fixed `search_path`) checks `admins`. Policies: `anon`/`authenticated` select published posts, all categories, authors, `post_categories`; `anon` insert on `leads` only; admins full access on everything; `admins` readable only by admins. Table grants trimmed to match, so a missing policy means no access.
- Then the security and performance advisors, fixes, and `lib/supabase/types.ts` generated by the MCP.

**Code:**

- `lib/supabase/public.ts`: cookie-free anon client (`server-only`). `lib/supabase/server.ts`: `@supabase/ssr` cookie client for the admin.
- `lib/content/posts/`: `getPostByPath`, `listPosts`, `listCategories`, `getCategory`, `getAuthor`, `postPaths`, `relatedPosts`, each `'use cache'` + `cacheLife('max')` + tags `posts`, `post-<id>`, `category-<id>`, `authors`.
- `app/[lang]/[...slug]/page.tsx`: new `Resolved` kinds `post`, `category`, `category-page`, `author`; `generateStaticParams` adds every path from `postPaths()`. New routes `app/[lang]/blog/page.tsx`, `blog/page/[n]/page.tsx`, `news/page.tsx`.
- `components/blog/`: `PostPage`, `BlogIndex`, `CategoryPage`, `AuthorPage`, `PostBody` (renders `content_html`, builds image `srcset` with `lib/image-url.ts`). Reuses `Breadcrumb`, `JsonLd`, `useActiveSection` for the contents rail, `.ein-body` prose, table and FAQ styles, `sec-close-band`, `guideDate`.
- `lib/seo/jsonld.ts`: `articleJsonLd` (locale-aware; `author` with URL, `reviewedBy` with `jobTitle` and `sameAs`, dates, image, publisher), generalising `guideJsonLd` without changing the guides' output. No `FAQPage`.
- `app/sitemap.ts` → `generateSitemaps` (`pages`, `posts`, `news`), `lastModified` from `modified_at`; `app/robots.ts` lists all three and disallows `/admin`.
- Dictionary fixes: `/blog-en/` → `/blog/`.

## Phase 2: WordPress import (`scripts/import-wordpress.mjs`)

- Flags `--dry-run`, `--limit N`. Reads `WP_*`, Supabase service key and R2 keys from `.env.local`. GET only against WordPress. Upserts on `wp_id`.
- Pulls `posts`, `news`, `categories`, `ppma_author` (authors), users, with `_embed`, paginated.
- **Mapping:** `path` = decoded link path; `title` = `title.rendered`; `seo_title`/`seo_description` = inventory CSV; `excerpt`; dates from `date_gmt`/`modified_gmt`; cover = full-size featured media + its alt; `primary_category_id` = the category in the path; all categories → `post_categories`; author/reviewer per decision 2; reviewer job title from the live schema; FAQ stays in the body as content.
- **Cleaning** (node-html-parser, in the style of the existing import scripts): drop `data-*`, inline styles, empty `<p>`/`<span>`, Gutenberg classes, `<b>` wrappers in headings; keep headings, lists, tables, links, images, figures; internal links → relative decoded paths; external links get `rel="noopener"`.
- **Media:** per decision 3, via `@aws-sdk/client-s3` and sharp (Next's copy); content URLs → `https://media.getvom.com/…`.
- **Report:** url-map `keep` rows for post/news matched to records (with the corrected expectation: 228 real posts + the odd English row, 5 news), missing ones, title/description mismatches against the inventory, posts with no reviewer, demoted H1s, round-trip text changes, broken images, duplicate paths. Then row counts and spot checks through the MCP.
- `next.config.ts`: the uploads 301 (decision 4), the size-variant 301, `images.remotePatterns` for `media.getvom.com`.

## Phase 3: admin

- `app/(admin)/admin/…` with its own root layout (LTR/RTL toggle per post, `robots: noindex`), outside `app/[lang]`; `admin` added to the `ARABIC_PATH` exclusion.
- `proxy.ts` with matcher `/admin/:path*` only: refreshes the session, sends signed-out users to `/admin/login/`. Public pages never pass through it.
- `lib/admin/require-admin.ts`: every server action and page checks the session **and** `admins` membership.
- First admin: you create your user in the dashboard (steps supplied); I look up the ID through the MCP and add it in a seed migration.
- **Editor:** Tiptap (`@tiptap/react`, starter kit, table, link, image with alt and caption, custom callout and FAQ-item nodes). Shared extension list in `lib/editor/` used by the editor, the save action and the import. Side panel, preview, draft autosave, posts list with search and filters, categories and authors screens, all as in the brief. Path locks after first publish, with a warning.
- **Uploads:** browser resize to WebP (max 1600 px) → server action returns a presigned PUT (5 min, `image/webp`, `uploads/YYYY/MM/<name>`) → browser PUTs to R2.
- **Publishing:** save/publish actions sanitise, write, then `revalidateTag` for `post-<id>`, `posts` and the affected categories. `app/api/revalidate/route.ts` checks `REVALIDATE_SECRET`.

## Phase 4: lead plumbing only (no forms)

- `lib/leads/submit-lead.ts`: `submitLead(form, data)` — zod schema per form in a small registry (empty for now, one test form), Turnstile server check, anon insert, optional Resend email after the insert, localised result.
- `components/forms/Turnstile.tsx`: loads the script lazily, only where a form renders.
- Admin leads list with form and date filters and CSV export.
- Static CSP in `next.config.ts` (Turnstile, Supabase, `media.getvom.com`, `*.r2.cloudflarestorage.com`), checked on every built page.

## Phase 5: free-plan safety

- `.github/workflows/supabase-keepalive.yml` (daily, one small select) and `supabase-backup.yml` (weekly `pg_dump` → private R2 backup bucket, keep 8). Secrets listed for you.

## Docs and env

- `.env.example` with every variable in the brief; `docs/architecture.md` §1, §4, §7, §9, §10 and the open items rewritten; `docs/content/inventory.md` migration mechanics updated; `CLAUDE.md` content-layer line updated; memory updated.

## What I need from you (none of it blocks the build)

- [ ] Sign in to the Supabase MCP (`/mcp`), then the region confirmation.
- [ ] Service role key (dashboard → Project Settings → API keys), pasted to me.
- [ ] Auth settings the MCP cannot change (checklist supplied in Phase 0).
- [ ] Your admin user (Authentication → Users).
- [ ] R2: media bucket + `media.getvom.com` + CORS for PUT; backup bucket; a token scoped to those buckets, Object Read & Write.
- [ ] Turnstile site and secret keys.
- [ ] `WP_BASE_URL`, `WP_USER`, `WP_APP_PASSWORD`.
- [ ] Vercel env vars and GitHub Actions secrets (lists supplied).
- [ ] Commit or stash the finished `/templates/` work first, so this lands on a clean tree (your call; I do not commit unless asked).

## Verification (per phase, then the brief's definition of done)

- After each phase: `pnpm lint`, `pnpm exec tsc --noEmit`, clean `.next/cache/turbopack`, `pnpm build`, `next start -p 3100`.
- `scripts/check-blog-urls.mjs`: every `keep` post, news and category row returns 200 with the inventory's title, description and an absolute self-canonical; output pasted in the hand-over.
- Advisors show no security warnings; migrations in Git match the project.
- Build output shows blog routes static; HTML size of the longest post measured; Lighthouse mobile on a post.
- Article JSON-LD checked against schema.org's required fields with a validator script.
- Admin: log in, edit and publish a post, see the page change on the running server without a rebuild; upload an image and load it from `media.getvom.com` (needs your R2 setup).
- Lead: a test insert lands; a request with no Turnstile token is rejected.
- Playwright at 390 and 1440 px: post, blog index, category, admin; both locales where they exist.
