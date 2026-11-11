"use client";

import { useActionState, type ReactNode } from "react";
import type { ActionResult } from "@/app/(admin)/admin/actions";

/** A small form around a server action that shows the action's answer under the fields. */
export function RecordForm({
  action,
  submit,
  children,
}: {
  action: (state: ActionResult | null, form: FormData) => Promise<ActionResult>;
  submit: string;
  children: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="adm-form">
      {children}
      <div className="adm-row">
        <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
          {pending ? "جارٍ الحفظ…" : submit}
        </button>
        <p className={state?.ok ? "adm-ok" : "adm-error"} role="status" aria-live="polite">
          {state?.message ?? ""}
        </p>
      </div>
    </form>
  );
}
