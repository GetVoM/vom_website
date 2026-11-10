/**
 * The teal disc the hand holds, redrawn over the photograph's own disc so its
 * chart can draw itself once on load: the baseline, then the bars rising one by
 * one, then the arrow. Measured from public/growth/hand-growth.png (2048×1483):
 * the disc's box is placed by percentage in the photo's frame, so it stays on the
 * palm at every width. The photo is mirrored in English so the arm enters from
 * the end edge; this disc deliberately is not, so its arrow always rises right.
 */
export function GrowthDisc() {
  return (
    <svg className="growth-disc" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="50.6" className="growth-disc-face" />
      <g fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path className="growth-disc-base" d="M19.5 75.6H81" pathLength={1} />
        <rect className="growth-disc-bar" x="24.4" y="63.2" width="10" height="12.4" rx="1.4" />
        <rect className="growth-disc-bar" x="38" y="56.8" width="10" height="18.8" rx="1.4" />
        <rect className="growth-disc-bar" x="51.6" y="50" width="10" height="25.6" rx="1.4" />
        <rect className="growth-disc-bar" x="65.6" y="43.2" width="10" height="32.4" rx="1.4" />
        <path
          className="growth-disc-arrow"
          d="M27.6 50.4C40.5 50.2 52.6 43.6 60.6 34.2L63.8 37.4 70.4 20.6 56.2 25.6 59.2 28.6C52.4 38.4 41 45.4 28.4 48.2 26.6 48.6 26.4 50.4 27.6 50.4Z"
          pathLength={1}
        />
      </g>
    </svg>
  );
}
