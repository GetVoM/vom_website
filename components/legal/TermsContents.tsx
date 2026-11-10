"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useActiveSection } from "@/components/ui/useActiveSection";

export interface ContentsEntry {
  id: string;
  number?: number;
  heading: string;
}

interface TermsContentsProps {
  entries: ContentsEntry[];
  title: string;
}

/**
 * The contents of a long legal document. From 1024 px it is a rail beside the
 * text that marks the section being read with a thumb on a hairline track;
 * below that it is a bar under the header that names the current section and
 * opens the full list.
 */
export function TermsContents({ entries, title }: TermsContentsProps) {
  const active = useActiveSection(useMemo(() => entries.map((entry) => entry.id), [entries]));
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // The thumb follows the active entry; it is re-measured when the list reflows.
  useEffect(() => {
    const list = listRef.current;
    const thumb = thumbRef.current;
    if (!list || !thumb) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>('[aria-current="true"]');
      if (!link) return;
      // Fractional boxes, so rounding never pushes the thumb past the track.
      const box = link.getBoundingClientRect();
      const top = box.top - list.getBoundingClientRect().top;
      // The thumb is 1px tall and scaled to the entry, so moving it never triggers layout.
      thumb.style.transform = `translateY(${top}px) scaleY(${box.height})`;
      thumb.dataset.ready = "true";
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // The small-screen list closes on Escape or on a press outside it.
  useEffect(() => {
    if (!open) return;
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
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const current = entries.find((entry) => entry.id === active) ?? entries[0];

  return (
    <div ref={rootRef} className="terms-toc">
      <button
        ref={buttonRef}
        type="button"
        className="terms-toc-toggle"
        aria-expanded={open}
        aria-controls="terms-contents"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="terms-toc-current">
          {current?.number !== undefined && <span className="num terms-toc-num">{current.number}</span>}
          <span className="truncate">{current?.heading}</span>
        </span>
        <span className="terms-toc-label">
          {title}
          <Icon name="chevron" size={16} className="terms-toc-chevron" />
        </span>
      </button>

      <nav id="terms-contents" aria-labelledby="terms-contents-title" className="terms-toc-panel" data-open={open || undefined}>
        <h2 id="terms-contents-title" className="terms-toc-title">
          {title}
        </h2>
        <div className="terms-toc-track">
          <ol ref={listRef} className="terms-toc-list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  aria-current={entry.id === active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="num terms-toc-num">{entry.number}</span>
                  <span>{entry.heading}</span>
                </a>
              </li>
            ))}
          </ol>
          <span ref={thumbRef} className="terms-toc-thumb" aria-hidden="true" />
        </div>
      </nav>
    </div>
  );
}
