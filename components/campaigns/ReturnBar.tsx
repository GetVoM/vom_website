"use client";

import { useEffect, useState } from "react";

/**
 * Below the desktop layout, where the form panel scrolls away with the page: a
 * slim bar that appears once the panel is above the viewport and brings the
 * visitor back to it, focusing the first field. It hides while the panel is in
 * view and for good once the form has been sent. Desktop never shows it: there
 * the panel is sticky (app/globals.css `.lp-return`), except in a window too
 * short to hold it.
 *
 * It also marks `<html data-lp-panel="in">` while the panel is on screen, so the
 * WhatsApp disc can step aside instead of covering the form's fields on phones.
 */
export function ReturnBar({ label, target }: { label: string; target: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const panel = document.getElementById(target);
    if (!panel) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(([entry]) => {
      const sent = panel.querySelector(".lp-thanks") !== null;
      setShown(!sent && !entry.isIntersecting && entry.boundingClientRect.top < 0);
      if (entry.isIntersecting) root.dataset.lpPanel = "in";
      else delete root.dataset.lpPanel;
    });
    observer.observe(panel);
    return () => {
      observer.disconnect();
      delete root.dataset.lpPanel;
    };
  }, [target]);

  const back = () => {
    const panel = document.getElementById(target);
    if (!panel) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    panel.querySelector<HTMLInputElement>("input:not([type=hidden])")?.focus({ preventScroll: true });
  };

  return (
    <div className="lp-return" data-shown={shown || undefined} aria-hidden={!shown || undefined} inert={!shown}>
      <button type="button" className="lp-return-button" onClick={back}>
        {label}
      </button>
    </div>
  );
}
