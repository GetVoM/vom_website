# Content inventory of getvom.com (WordPress)

Crawled 2026-10-25 from the Rank Math sitemaps and the WordPress REST API. Per-URL detail is in `wp-url-inventory.csv`; the migration decision per URL is in `url-map.csv`.

## Platform today

WordPress with the Sydney theme, Elementor and Elementor Pro, ElementsKit, Smart Slider 3, Ultimate Post, Rank Math SEO, Polylang (via Connect Polylang Elementor), PublishPress Authors, WP Rocket, PixelYourSite. Google Tag Manager `GTM-PS28X6L`, Zendesk, Crisp and a TikTok pixel are loaded on every page. Media library: 2,709 files.

## What exists

| Type | Count | Where | Notes |
|---|---|---|---|
| Blog posts | 230 | `/<category>/<arabic-slug>/`, a few at root | Arabic only. Average about 1,400 words of body. Article schema with author and reviewer. Content HTML carries pasted-editor artefacts (`data-start`, `data-end`). |
| Pages | 93 live (95 in WP) | Arabic at root, English under `/en/` | Includes 15 sector pages per language, 4 integration pages per language, an e-invoicing pillar with 12 child guides (the 13 saved pages; "14" counted the English ZATCA page), pricing, features (built 2026-11-10 at `/features/` and `/en/features/`; its copy and screenshots live in `lib/content/features/` and `public/features/`), about, contact, student package, growth plan, glossary, terms. About 20 are test, duplicate or campaign pages. |
| Templates | 45 | `/templates/<slug>/` | Downloadable Excel, Word and PDF forms with explanatory articles; direct download. |
| Tools | 7 | `/tools/<slug>/` | Calculators: company zakat, zakat, zakat base, VAT, salary, discount, profit margin. Built 2026-11-12 as code-owned Arabic pages with the `/tools/` index; see `docs/content/tools/`. |
| News | 5 | `/news/<slug>/` | Partnership announcements. |
| Categories | 39 in WP, 30 in sitemap | Mixed Arabic and Latin slugs | 10 carry most posts; several are empty, duplicated (two "digital marketing" variants, one a typo) or English-only with one post. |
| Authors | 9 | `/author/<slug>/` | Abass Sahrawi writes most posts; Faisal Al-Mutairi reviews; others include Abdulrahman Fani, Noura Alnafea, Islam, Maha, Miled Elias, Hamza Ait, admin. Bios empty; one is lorem ipsum. |

## Decisions in `url-map.csv`

| Action | Count | Meaning |
|---|---|---|
| keep | 369 | Same path, same content, migrated one to one |
| keep-noindex | 5 | Utility pages (thank-you, payment results) kept but not indexed |
| redirect | 51 | Duplicates and renamed pages, 301 to the listed target |
| retire | 11 | Test, campaign and already-dead pages, 410 |

Notable rows:

