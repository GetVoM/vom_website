import type { SectorIcon } from "@/lib/i18n/dictionaries/types";

/** The header's two mega menus. */
export type MenuId = "sectors" | "support";

/** `href` is a locale path ("/en/contact-us/") or a full URL for another site. */
export interface NavLink {
  label: string;
  href: string;
}

export type NavItem = ({ kind: "link" } & NavLink) | { kind: "menu"; id: MenuId };

export interface NavMenus {
  sectors: {
    label: string;
    /** The line on the menu's teal field. */
    line: string;
    all: NavLink;
    items: (NavLink & { icon: SectorIcon })[];
  };
  /** The last group sits on the menu's teal field. */
  support: { label: string; groups: { heading: string; links: NavLink[] }[] };
}
