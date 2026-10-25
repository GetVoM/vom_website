/**
 * A deterministic QR-like 21×21 module grid with real finder patterns.
 * It is a visual stand-in, not an encoded payload, and the page labels it
 * as sample data wherever it appears.
 */
function finder(x: number, y: number, size: number) {
  const inner = x >= 2 && x <= size - 3 && y >= 2 && y <= size - 3;
  const ring = x === 0 || y === 0 || x === size - 1 || y === size - 1;
  return ring || inner;
}

function cellOn(x: number, y: number): boolean {
  const n = 21;
  if (x < 7 && y < 7) return finder(x, y, 7);
  if (x >= n - 7 && y < 7) return finder(x - (n - 7), y, 7);
  if (x < 7 && y >= n - 7) return finder(x, y - (n - 7), 7);
  if (x === 7 || y === 7 || x === n - 8 || y === n - 8) {
    if ((x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8)) return false;
  }
  if (y === 6 && x > 7 && x < n - 8) return x % 2 === 0;
  if (x === 6 && y > 7 && y < n - 8) return y % 2 === 0;
  const h = (x * 73 + y * 151 + x * y * 7) % 11;
  return h < 5;
}

export function QrCode({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const cells: { on: boolean; delay: number }[] = [];
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const on = cellOn(x, y);
      const delay = ((x * 37 + y * 91) % 97) * 9;
      cells.push({ on, delay });
    }
  }
  return (
    <div className={`qr ${className}`} role="img" aria-label="QR">
      {cells.map((cell, i) =>
        cell.on ? (
          <i key={i} style={animate ? ({ "--d": cell.delay } as React.CSSProperties) : { animation: "none" }} />
        ) : (
          <i key={i} data-off="" />
        ),
      )}
    </div>
  );
}
