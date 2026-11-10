import type { SectorIcon } from "@/lib/i18n/dictionaries/types";

/**
 * A sector's seal: a double ring around its pictogram, its name and the brand's
 * micro-label. Decorative, since the H1 and the breadcrumb already name the sector.
 * `stamp` sits on the hero photo; `white` is drawn in white on the closing band.
 */
export function SectorSeal({
  icon,
  name,
  micro,
  variant,
}: {
  icon: SectorIcon;
  name: string;
  micro: string;
  variant: "stamp" | "white";
}) {
  return (
    <span className={`sec-seal sec-seal-${variant}`} aria-hidden="true">
      <span className="sec-seal-icon" data-icon={icon} />
      <span className="sec-seal-name">{name}</span>
      <span className="sec-seal-micro">{micro}</span>
    </span>
  );
}
