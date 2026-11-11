import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Arabic lives at `/`, English at `/en`. Routes are built under `app/[lang]`, so
 * every unprefixed path is rewritten to `/ar/...` internally and any literal
 * `/ar/...` request is sent back to the unprefixed URL so Arabic never has two
 * indexable addresses. See docs/architecture.md §2 and §3.
 */
const ARABIC_PATH =
  "/:path((?!en(?:/|$)|ar(?:/|$)|api(?:/|$)|_next(?:/|$)|.*\\..*).*)";

const securityHeaders = [
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
      // Free invoice templates: the owner moved both pages to /templates/ (2026-11-11).
      // The unprefixed /sales-invoices/ already led to the English page on the live
      // site. The Arabic source is percent-encoded, as the request path arrives.
      {
        source: encodeURI("/نماذج-فواتير"),
        destination: "/templates/",
        statusCode: 301,
      },
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
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
