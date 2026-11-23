import { readdirSync, readFileSync } from "node:fs";
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

const ARABIC_PATH = `/:path((?!en(?:/|$)|ar(?:/|$)|api(?:/|$)|admin(?:/|$)|${ADMIN_SEGMENT}(?:/|$)|digital-ads-2023-landing-page(?:/|$)|_next(?:/|$)|.*\\..*).*)`;

/**
 * A static Content-Security-Policy: no nonces, because a nonce would make every
 * page render per request. Next.js writes inline scripts and styles into each
 * page, so both need 'unsafe-inline'; everything else is named:
 * - Cloudflare Turnstile on lead forms (script, frame, verification call);
 * - Supabase for the admin's sign-in and data;
 * - media.getvom.com for images, and the R2 endpoint the admin uploads to;
 * - YouTube's no-cookie player on the integration pages;
 * - Google Tag Manager (GTM-PS28X6L, loaded once the page is interactive) and
 *   the tags its container fires: GA4 through the server container at
 *   edge.getvom.com, Google Ads conversions, the Meta pixel and Stape's scripts.
 *   The container's Custom JavaScript variables (the enhanced-conversion user
 *   data) run through eval, hence 'unsafe-eval'. Checked against the live
 *   container on 2026-11-12; a tag added in GTM later may need its origin here.
 *   Left blocked on purpose: the Meta template's helper script from the public
 *   npm CDNs (jsdelivr, unpkg) and the Meta pixel's calls to *.run.app and
 *   *.on.aws hosts, which would open the policy to any package or cloud app.
 *   The pixel's own PageView and Lead hits pass.
 */
const GOOGLE_TAGS = "https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net";
const TAG_BEACONS = [
  "https://edge.getvom.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.google.com",
  "https://google.com",
  "https://www.google.com.sa",
  "https://*.doubleclick.net",
  "https://www.googleadservices.com",
  "https://pagead2.googlesyndication.com",
  "https://www.facebook.com",
  "https://connect.facebook.net",
].join(" ");
/**
 * PostHog goes through the reverse proxy at n.getvom.com, which serves both the
 * ingestion calls and the library's own scripts, so one origin covers both. On
 * PostHog's own hosts (us.i.posthog.com) the scripts come from a second host,
 * us-assets.i.posthog.com.
 */
const POSTHOG_CSP = (() => {
  try {
    const ingestionHost = new URL(process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "");
    const direct = ingestionHost.hostname.endsWith(".i.posthog.com");
    return {
      ingestion: ingestionHost.origin,
      assets: direct ? `${ingestionHost.protocol}//${ingestionHost.hostname.replace(".i.", "-assets.i.")}` : ingestionHost.origin,
    };
  } catch {
    return null;
  }
})();
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com ${GOOGLE_TAGS} https://connect.facebook.net https://stapecdn.com https://edge.getvom.com ${POSTHOG_CSP?.assets ?? ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${process.env.MEDIA_BASE_URL || "https://media.getvom.com"} ${GOOGLE_TAGS} ${TAG_BEACONS}`,
  "font-src 'self'",
  `connect-src 'self' https://*.supabase.co https://*.r2.cloudflarestorage.com https://challenges.cloudflare.com ${GOOGLE_TAGS} ${TAG_BEACONS} https://stapecdn.com ${POSTHOG_CSP?.ingestion ?? ""}`,
  "worker-src 'self' blob:",
  "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com https://td.doubleclick.net https://www.googletagmanager.com https://edge.getvom.com",
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
 * Links in blog posts that pointed at addresses WordPress never had (a wrong
 * category or a shortened slug). The posts keep their text and links as imported;
 * each address leads to the page its link text names instead (owner, 2026-11-12).
 * Links with no matching page are left to 404.
 */
