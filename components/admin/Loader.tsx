/**
 * What an admin page shows while its data comes from the database: the shape of
 * a list (a heading, a filter bar, rows), pulsing, with a line for screen
 * readers. Used by the panel's loading file and its Suspense boundary.
 */
export function Loader({ rows = 8 }: { rows?: number }) {
  return (
    <div className="adm-loader" role="status" aria-live="polite">
      <span className="sr-only">جارٍ تحميل البيانات…</span>
      <div className="adm-loader-head" aria-hidden="true">
        <span className="adm-bone adm-bone-title" />
        <span className="adm-bone adm-bone-button" />
      </div>
      <div className="adm-bone adm-bone-bar" aria-hidden="true" />
      <div className="adm-loader-rows" aria-hidden="true">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="adm-loader-row">
            <span className="adm-bone" style={{ width: `${62 - (i % 4) * 9}%` }} />
            <span className="adm-bone adm-bone-short" />
            <span className="adm-bone adm-bone-short" />
          </div>
        ))}
      </div>
    </div>
  );
}
