import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { effra } from "@/app/fonts";
import { site } from "@/lib/seo/site";
import { loadTags } from "@/lib/seo/tags";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: "VoM",
  formatDetection: { telephone: false },
  // Paid-campaign pages: reached from ads, never from search (owner, 2026-11-12).
  robots: { index: false, follow: true },
};

/**
 * The root layout of the paid-campaign landing pages, outside app/[lang]: no
 * site header, navigation or footer, so the page's one action is its form.
 * Arabic only. Each page's path is excluded from the Arabic rewrite in
 * next.config.ts. Google Tag Manager carries the campaign's conversion tags, on
 * the production deployment only (lib/seo/tags.ts).
 */
export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={effra.variable}>
      <body className="min-h-full">{children}</body>
      {loadTags && <GoogleTagManager gtmId={site.gtmId} />}
    </html>
  );
}