const postLinkRedirects = (
  [
    ["/tax-zakat/ضريبة-القيمة-المضافة", "/invoicing/ضريبة-القيمة-المضافة/"],
    ["/financial-analysis/تحليل-القوائم-المالية", "/finance/تحليل-القوائم-المالية/"],
    ["/business-legal/الامتثال-الضريبي-للشركات-الصغيرة", "/tax-zakat/الامتثال-الضريبي-للشركات-الصغيرة/"],
    ["/tax-zakat/السلع-والخدمات-المعفاة-من-ضريبة-القيم", "/invoicing/السلع-والخدمات-المعفاة-من-ضريبة-القيم/"],
    ["/طريقة-عمل-فاتورة-إلكترونية", "/الفوترة-الإلكترونية/طريقة-عمل-و-إصدار-فاتورة-الكترونية/"],
    ["/finance/القوائم-المالية", "/accounting/القوائم-المالية/"],
    ["/مراحل-تطبيق-الفوترة-الإلكترونية", "/الفوترة-الإلكترونية/مراحل-تطبيق-الفاتورة-الإلكترونية/"],
    ["/من-نحن", "/about-us/"],
  ] as const
).map(([source, destination]) => ({ source: encodeURI(source), destination: encodeURI(destination), statusCode: 301 as const }));

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

/**
 * Addresses retired for good: the `retire` rows of docs/content/url-map.csv.
 * Each is rewritten to app/api/gone/route.ts, which answers 410. The path is the
 * row's third column; the two before it never hold a comma.
 */
const retiredPaths = readFileSync(join(process.cwd(), "docs/content/url-map.csv"), "utf8")
  .split("\n")
  .slice(1)
  .map((line) => line.split(","))
  .filter((cells) => cells[4] === "retire" && cells[2]?.startsWith("/"))
  .map((cells) => encodeURI(cells[2].replace(/\/$/, "")));

/** A Vercel deployment that is not the production one: a preview or a development build. */
const NOT_PRODUCTION = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";

const nextConfig: NextConfig = {
  env: {
    // Which deployment built this: "production", "preview", or "development" off Vercel. Every
    // PostHog event carries it (instrumentation-client.ts, lib/analytics/server.ts), so tests on a
    // laptop or a preview can be filtered out of the visitors' numbers.
    DEPLOYMENT_ENV: process.env.VERCEL_ENV || "development",
  },
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  experimental: {
    globalNotFound: true,
    // Vercel restores .next/cache before every build, and since 16.3 Turbopack keeps
    // its build work there. On 2026-11-19 a restored cache fed Tailwind an old copy of
    // app/globals.css: the deployment shipped the previous font stack and component
    // styles alongside the new pages (Tailwind's class scan, which reads the disk
    // itself, was current). Every build starts cold so the CSS always matches the commit.
    turbopackFileSystemCacheForBuild: false,
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
        // Before the Arabic rewrite, so a retired address never reaches a page route.
        ...retiredPaths.map((source) => ({ source, destination: "/api/gone" })),
        // The blog's RSS feed keeps its WordPress address.
        { source: "/feed", destination: "/api/feed" },
        // The sitemap index. app/sitemap.ts owns the name /sitemap.xml as a metadata file but, split by
        // type, serves only /sitemap/<id>.xml, so the index is a route of its own behind this rewrite.
        { source: "/sitemap.xml", destination: "/api/sitemap-index" },
        // /llms.txt is built from the content catalogues (app/api/llms/route.ts), so it lists every guide, tool and sector.
        { source: "/llms.txt", destination: "/api/llms" },
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
      // /sitemap.xml is the index of the five sitemaps (app/api/sitemap-index/route.ts).
      // WordPress (Rank Math) had its own addresses; they lead to it.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
      { source: "/:name([a-z_-]+-sitemap\\d*).xml", destination: "/sitemap.xml", statusCode: 301 },
      // Page 1 of a list is the list itself, as it was on WordPress.
      { source: "/:list*/page/1", destination: "/:list*/", statusCode: 301 },
      // Author records merged or removed on 2026-11-17: the empty duplicates lead to the person's page.
      { source: "/author/abass", destination: "/author/abasssahrawi/", statusCode: 301 },
      { source: "/author/noura", destination: "/author/nnafea/", statusCode: 301 },
      // The tax workshop was published twice, as news and as a post; the post stays.
      {
        source: encodeURI("/news/ڤوم-تقدم-ورشة-الضرائب-في-السعودية"),
        destination: encodeURI("/tax-zakat/ڤوم-تقدم-ورشة-الضرائب-في-السعودية-لتع/"),
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
      ...postLinkRedirects,
      ...mediaRedirects,
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Preview and development deployments on Vercel are never indexed (docs/seo/strategy.md §7.2).
      ...(NOT_PRODUCTION ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
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
