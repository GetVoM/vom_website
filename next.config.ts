import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Arabic lives at `/`, English at `/en`. Routes are built under `app/[lang]`, so
 * every unprefixed path is rewritten to `/ar/...` internally and any literal
 * `/ar/...` request is sent back to the unprefixed URL so Arabic never has two
 * indexable addresses. See docs/architecture.md §2 and §3. The admin (/admin) has its
 * own root layout outside app/[lang] and is left alone.
 */
/**
 * The admin's public address: /admin by default, or /<ADMIN_PATH>/ when that
 * private variable is set (one segment of lowercase letters, digits and
 * hyphens). The route folder stays app/(admin)/admin; the rewrites below map
 * the chosen address onto it and make /admin itself a 404. Keep this in step
 * with lib/admin/path.ts and proxy.ts, which read the same variable.
 */
const adminPath = (process.env.ADMIN_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");
const ADMIN_SEGMENT = /^[a-z0-9][a-z0-9-]{1,62}$/.test(adminPath) ? adminPath : "admin";

const ARABIC_PATH = `/:path((?!en(?:/|$)|ar(?:/|$)|api(?:/|$)|admin(?:/|$)|${ADMIN_SEGMENT}(?:/|$)|_next(?:/|$)|.*\\..*).*)`;

/**
 * A static Content-Security-Policy: no nonces, because a nonce would make every
 * page render per request. Next.js writes inline scripts and styles into each
 * page, so both need 'unsafe-inline'; everything else is named:
 * - Cloudflare Turnstile on lead forms (script, frame, verification call);
 * - Supabase for the admin's sign-in and data;
 * - media.getvom.com for images, and the R2 endpoint the admin uploads to;
 * - YouTube's no-cookie player on the integration pages;
 * - Google Tag Manager, which the layout will load after interaction.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${process.env.MEDIA_BASE_URL || "https://media.getvom.com"} https://www.googletagmanager.com https://www.google-analytics.com`,
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co https://*.r2.cloudflarestorage.com https://challenges.cloudflare.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/**
 * Sector pages: WordPress gave most English twins a "-2" or "-en" slug, and served
 * every English slug without its /en prefix as a redirect to it (checked on the live
 * site, 2026-11-10). Each old slug, with or without the prefix, goes straight to the
 * clean English URL.
 * Pairs: [old slug, clean slug]; the clean paths live in lib/i18n/routes.ts.
 */
const SECTOR_SLUGS: [string, string][] = [
  ["accounting-software-for-food-and-beverages-2", "accounting-software-for-food-and-beverages"],
  ["accounting-software-for-beauty-salons", "accounting-software-for-beauty-salons"],
  ["accounting-software-for-gym-and-fitness-centers", "accounting-software-for-gym-and-fitness-centers"],
  ["accounting-software-for-law-firms-2", "accounting-software-for-law-firms"],
  ["accounting-software-for-design-offices", "accounting-software-for-design-offices"],
  ["accounting-software-for-marketing-agencies-2", "accounting-software-for-marketing-agencies"],
  ["accounting-software-for-logistical-services-2", "accounting-software-for-logistical-services"],
  ["accounting-software-for-travel-and-tourism", "accounting-software-for-travel-and-tourism"],
  ["accounting-software-for-car-maintenance-centers-en", "accounting-software-for-car-maintenance-centers"],
  ["accounting-software-for-applications-and-ecommerce-2", "accounting-software-for-applications-and-ecommerce"],
  ["accounting-software-for-perfume-stores-2", "accounting-software-for-perfume-stores"],
  ["accounting-software-for-real-estate-and-construction-2", "accounting-software-for-real-estate-and-construction"],
  ["accounting-software-for-investment-firms-2", "accounting-software-for-investment-firms"],
  ["accounting-software-for-printing-and-advertising-agencies-2", "accounting-software-for-printing-and-advertising-agencies"],
  ["accounting-software-for-day-care-centers-2", "accounting-software-for-day-care-centers"],
];

const sectorRedirects = SECTOR_SLUGS.flatMap(([old, clean]) => {
  const destination = `/en/${clean}/`;
  const sources = [`/${old}`];
  if (old !== clean) sources.push(`/en/${old}`);
  // The live site also answered the clean car slug without its prefix.
  if (old.endsWith("-en")) sources.push(`/${clean}`);
  return sources.map((source) => ({ source, destination, statusCode: 301 as const }));
});

/**
 * WordPress media now lives in Cloudflare R2 at media.getvom.com, under the same
 * keys, so every old /wp-content/uploads/ URL is sent there. Redirects run before
 * the filesystem, so the few files this site still serves itself from
 * public/wp-content/uploads/ (the invoice templates, the e-invoicing plan PDF)
 * are read here and left out of the redirect.
 */
const MEDIA_URL = (process.env.MEDIA_BASE_URL || "https://media.getvom.com").replace(/\/$/, "");
const UPLOADS_DIR = join(process.cwd(), "public/wp-content/uploads");

function localUploads(): string[] {
  try {
    return readdirSync(UPLOADS_DIR, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => relative(UPLOADS_DIR, join(entry.parentPath, entry.name)).split("\\").join("/"));
  } catch {
    return [];
  }
}

// The request path arrives percent-encoded, so the Arabic file name is matched in that form.
const servedHere = localUploads()
  .map((file) => encodeURI(file).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");
const NOT_SERVED_HERE = servedHere ? `(?!(?:${servedHere})$)` : "";

const mediaRedirects = [
  // WordPress size variants (name-300x135.jpg) were not copied: send them to the original.
  {
    source: `/wp-content/uploads/:path(${NOT_SERVED_HERE}.*)-:size(\\d+x\\d+).:ext(jpe?g|png|webp|gif)`,
    destination: `${MEDIA_URL}/wp-content/uploads/:path.:ext`,
    statusCode: 301 as const,
  },
  {
    source: `/wp-content/uploads/:path(${NOT_SERVED_HERE}.*)`,
    destination: `${MEDIA_URL}/wp-content/uploads/:path`,
    statusCode: 301 as const,
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  experimental: {
    globalNotFound: true,
    // The router predicts a page's route from patterns it has already seen. Having
    // seen /en/ as [lang], it reads an Arabic link such as /vom-zid/ as [lang]=vom-zid;
    // the server answers for /ar/vom-zid, and in 16.4.3 the router re-requested that
    // segment in a loop (about 500 requests a second per link on the Arabic homepage).
    // Off, the router asks the server for each route it has not seen yet.
    optimisticRouting: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Fewer candidates keep every srcset, and so every page's HTML, smaller.
    deviceSizes: [640, 1080, 1600],
    imageSizes: [48, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [{ protocol: "https", hostname: new URL(MEDIA_URL).hostname }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return {
      beforeFiles: [
        // A renamed admin: /admin answers as any unknown page does (the first rule
        // sends it to a path nothing serves), and the chosen address reaches the
        // admin routes. The order matters: the hiding rule must come first.
        ...(ADMIN_SEGMENT === "admin"
          ? []
          : [
              { source: "/admin", destination: "/ar/admin-is-not-here" },
              { source: "/admin/:path*", destination: "/ar/admin-is-not-here" },
              { source: `/${ADMIN_SEGMENT}`, destination: "/admin" },
              { source: `/${ADMIN_SEGMENT}/:path*`, destination: "/admin/:path*" },
            ]),
        { source: "/", destination: "/ar" },
        { source: ARABIC_PATH, destination: "/ar/:path" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Trailing slashes stated so each is one hop to the final URL, with no chain.
      {
        source: "/ar",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/ar/:path+",
        destination: "/:path+/",
        statusCode: 301,
      },
      // The sitemap is split by type; the old single address leads to the pages one.
      {
        source: "/sitemap.xml",
        destination: "/sitemap/pages.xml",
        statusCode: 301,
      },
      // Old WordPress slugs. See the redirect rows in docs/content/url-map.csv.
      {
        source: "/en/contact-us-2",
        destination: "/en/contact-us/",
        statusCode: 301,
      },
      {
        source: "/about-us-2",
        destination: "/about-us/",
        statusCode: 301,
      },
      {
        source: "/terms-and-conditions-ar",
        destination: "/terms-and-conditions/",
        statusCode: 301,
      },
      {
        source: "/growth-program-old",
        destination: "/growth-plan/",
        statusCode: 301,
      },
      // The live site already sends this English slug to /en/growth-plan/.
      {
        source: "/en/growth-plan-en",
        destination: "/en/growth-plan/",
        statusCode: 301,
      },
      // Student package: the English "-2" slug, and the unprefixed "-2" slug that led to it.
      {
        source: "/en/student-package-2",
        destination: "/en/student-package/",
        statusCode: 301,
      },
      {
        source: "/student-package-2",
        destination: "/en/student-package/",
        statusCode: 301,
      },
      // Pricing: the live site already sends /en/pricing-en/ (and the unprefixed
      // /pricing-en/, in two hops) to /en/pricing/; /pricing-ar/ duplicated /pricing/.
      {
        source: "/en/pricing-en",
        destination: "/en/pricing/",
        statusCode: 301,
      },
      {
        source: "/pricing-en",
        destination: "/en/pricing/",
        statusCode: 301,
      },
      {
        source: "/pricing-ar",
        destination: "/pricing/",
        statusCode: 301,
      },
      // Features: the live site already sends /en/features-en/ (and the unprefixed
      // /features-en/, in two hops) to /en/features/.
      {
        source: "/en/features-en",
        destination: "/en/features/",
        statusCode: 301,
      },
      {
        source: "/features-en",
        destination: "/en/features/",
        statusCode: 301,
      },
      // Free invoice templates: the English page lives at /en/templates/ (owner,
      // 2026-11-11); the Arabic one keeps /نماذج-فواتير/. The unprefixed
      // /sales-invoices/ already led to the English page on the live site.
      {
        source: "/en/sales-invoices",
        destination: "/en/templates/",
        statusCode: 301,
      },
      {
        source: "/sales-invoices",
        destination: "/en/templates/",
        statusCode: 301,
      },
      // An empty WordPress shell titled "Vom"; the owner sent it to the homepage.
      {
        source: "/get-free-version",
        destination: "/",
        statusCode: 301,
      },
      // Integration pages: WordPress gave the English twins a "-2" slug, and the
      // unprefixed "-2" slugs led to them. Both go straight to the clean English URL.
      ...["foodics", "marn", "zid"].flatMap((id) => [
        { source: `/en/vom-${id}-2`, destination: `/en/vom-${id}/`, statusCode: 301 as const },
        { source: `/vom-${id}-2`, destination: `/en/vom-${id}/`, statusCode: 301 as const },
      ]),
      ...sectorRedirects,
      // Duplicate and empty blog categories lead to the blog index (url-map.csv).
      ...["/news-ar", "/uncategorized-ar", "/المحاسبة/إدارة-الحسابات", "/المحاسبة", "/تمويل-الشركات"].map((source) => ({
        source: encodeURI(source),
        destination: "/blog/",
        statusCode: 301 as const,
      })),
      // English blog and news addresses WordPress used before.
      { source: "/en/blog-en", destination: "/en/blog/", statusCode: 301 as const },
      { source: "/en/news-archive-en", destination: "/en/news/", statusCode: 301 as const },
      ...mediaRedirects,
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The admin is never indexed, whatever its address.
      { source: `/${ADMIN_SEGMENT}/:path*`, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

/**
 * Long-form content (the e-invoicing guides today, the blog later) is MDX under
 * `content/`, read only through `lib/content/` (docs/architecture.md §4).
 * Plugins are named as strings so Turbopack can load them.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
