/**
 * A fine guilloche: the engraved lattice of certificates and banknotes.
 * Pure SVG pattern, no raster; the stroke colour follows the surface.
 */
export function Guilloche({
  id,
  stroke = "rgba(255,255,255,0.11)",
  className = "",
}: {
  id: string;
  stroke?: string;
  className?: string;
}) {
  const rings = Array.from({ length: 10 }, (_, i) => i * 18);
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="100%">
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="96" height="96">
          <g fill="none" stroke={stroke} strokeWidth="0.55">
            {rings.map((deg) => (
              <ellipse key={deg} cx="48" cy="48" rx="44" ry="13" transform={`rotate(${deg} 48 48)`} />
            ))}
            <circle cx="48" cy="48" r="46" />
            <circle cx="0" cy="0" r="22" />
            <circle cx="96" cy="96" r="22" />
            <circle cx="96" cy="0" r="22" />
            <circle cx="0" cy="96" r="22" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