- Three sitemap URLs already return 404 (`/en/pricing-Packages/`, two empty English categories): remove from the sitemap, return 410.
- `/pricing-ar/` duplicates `/pricing/`: 301.
- `/growth-program-old/` → `/growth-plan/`: 301.
- `/en/contact-us-2/` → `/en/contact-us/`: 301 (owner, 2026-11-02).
- `/about-us-2/` → `/about-us/`: 301 (owner, 2026-11-02).
- Other English pages still carry WordPress "-2" suffixes. They are kept at launch unless the owner picks the clean slug when the page is rebuilt, as for the pages below.
- `/terms-and-conditions-ar/` → `/terms-and-conditions/`: 301 (owner, 2026-11-09).
- `/en/growth-plan-en/` → `/en/growth-plan/`: 301, matching what the live site already does (2026-11-10).
- `/en/vom-foodics-2/`, `/en/vom-marn-2/`, `/en/vom-zid-2/` → `/en/vom-foodics/`, `/en/vom-marn/`, `/en/vom-zid/`: 301 (owner, 2026-11-10). The live site already serves the clean English URLs. The unprefixed `/vom-*-2/` slugs, which the live site sends to the English `-2` pages, now go to the clean English URL in one hop.
- `/en/student-package-2/` and the unprefixed `/student-package-2/` → `/en/student-package/`: 301 (owner, 2026-11-10).
- English sector pages: the ten `-2` slugs and `/en/accounting-software-for-car-maintenance-centers-en/` → `/en/accounting-software-for-<sector>/`: 301 (owner's standing preference for clean slugs, 2026-11-10). The live site already served the clean car URL, which is now a `keep` row. The live site also sent every English sector slug without its `/en` prefix to the `/en/` page; those 16 unprefixed URLs now go to the clean English URL in one hop. The 15 Arabic sector slugs stay exactly as they are.
- `/en/pricing-en/` and the unprefixed `/pricing-en/` → `/en/pricing/`: 301, matching what the live site already does (it reached `/en/pricing/` from `/pricing-en/` in two hops). The live site already serves `/en/pricing/`, which is now a `keep` row (2026-11-10).
- `/get-free-version/` → `/`: 301. It is an empty shell titled "Vom"; the owner sent it to the homepage rather than the student package (2026-11-10).
- 17 URLs lack a meta description (mostly category archives); they get one before launch.

## Migration mechanics

1. Export via the REST API (`/wp-json/wp/v2/posts`, `pages`, `templates`, `tools`, `news`, `categories`, `users`, `media`) with `_embed` for featured images. Rank Math exposes no public head endpoint, so titles and descriptions come from the crawl file.
2. Convert HTML to MDX: strip editor attributes and inline styles, re-level headings (one H1 from the title, body starts at H2), convert tables and lists, keep inline images as `next/image`-compatible references, keep FAQ blocks as structured components (questions and answers as data, shown on the page; no `FAQPage` schema, owner 2026-11-10).
3. Download media into `public/media/` preserving the original `/wp-content/uploads/...` paths so old image URLs keep resolving. Re-encode to AVIF and WebP at build time through `next/image`.
4. Frontmatter per record: `title`, `seoTitle`, `description`, `path`, `lang`, `alternatePath`, `type`, `categories`, `author`, `reviewedBy`, `publishedAt`, `modifiedAt`, `image`, `imageAlt`, `faq`, `downloads` (templates), `toolConfig` (tools).
5. Build the URL index from frontmatter; the catch-all route resolves paths against it; the SEO test suite reads `url-map.csv` and asserts every `keep` row resolves with the expected metadata.
6. Calculators are rebuilt as client components. The crawl captured only their visible inputs and outputs, not their formulas; each formula must be specified from current ZATCA and GOSI rules and signed off by the reviewing accountant before launch. Their explanatory text migrates as MDX.

## Quality work before launch

- Write the 17 missing descriptions; resolve the 5 duplicate titles; inspect the 40 canonical mismatches.
- Replace the placeholder testimonials ("Client One") with nothing until real ones exist.
- Rewrite English marketing copy natively.
- Write author bios with credentials for the reviewing accountant and main writer.
- Confirm plan prices and feature limits on the pricing page with the team.
- E-invoicing (built 2026-11-10): the hub `/الفوترة-الإلكترونية/` and its 12 guides are rebuilt from the saved HTML into `content/e-invoicing/*.mdx` by `scripts/import-einvoicing.mjs`; every slug kept byte for byte (including the cut-short `…هيئة-الزك/`), no redirects. The hub's PDF keeps its old path under `public/wp-content/uploads/2025/08/`. Body links to blog posts not yet rebuilt 404 on the new site until those posts are built.
- Blog (built 2026-11-11): 231 posts, 5 news items, 24 categories and 12 authors were imported from the WordPress REST API into Supabase by `scripts/import-wordpress.mjs` (idempotent; re-run it up to launch day), with 1,060 media files copied to R2. Every path is kept; two posts published after the crawl were added to `url-map.csv`. SEO titles and descriptions come from `wp-url-inventory.csv`, because Rank Math is not in the REST API. The blog index lists 15 a page, as WordPress did, so `/blog/page/N/` and `/<category>/page/N/` keep their numbers. A post's slug without its category (which WordPress answered) redirects to the post. The steps under "Migration mechanics" below describe the earlier MDX plan; `docs/superpowers/specs/2026-11-11-blog-backend.md` replaces them for posts and news.
- Templates (imported 2026-11-11): the 44 downloadable templates are a third content type beside posts and news, at `/templates/<slug>/`, Arabic only, edited in the admin. Their REST route (`/wp/v2/templates`) is taken by WordPress's own block-template endpoint, so `scripts/import-wordpress.mjs` lists them through the search endpoint and reads each from its public page (H1, post content, cover, and the dates, writer and reviewer in the page's Article schema). Their download links are Google Drive and Docs links inside the body and are kept as they are. `/templates/` is their index again, 15 a page with `/templates/page/N/`.
- Free invoice templates, addresses changed again on 2026-11-11 (owner): the Arabic page is back at `/نماذج-فواتير/` with no redirect; the English page stays at `/en/templates/`; `/en/sales-invoices/` and `/sales-invoices/` 301 to it. The line below describes the first move and is kept for the record.
- Free invoice templates (built 2026-11-11): the owner moved `/نماذج-فواتير/` and `/en/sales-invoices/` to `/templates/` and `/en/templates/`. The two old URLs and the unprefixed `/sales-invoices/` 301 there in one hop. `/templates/`, until now the WordPress templates archive, serves this page. The 12 Word and PDF files keep their old paths under `public/wp-content/uploads/2023/10/`, byte for byte. `scripts/invoice-templates-assets.mjs` copies them and checks each SHA-1. The page shows the six uncropped template renders, which were fetched from the live uploads because the download held only the 1024 px crops. The single templates under `/templates/<slug>/` are not built yet.

## Quality work after launch

- Shorten the 359 titles over 60 characters in batches of 30, measuring each batch.
- Expand the 15 sector pages (today about 450 words of body each).
- Consolidate categories: keep the 10 live ones, merge the rest.
- Build the glossary hub, comparison pages and the new tools listed in `docs/seo/strategy.md` §4.
