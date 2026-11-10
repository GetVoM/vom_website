"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useActiveSection } from "@/components/ui/useActiveSection";

export interface RailCard {
  id: string;
  number: string;
  title: string;
  href: string;
}

export interface RailTopic {
  id: string;
  name: string;
  cards: RailCard[];
}

interface CatalogueRailProps {
  hub: RailCard;
  topics: RailTopic[];
  currentId: string;
  sections: { id: string; heading: string }[];
  title: string;
  label: string;
}

/**
 * The catalogue that runs down every e-invoicing page: card 00 (the hub), then
 * the four topics as drawers, the current one open; the current card opens into
 * its own sections and marks the one being read. From 1024 px it is a sticky
 * rail beside the text that scrolls inside itself; below that it is a bar under
 * the header naming the current card and section, which opens the catalogue.
 */
export function CatalogueRail({ hub, topics, currentId, sections, title, label }: CatalogueRailProps) {
  const active = useActiveSection(
    useMemo(() => sections.map((section) => section.id), [sections]),
    "none",
  );
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // On wide screens the rail scrolls inside itself; keep the section being read in view
  // by moving the rail only (scrollIntoView would also move the page).
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !active || panel.scrollHeight <= panel.clientHeight) return;
    const link = panel.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return;
    const box = link.getBoundingClientRect();
    const view = panel.getBoundingClientRect();
    if (box.top < view.top + 24 || box.bottom > view.bottom - 24) {
      panel.scrollTo({ top: panel.scrollTop + box.top - view.top - view.height / 3 });
    }
  }, [active]);

  // The small-screen catalogue closes on Escape or on a press outside it (the scrim
  // included), and the page behind it stops scrolling while it is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      root.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const current = [hub, ...topics.flatMap((topic) => topic.cards)].find((card) => card.id === currentId) ?? hub;
  const section = sections.find((entry) => entry.id === active);

  const sectionList = (
    <ol className="ein-rail-sections">
      {sections.map((entry) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`} aria-current={entry.id === active ? "true" : undefined} onClick={() => setOpen(false)}>
            {entry.heading}
          </a>
        </li>
      ))}
    </ol>
  );

  const cardLink = (card: RailCard) => (
    <li key={card.id}>
      <Link
        href={card.href}
        prefetch={false}
        className="ein-rail-card"
        aria-current={card.id === currentId ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        <span className="num ein-rail-num" dir="ltr">
          {card.number}
        </span>
        <span>{card.title}</span>
      </Link>
      {card.id === currentId && sections.length > 0 && sectionList}
    </li>
  );

  return (
    <>
      {open && <div className="ein-rail-scrim" aria-hidden="true" />}
      <div ref={rootRef} className="ein-rail">
        <button
          ref={buttonRef}
          type="button"
          className="ein-rail-toggle"
          aria-expanded={open}
          aria-controls="ein-catalogue"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="ein-rail-current">
            <span className="num ein-rail-num" dir="ltr">
              {current.number}
            </span>
            <span className="truncate">{section?.heading ?? current.title}</span>
          </span>
          <span className="ein-rail-label">
            {title}
            <Icon name="chevron" size={16} className="ein-rail-chevron" />
          </span>
        </button>

        <nav
          ref={panelRef}
          id="ein-catalogue"
          aria-label={label}
          className="ein-rail-panel"
          data-open={open || undefined}
        >
          <p className="ein-rail-title" aria-hidden="true">
            {title}
          </p>
          <ol className="ein-rail-cards">{cardLink(hub)}</ol>
          {topics.map((topic) => (
            <details key={topic.id} className="ein-rail-topic" open={topic.cards.some((card) => card.id === currentId)}>
              <summary>
                <span>{topic.name}</span>
                <Icon name="chevron" size={14} className="ein-rail-topic-chevron" />
              </summary>
              <ol className="ein-rail-cards">{topic.cards.map(cardLink)}</ol>
            </details>
          ))}
        </nav>
      </div>
    </>
  );
}
