import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
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
      {
        source: "/ar/:path*",
        destination: "/:path*",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
