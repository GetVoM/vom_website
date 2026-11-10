"use client";

import { Children, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

interface ExhibitStackProps {
  /** `of` takes {n} and {total}. */
  labels: { of: string; prev: string; next: string };
  children: ReactNode;
}

/**
 * A section's attached sheets: the server renders each screenshot as a figure,
 * and this pages through them. The top sheet slides off towards the end side and
 * the next settles in its place; reduced motion swaps them at once.
 */
export function ExhibitStack({ labels, children }: ExhibitStackProps) {
  const sheets = Children.toArray(children);
  const total = sheets.length;
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (step: number) => setActive((current) => (current + step + total) % total);

  // A horizontal swipe pages too. The next sheet lies towards the end side, which
  // is the left in Arabic, so a swipe to the right brings it there.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") startX.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) < 40) return;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    go((dx > 0) === rtl ? 1 : -1);
  };

  return (
    <div className="ftr-stack" data-many={total > 1 || undefined}>
      <div
        className="ftr-sheets"
        onPointerDown={total > 1 ? onPointerDown : undefined}
        onPointerUp={total > 1 ? onPointerUp : undefined}
        onPointerCancel={() => (startX.current = null)}
      >
        {sheets.map((sheet, i) => (
          <div
            key={i}
            className="ftr-slot"
            data-on={i === active || undefined}
            data-past={(total > 1 && i !== active && (i - active + total) % total === total - 1) || undefined}
            inert={i !== active}
          >
            {sheet}
          </div>
        ))}
      </div>
      {total > 1 && (
        <div className="ftr-stack-controls">
          <button type="button" className="ftr-stack-btn" onClick={() => go(-1)} aria-label={labels.prev}>
            <Icon name="chevron" size={18} className="ftr-prev" />
          </button>
          <p className="num ftr-stack-count" aria-live="polite">
            {labels.of.replace("{n}", String(active + 1)).replace("{total}", String(total))}
          </p>
          <button type="button" className="ftr-stack-btn" onClick={() => go(1)} aria-label={labels.next}>
            <Icon name="chevron" size={18} className="ftr-next" />
          </button>
        </div>
      )}
    </div>
  );
}
