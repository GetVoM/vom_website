"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { NavAnchor } from "./NavAnchor";
import type { MenuId, NavItem, NavMenus } from "./navTypes";

/** A pointer that rests this long on a trigger opens its menu. */
const HOVER_OPEN_MS = 80;
/** Leaving the header and its panel closes the menu after this grace. */
const HOVER_CLOSE_MS = 220;
/** A closing panel keeps off its `hidden` attribute this long, for the CSS fade. */
const EXIT_MS = 200;

/**
 * The desktop links and the two mega menus. Each menu is a disclosure: a real
 * button with `aria-expanded` opens a panel under the header. A mouse opens it by
 * resting on the button; a click, Enter or Space toggles it; Escape closes it and
 * returns focus to its button; leaving the header, clicking elsewhere or tabbing
 * out closes it. The panels are in the HTML when closed, so their links are crawled.
 * A panel drops in and fades out; moving straight from one menu to the other swaps
 * them at once, so two panels never cross-fade over each other. A closed panel
 * always carries `hidden`, so it stays shut even without the stylesheet; it drops
 * the attribute only while open, and for the length of its fade when closing.
 */
export function DesktopNav({ items, menus, label }: { items: NavItem[]; menus: NavMenus; label: string }) {
  const [menu, setMenu] = useState<{ open: MenuId | null; closing: MenuId | null; instant: boolean }>({
    open: null,
    closing: null,
    instant: false,
  });
  const open = menu.open;
  const go = (next: MenuId | null) =>
    setMenu((prev) => ({
      open: next,
      closing: prev.open !== null && next === null ? prev.open : null,
      instant: prev.open !== null && next !== null && prev.open !== next,
    }));
  const root = useRef<HTMLDivElement>(null);
  const triggers = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const timer = useRef<number | undefined>(undefined);
  // Just after a hover opened the menu, the click that usually follows keeps it open.
  const justHovered = useRef(false);
  const hoverGrace = useRef<number | undefined>(undefined);
  const uid = useId();
  const panelId = (id: MenuId) => `${uid}-${id}`;
  const close = () => go(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      triggers.current[open]?.focus();
      go(null);
    };
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) go(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // Once a closing panel has faded, it takes its `hidden` attribute back.
  useEffect(() => {
    if (!menu.closing) return;
    const done = window.setTimeout(() => setMenu((prev) => ({ ...prev, closing: null })), EXIT_MS);
    return () => window.clearTimeout(done);
  }, [menu.closing]);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(hoverGrace.current);
    },
    [],
  );
  const shut = (id: MenuId) => open !== id && menu.closing !== id;

  const schedule = (next: MenuId | null, delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (next) {
        justHovered.current = true;
        window.clearTimeout(hoverGrace.current);
        hoverGrace.current = window.setTimeout(() => {
          justHovered.current = false;
        }, 600);
      }
      go(next);
    }, delay);
  };
  const isMouse = (event: ReactPointerEvent) => event.pointerType === "mouse";
  const toggle = (id: MenuId) => {
    window.clearTimeout(timer.current);
    if (open === id && justHovered.current) {
      justHovered.current = false;
      return;
    }
    go(open === id ? null : id);
  };
  const onBlur = (event: FocusEvent) => {
    if (!root.current?.contains(event.relatedTarget as Node | null)) go(null);
  };

  const sectors = menus.sectors;
  const sectorRows = Math.ceil(sectors.items.length / 3);
  const groups = menus.support.groups;
  const paperGroups = groups.slice(0, -1);
  const fieldGroup = groups[groups.length - 1];

  return (
    <div
      ref={root}
      className="nav-root hidden lg:block"
      data-instant={menu.instant || undefined}
      onPointerEnter={(event) => isMouse(event) && window.clearTimeout(timer.current)}
      onPointerLeave={(event) => isMouse(event) && open && schedule(null, HOVER_CLOSE_MS)}
      onBlur={onBlur}
    >
      <nav aria-label={label} className="flex items-center gap-7 text-[0.9375rem]">
        {items.map((item) =>
          item.kind === "link" ? (
            <Link
              key={item.href}
              href={item.href}
              className="link-nav"
              onPointerEnter={(event) => isMouse(event) && open && schedule(null, 150)}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              ref={(element) => {
                triggers.current[item.id] = element;
              }}
              type="button"
              className="nav-trigger"
              aria-expanded={open === item.id}
              aria-controls={panelId(item.id)}
              onPointerEnter={(event) => isMouse(event) && schedule(item.id, open ? 0 : HOVER_OPEN_MS)}
              onClick={() => toggle(item.id)}
            >
              {menus[item.id].label}
              <Icon name="chevron" size={14} className="nav-chevron" />
            </button>
          ),
        )}
      </nav>

      <div
        id={panelId("sectors")}
        className="nav-panel"
        hidden={shut("sectors")}
        data-open={open === "sectors" || undefined}
      >
        <div className="page-wrap nav-grid">
          <ul className="nav-sectors" style={{ "--rows": sectorRows } as CSSProperties}>
            {sectors.items.map((sector, i) => (
              <li key={sector.href} className={i % sectorRows === 0 ? "nav-col-head" : undefined}>
                <NavAnchor link={sector} onNavigate={close}>
                  <span data-icon={sector.icon} />
                  {sector.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
          <div className="nav-field">
            <span className="nav-field-bg guilloche-tile" aria-hidden="true" />
            <p className="nav-field-line">{sectors.line}</p>
            <NavAnchor link={sectors.all} className="nav-field-link" onNavigate={close}>
              {sectors.all.label}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </NavAnchor>
          </div>
        </div>
      </div>

      <div
        id={panelId("support")}
        className="nav-panel"
        hidden={shut("support")}
        data-open={open === "support" || undefined}
      >
        <div className="page-wrap nav-grid">
          <div className="nav-groups">
            {paperGroups.map((group) => (
              <NavGroup key={group.heading} group={group} wide={group.links.length > 6 || paperGroups.length === 1} onNavigate={close} />
            ))}
          </div>
          <div className="nav-field">
            <span className="nav-field-bg guilloche-tile" aria-hidden="true" />
            <NavGroup group={fieldGroup} onNavigate={close} />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGroup({
  group,
  wide = false,
  onNavigate,
}: {
  group: NavMenus["support"]["groups"][number];
  wide?: boolean;
  onNavigate: () => void;
}) {
  const id = useId();
  return (
    <div className="nav-group" data-wide={wide || undefined}>
      <p id={id} className="nav-group-heading">
        {group.heading}
      </p>
      <ul className="nav-links" aria-labelledby={id}>
        {group.links.map((link) => (
          <li key={link.href}>
            <NavAnchor link={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}
