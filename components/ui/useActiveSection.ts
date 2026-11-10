"use client";

import { useEffect, useState } from "react";

/** How far below the viewport top a section must reach to count as the one being read. */
function readingLine() {
  return Math.min(window.innerHeight * 0.3, 220);
}

/**
 * Scroll-spy for a long document's contents: the section being read is the last
 * one whose top has passed the reading line, and the last section once the page
 * is scrolled to its end. Before the first section, it is the first one, or none
 * when `beforeFirst` is "none" (a guide's introduction belongs to no section).
 * Shared by the terms page and the e-invoicing catalogue rail.
 */
export function useActiveSection(ids: string[], beforeFirst: "first" | "none" = "first"): string | undefined {
  const key = ids.join(" ");
  const [active, setActive] = useState<string | undefined>(beforeFirst === "first" ? ids[0] : undefined);

  useEffect(() => {
    const targets = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = readingLine();
      let current: string | undefined = beforeFirst === "first" ? targets[0]?.id : undefined;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      const root = document.documentElement;
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) current = targets.at(-1)?.id;
      setActive(current);
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
  }, [key, beforeFirst]);

  return active;
}
