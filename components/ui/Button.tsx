import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  /** Opens the link in a new tab; the text is read after the label, never shown. */
  newTab?: string;
  className?: string;
  children: ReactNode;
  /** Analytics attributes, read by components/analytics/Tracker.tsx: `data-track="event_name"`, `data-track-plan="flex"`. */
  [attribute: `data-track${string}`]: string | undefined;
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  external = false,
  newTab,
  className = "",
  children,
  ...tracking
}: ButtonLinkProps) {
  const classes = `btn btn-${variant} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow" size={16} className="rtl:-scale-x-100" />}
    </>
  );
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={classes} rel="noopener" target={newTab ? "_blank" : undefined} {...tracking}>
        {content}
        {newTab && <span className="sr-only">{` ${newTab}`}</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...tracking}>
      {content}
    </Link>
  );
}
