import { formatAmount } from "@/lib/content/pricing/plans";

/**
 * An amount in Saudi riyals. The official riyal sign (SAMA) is the element's
 * ::before, drawn from a CSS mask, so it sits left of the figure in both languages
 * as in the VoM app; the hidden word after the figure is what screen readers say.
 * The markup stays this small because the pricing page repeats it often.
 */
export function Amount({ value, currency, className }: { value: number; currency: string; className?: string }) {
  return (
    <span className={className ? `sar ${className}` : "sar"} dir="ltr">
      {formatAmount(value)}
      <i>{` ${currency}`}</i>
    </span>
  );
}
