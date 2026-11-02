/** A post office's double-ring cancellation mark. Decorative: Riyadh is stated in the letter. */
export function Postmark({ className = "" }: { className?: string }) {
  return (
    <div className={`postmark ${className}`} aria-hidden="true">
      <span lang="ar" dir="rtl" className="text-[0.9375rem] font-bold leading-none">
        الرياض
      </span>
      <span lang="en" dir="ltr" className="text-[0.5625rem] font-medium leading-none tracking-[0.12em]">
        RIYADH
      </span>
    </div>
  );
}
