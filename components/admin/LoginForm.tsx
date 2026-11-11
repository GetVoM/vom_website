"use client";

import { useActionState } from "react";
import { signIn } from "@/app/(admin)/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="adm-form">
      <label className="adm-field">
        <span>البريد الإلكتروني</span>
        <input name="email" type="email" autoComplete="username" required dir="ltr" />
      </label>
      <label className="adm-field">
        <span>كلمة المرور</span>
        <input name="password" type="password" autoComplete="current-password" required dir="ltr" />
      </label>
      <p className="adm-error" role="alert">
        {state && !state.ok ? state.message : ""}
      </p>
      <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
        {pending ? "جارٍ الدخول…" : "دخول"}
      </button>
    </form>
  );
}
