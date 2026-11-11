import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "تسجيل الدخول" };

export default function LoginPage() {
  return (
    <main className="adm-login">
      <h1>لوحة تحرير ڤوم</h1>
      <LoginForm />
    </main>
  );
}
