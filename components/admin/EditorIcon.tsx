/** The editor toolbar's icons: one 24px grid, one 1.75 stroke, drawn here so no icon set is loaded. */
const paths = {
  bold: "M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z",
  italic: "M10 5h8M6 19h8M14 5l-4 14",
  underline: "M7 4v7a5 5 0 0 0 10 0V4M5 20h14",
  strike: "M5 12h14M16 7a4 4 0 0 0-4-2c-2.5 0-4 1.3-4 3 0 1.2.7 2 2 2.6M8 17a4 4 0 0 0 4 2c2.5 0 4-1.3 4-3",
  code: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  clear: "M6 5h12M12 5v6M9 19h6M5 5l14 14",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  unlink: "M10 14a4 4 0 0 0 5.7 0l1-1M14 10a4 4 0 0 0-5.7 0l-1 1M5 5l14 14",
  bullets: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  numbers: "M10 6h10M10 12h10M10 18h10M4 5l1.5-1v4M4 8h3M4 15.5c0-1 3-1 3 .2 0 .8-3 1.3-3 2.8h3",
  indent: "M4 6h16M11 12h9M4 18h16M4 10l3 2-3 2",
  outdent: "M4 6h16M11 12h9M4 18h16M7 10l-3 2 3 2",
  quote: "M6 17c2-1 3-3 3-6V7H5v5h3M15 17c2-1 3-3 3-6V7h-4v5h3",
  callout: "M4 6h16v12H4zM8 10h8M8 14h5",
  faq: "M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.7M12 16.5h.01M4 5h16v14H4z",
  image: "M4 5h16v14H4zM4 16l4.5-4.5 3.5 3.5 3-3 5 5M9 9.5h.01",
  table: "M4 5h16v14H4zM4 10h16M4 14.5h16M10 5v14",
  rule: "M4 12h16",
  alignStart: "M4 6h16M4 12h10M4 18h13",
  alignCenter: "M4 6h16M7 12h10M5.5 18h13",
  alignEnd: "M4 6h16M10 12h10M7 18h13",
  undo: "M9 8L5 12l4 4M5 12h9a5 5 0 0 1 0 10h-2",
  redo: "M15 8l4 4-4 4M19 12h-9a5 5 0 0 0 0 10h2",
  html: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14",
  full: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  direction: "M10 5v14M14 5v14M14 5H9a3.5 3.5 0 0 0 0 7h1M4 19l-2-2 2-2M20 15l2 2-2 2",
} as const;

export type EditorIconName = keyof typeof paths;

export function EditorIcon({ name }: { name: EditorIconName }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
