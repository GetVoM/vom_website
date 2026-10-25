"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

interface MenuLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links: MenuLink[];
  switchLink: { label: string; href: string; lang: string };
  start: MenuLink;
  labels: { menu: string; close: string };
}

export function MobileMenu({ links, switchLink, start, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-paper-100"
      >
        <Icon name={open ? "close" : "menu"} size={22} />
        <span className="sr-only">{open ? labels.close : labels.menu}</span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-paper-200 bg-paper px-[max(16px,env(safe-area-inset-left,0px))] pb-6 pt-2 shadow-[0_24px_40px_-24px_rgba(5,42,37,0.35)]"
      >
        <nav className="flex flex-col" aria-label="Main">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a key={link.label} href={link.href} className="border-b border-paper-200 py-3 text-[1.0625rem]">
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-paper-200 py-3 text-[1.0625rem]"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <div className="mt-4 flex items-center justify-between gap-4">
          <Link href={switchLink.href} lang={switchLink.lang} className="num text-[0.9375rem] text-ink-700">
            {switchLink.label}
          </Link>
          <a
            href={start.href}
            className="inline-flex h-10 items-center rounded-pill bg-orange-500 px-4 text-[0.9375rem] font-bold text-white"
          >
            {start.label}
          </a>
        </div>
      </div>
    </div>
  );
}
