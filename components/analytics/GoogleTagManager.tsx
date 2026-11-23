import Script from "next/script";
import { preload } from "react-dom";

declare global {
  interface Window {
    /** Google Tag Manager's queue: pushed by the lead forms and the web vitals before or after GTM loads. */
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Google Tag Manager, started once the page is interactive, as @next/third-parties
 * did, but without its preload at high priority: that put the container (about
 * 180 KB) on the critical path beside the stylesheet and the fonts, though it
 * only runs after hydration. Here gtm.js is preloaded at low priority, so it is
 * usually in the cache by the time the snippet asks for it, and the tags fire
 * at the same moment as before. The snippet is GTM's own, minus the noscript
 * frame. Production only (lib/seo/tags.ts).
 */
export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  const src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  preload(src, { as: "script", fetchPriority: "low" });
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,l,s){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;j.src=s;d.head.appendChild(j);})(window,document,'dataLayer',${JSON.stringify(src)});`}
    </Script>
  );
}
