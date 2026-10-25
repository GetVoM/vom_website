import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const base =
  "inline-flex items-center gap-2 rounded-pill text-[0.9375rem] font-bold leading-none transition-[background-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal-500 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "h-11 px-5 bg-orange-500 text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] hover:bg-orange-600",
  secondary:
    "h-11 px-5 border border-ink/80 text-ink hover:border-ink hover:bg-paper-100",
  ghost: "h-11 px-2 text-ink underline decoration-teal-500 decoration-2 underline-offset-[6px] hover:decoration-ink",
  inverse: "h-11 px-5 bg-white text-teal-800 hover:bg-teal-50",
};

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
  const classes = `${base} ${variants[variant]} ${className}`;
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
