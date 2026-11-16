"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cellOn } from "@/components/home/QrCode";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/seo/site";

/** Fired by instrumentation-client.ts when the router starts a navigation; `detail` is the target URL. */
export const NAVIGATION_START = "vom:navigation-start";

/** A navigation faster than this never shows the loader. */
const SHOW_AFTER_MS = 250;
/** A navigation that never lands (a cancelled or failed one) must not leave the veil up. */
const GIVE_UP_AFTER_MS = 10_000;

/** The stand-in QR pattern the site's sample invoices carry, as one path: 21 by 21 modules. */
const qrPath = Array.from({ length: 21 * 21 }, (_, i) => (cellOn(i % 21, Math.floor(i / 21)) ? `M${i % 21} ${Math.floor(i / 21)}h1v1h-1z` : "")).join("");

/**
 * The loader between pages: when a client-side navigation takes more than a moment, a
 * paper veil covers the page under the header and VoM issues an invoice while the visitor
 * waits. The receipt feeds out of the slot (the wordmark, the lines, the total under its
 * double rule, the QR code), then the "reported to ZATCA" tick lands, and it starts again
 * until the next page arrives. The lines are blank bars: there are no figures to invent.
 * It never shows on a page's first load, which is prerendered HTML, and the receipt is
 * only in the document while the veil is up.
 */
export function NavLoader({ label, reported }: { label: string; reported: string }) {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let show: number | undefined;
    let giveUp: number | undefined;
    const stop = () => {
      window.clearTimeout(show);
      window.clearTimeout(giveUp);
    };
    const onStart = (event: Event) => {
      const target = new URL((event as CustomEvent<string>).detail, window.location.href);
      // A hash or query change on the same page has nothing to wait for.
      if (target.pathname === window.location.pathname) return;
      stop();
      show = window.setTimeout(() => setShown(true), SHOW_AFTER_MS);
      giveUp = window.setTimeout(() => setShown(false), GIVE_UP_AFTER_MS);
    };
    window.addEventListener(NAVIGATION_START, onStart);
    // The path changed: the page has arrived.
    return () => {
      window.removeEventListener(NAVIGATION_START, onStart);
      stop();
      setShown(false);
    };
  }, [pathname]);

  return (
    <div className="nav-loader" data-shown={shown || undefined} role="status">
      {shown && (
        <div className="nav-loader-printer" aria-hidden="true">
          <div className="nav-loader-feed">
            <div className="nav-loader-receipt">
              {/* eslint-disable-next-line @next/next/no-img-element -- the brand file as is, already in the cache when the veil shows. */}
              <img src={site.logo} alt="" width={220} height={72} className="nav-loader-logo" />
              <span className="nav-loader-row"><i /><i /></span>
              <span className="nav-loader-row"><i /><i /></span>
              <span className="nav-loader-row"><i /><i /></span>
              <span className="nav-loader-row nav-loader-sum"><i /><i /></span>
              <span className="nav-loader-foot">
                <svg viewBox="0 0 21 21" className="nav-loader-qr" shapeRendering="crispEdges" focusable="false">
                  <path d={qrPath} fill="currentColor" />
                </svg>
                <span className="nav-loader-stamp">
                  <Icon name="check" size={11} strokeWidth={3} />
                  {reported}
                </span>
              </span>
            </div>
          </div>
          <span className="nav-loader-slot" />
        </div>
      )}
      {shown && <span className="sr-only">{label}</span>}
    </div>
  );
}
