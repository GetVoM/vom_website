import type { CSSProperties } from "react";

const PASSED = 5;

/**
 * A figure whose digits roll into place like a mechanical counter, in CSS only.
 * The real digit is the only text in the markup, so crawlers and screen readers
 * read "2021". The digits it rolls past live in a pseudo-element, and the resting
 * style is the final digit, so nothing depends on motion.
 */
export function FigureValue({ value, offset = 0 }: { value: string; offset?: number }) {
  return (
    <span className="figure-value num">
      {value.split("").map((char, position) => {
        if (!/\d/.test(char)) {
          return (
            <span key={position} className="figure-sign">
              {char}
            </span>
          );
        }
        const order = offset + value.slice(0, position).replace(/\D/g, "").length;
        const passed = Array.from({ length: PASSED }, (_, k) => (Number(char) - PASSED + k + 10) % 10);
        return (
          <span key={position} className="reel">
            <span className="reel-strip" data-p={passed.join("\n")} style={{ "--o": order } as CSSProperties}>
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
}
