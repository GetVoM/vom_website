import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  external = false,
  className = "",
  children,
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
      <a href={href} className={classes} rel="noopener">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
