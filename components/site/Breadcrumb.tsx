import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export interface Crumb {
  label: string;
  /** Omit on the current page. */
  href?: string;
}

export function Breadcrumb({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 text-[0.875rem] text-ink-500">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <Icon name="chevron" size={14} className="rtl:-scale-x-100" />}
            {item.href ? (
              <Link href={item.href} className="underline-offset-4 transition-colors hover:text-teal-700 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-700">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
