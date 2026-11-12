"use client";

import { useSyncExternalStore } from "react";
import type { FailureCopy } from "@/lib/content/vom-pay";
import { isKnownPayError, readPayError } from "@/lib/leads/vom-pay";

/** The address never changes while the page is open; on the server there is no query. */
const noChange = () => () => {};
const readSearch = () => window.location.search;

/** The code the app sent in `?vom_pay_errors=`, read in the browser only, so the page stays static. */
function usePayError(): string | null {
  return readPayError(useSyncExternalStore(noChange, readSearch, () => ""));
}

/** «رمز الخطأ: 2» / "Error code: 2", only when the app sent a code. */
export function PayErrorCode({ copy, className }: { copy: FailureCopy; className?: string }) {
  const code = usePayError();
  if (!code) return null;
  return (
    <p className={className}>
      {copy.codeLabel} <span dir="ltr">{code}</span>
    </p>
  );
}

/** The message for the code: one of the old page's three, or the general one (1) for a missing or unknown code. */
export function PayErrorMessage({ copy, className }: { copy: FailureCopy; className?: string }) {
  const code = usePayError();
  return <p className={className}>{copy.messages[isKnownPayError(code) ? code : "1"]}</p>;
}
