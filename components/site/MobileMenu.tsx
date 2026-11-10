"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { Icon } from "@/components/ui/Icon";
import { LocaleSwitch } from "./LocaleSwitch";
import { NavAnchor } from "./NavAnchor";
import type { MenuId, NavItem, NavLink, NavMenus } from "./navTypes";

interface MobileMenuProps {
  items: NavItem[];
  menus: NavMenus;
  login: NavLink;
  locale: Locale;
  switchLabel: string;
  start: NavLink;
  labels: { menu: string; close: string };
}

/**
 * The phone menu: the same links as the desktop bar, with Sectors and Business
 * support as sections that expand in place. Their links are drawn only once a
 * section is open; the desktop panels already carry them in the page's HTML.
 */
export function MobileMenu({ items, menus, login, locale, switchLabel, start, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<MenuId | null>(null);
  const panelId = useId();
  const sectionId = useId();
  const close = () => setOpen(false);

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
        className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-paper-200 bg-paper px-[max(16px,env(safe-area-inset-left,0px))] pb-6 pt-2 shadow-[0_24px_40px_-24px_rgba(5,42,37,0.35)]"
      >
        <nav className="flex flex-col" aria-label={labels.menu}>
          {items.map((item) =>
            item.kind === "link" ? (
              <Link key={item.href} href={item.href} onClick={close} className="border-b border-paper-200 py-3 text-[1.0625rem]">
                {item.label}
              </Link>
            ) : (
              <div key={item.id} className="border-b border-paper-200">
                <button
                  type="button"
                  aria-expanded={section === item.id}
                  aria-controls={`${sectionId}-${item.id}`}
                  onClick={() => setSection((current) => (current === item.id ? null : item.id))}
                  className="nav-trigger flex w-full justify-between py-3 text-[1.0625rem]"
                >
                  {menus[item.id].label}
                  <Icon name="chevron" size={16} className="nav-chevron" />
                </button>
                <div id={`${sectionId}-${item.id}`} hidden={section !== item.id}>
                  {section === "sectors" && item.id === "sectors" && (
                    <ul className="mnav-sectors">
                      {menus.sectors.items.map((sector) => (
                        <li key={sector.href}>
                          <NavAnchor link={sector} onNavigate={close}>
                            <span data-icon={sector.icon} />
                            {sector.label}
                          </NavAnchor>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section === "support" && item.id === "support" && (
                    <div className="mnav-groups">
                      {menus.support.groups.map((group) => (
                        <div key={group.heading}>
                          <p className="nav-group-heading">{group.heading}</p>
                          <ul className="nav-links">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <NavAnchor link={link} onNavigate={close} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
          <a href={login.href} className="border-b border-paper-200 py-3 text-[1.0625rem]">
            {login.label}
          </a>
        </nav>
        <div className="mt-4 flex items-center justify-between gap-4">
          <LocaleSwitch locale={locale} label={switchLabel} className="num text-[0.9375rem] text-ink-700" onClick={close} />
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
