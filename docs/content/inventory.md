# Content inventory of getvom.com (WordPress)

Crawled 2026-10-25 from the Rank Math sitemaps and the WordPress REST API. Per-URL detail is in `wp-url-inventory.csv`; the migration decision per URL is in `url-map.csv`.

## Platform today

WordPress with the Sydney theme, Elementor and Elementor Pro, ElementsKit, Smart Slider 3, Ultimate Post, Rank Math SEO, Polylang (via Connect Polylang Elementor), PublishPress Authors, WP Rocket, PixelYourSite. Google Tag Manager `GTM-PS28X6L`, Zendesk, Crisp and a TikTok pixel are loaded on every page. Media library: 2,709 files.

## What exists

| Type | Count | Where | Notes |
|---|---|---|---|
| Blog posts | 230 | `/<category>/<arabic-slug>/`, a few at root | Arabic only. Average about 1,400 words of body. Article schema with author and reviewer. Content HTML carries pasted-editor artefacts (`data-start`, `data-end`). |
| Pages | 93 live (95 in WP) | Arabic at root, English under `/en/` | Includes 15 sector pages per language, 4 integration pages per language, an e-invoicing pillar with 14 child guides, pricing, features, about, contact, student package, growth plan, glossary, terms. About 20 are test, duplicate or campaign pages. |
| Templates | 45 | `/templates/<slug>/` | Downloadable Excel, Word and PDF forms with explanatory articles; direct download. |
| Tools | 7 | `/tools/<slug>/` | Calculators: company zakat, zakat, zakat base, VAT, salary, discount, profit margin. |
| News | 5 | `/news/<slug>/` | Partnership announcements. |
| Categories | 39 in WP, 30 in sitemap | Mixed Arabic and Latin slugs | 10 carry most posts; several are empty, duplicated (two "digital marketing" variants, one a typo) or English-only with one post. |
| Authors | 9 | `/author/<slug>/` | Abass Sahrawi writes most posts; Faisal Al-Mutairi reviews; others include Abdulrahman Fani, Noura Alnafea, Islam, Maha, Miled Elias, Hamza Ait, admin. Bios empty; one is lorem ipsum. |

## Decisions in `url-map.csv`

| Action | Count | Meaning |
|---|---|---|
| keep | 387 | Same path, same content, migrated one to one |
| keep-noindex | 5 | Utility pages (thank-you, payment results) kept but not indexed |
| redirect | 10 | Duplicates and renamed pages, 301 to the listed target |
| retire | 11 | Test, campaign and already-dead pages, 410 |

Notable rows:

- Three sitemap URLs already return 404 (`/en/pricing-Packages/`, two empty English categories): remove from the sitemap, return 410.
- `/pricing-ar/` duplicates `/pricing/`: 301.
- `/growth-program-old/` → `/growth-plan/`: 301.
- `/about-us-2/`, `/en/contact-us-2/`, `/en/student-package-2/` carry WordPress "-2" suffixes. They are kept at launch; renaming them is an optional post-launch 301.
- `/terms-and-conditions-ar/` has an empty title in WordPress and needs a real one.
- 17 URLs lack a meta description (mostly category archives); they get one before launch.

## Migration mechanics

1. Export via the REST API (`/wp-json/wp/v2/posts`, `pages`, `templates`, `tools`, `news`, `categories`, `users`, `media`) with `_embed` for featured images. Rank Math exposes no public head endpoint, so titles and descriptions come from the crawl file.
2. Convert HTML to MDX: strip editor attributes and inline styles, re-level headings (one H1 from the title, body starts at H2), convert tables and lists, keep inline images as `next/image`-compatible references, keep FAQ blocks as structured components so they can emit `FAQPage` schema.
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

## Quality work after launch

- Shorten the 359 titles over 60 characters in batches of 30, measuring each batch.
- Expand the 15 sector pages (today about 450 words of body each).
- Consolidate categories: keep the 10 live ones, merge the rest.
- Build the glossary hub, comparison pages and the new tools listed in `docs/seo/strategy.md` §4.
