/**
 * The VoM loop pattern on a teal field. It draws the `.guilloche-tile` CSS image
 * (app/globals.css), so every field on the site shares one drawing.
 */
export function Guilloche({ className = "" }: { className?: string }) {
  return <span className={`guilloche-tile block ${className}`} aria-hidden="true" />;
}
