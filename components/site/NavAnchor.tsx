import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import type { NavLink } from "./navTypes";

/**
 * A menu link. Pages on this site go through `Link` without prefetching, so opening
 * a menu does not fetch twenty pages at once; other sites get a plain anchor and a
 * small arrow pointing out.
 */
export function NavAnchor({
  link,
  className,
  onNavigate,
  children,
}: {
  link: NavLink;
  className?: string;
  onNavigate?: () => void;
  children?: ReactNode;
}) {
  if (link.href.startsWith("http")) {
    return (
      <a href={link.href} rel="noopener" className={className}>
        {children ?? link.label}
        <Icon name="arrow" size={14} className="nav-out" />
      </a>
    );
  }
  return (
    <Link href={link.href} prefetch={false} className={className} onClick={onNavigate}>
      {children ?? link.label}
    </Link>
  );
}
