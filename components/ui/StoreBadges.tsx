import type { ReactNode } from "react";
import { site } from "@/lib/seo/site";

function AppleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.2 5.9c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"
      />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M4 3.5v17a.8.8 0 0 0 1.2.7L19.5 13a1.1 1.1 0 0 0 0-2L5.2 2.8A.8.8 0 0 0 4 3.5z" />
      <path fill="rgba(255,255,255,0.35)" d="M4.4 3L14 12l-9.6 9z" />
    </svg>
  );
}

function StoreBadge({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      rel="noopener"
      className="inline-flex h-12 items-center gap-2.5 rounded-pill bg-ink px-5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-ink-700"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}

/** The App Store and Google Play badges, drawn in the house pill rather than the stores' artwork. */
export function StoreBadges({ ios, android }: { ios: string; android: string }) {
  return (
    <>
      <StoreBadge href={site.appStore} label={ios}>
        <AppleGlyph />
      </StoreBadge>
      <StoreBadge href={site.googlePlay} label={android}>
        <PlayGlyph />
      </StoreBadge>
    </>
  );
}
