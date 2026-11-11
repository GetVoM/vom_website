"use client";

import { useEffect, useMemo, useState } from "react";
import { useActiveSection } from "@/components/ui/useActiveSection";

export interface ThumbTab {
  id: string;
  number: string;
  title: string;
}

/** The site header's height: the tabs stand just under it. */
const HEADER = 64;

/**
 * The guide's thumb index: one paper tab per part, on the page's fore-edge
 * (the end edge). The part being read is pulled out with a folded corner; the
 * parts already passed carry a tick. It is the same index as the contents
 * sheet's tabs in the hero, so it appears only once the sheet has scrolled out
 * of view, and it stays through the closing band (part 07) until that band is
 * leaving. From 1024 px the tabs stand in a column on the fore-edge and show a
 * part's title on hover or focus; below that they are a strip under the header.
 */
export function ThumbIndex({ tabs, label, after, until }: { tabs: ThumbTab[]; label: string; after: string; until: string }) {
  const active = useActiveSection(
    useMemo(() => tabs.map((tab) => tab.id), [tabs]),
    "none",
  );
  const current = tabs.findIndex((tab) => tab.id === active);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const start = document.getElementById(after);
    const end = document.getElementById(until);
    let frame = 0;
    const update = () => {
      frame = 0;
      const past = (start?.getBoundingClientRect().bottom ?? 0) < HEADER;
      const before = end ? end.getBoundingClientRect().bottom > window.innerHeight * 0.4 : true;
      setShown(past && before);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [after, until]);

  return (
    <nav className="acg-thumbs" aria-label={label} data-shown={shown || undefined}>
      <ol role="list">
        {tabs.map((tab, i) => (
          <li key={tab.id}>
            {/* The name is on the link: the visible title is a hover label, hidden at rest. */}
            <a
              href={`#${tab.id}`}
              className="acg-thumb"
              data-state={i === current ? "current" : current > i ? "read" : undefined}
              aria-current={i === current ? "location" : undefined}
              aria-label={`${tab.number} ${tab.title}`}
              tabIndex={shown ? undefined : -1}
            >
              <span className="num" dir="ltr" aria-hidden="true">
                {tab.number}
              </span>
              <span className="acg-thumb-label" aria-hidden="true">
                {tab.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
