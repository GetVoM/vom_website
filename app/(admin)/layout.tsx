import type { Metadata } from "next";
import { effra } from "@/app/fonts";
import { AdminBaseProvider } from "@/components/admin/AdminBase";
import { ADMIN_BASE } from "@/lib/admin/path";
import "@/app/globals.css";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "لوحة التحرير | ڤوم", template: "%s | لوحة التحرير" },
  robots: { index: false, follow: false },
};

/**
 * The admin's own root layout, outside app/[lang]: no site header or footer, no
 * locale, never indexed. Its pages are rendered per request, behind the session
 * check in proxy.ts and the `admins` check on every page and action.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={effra.variable}>
      <body className="adm">
        <AdminBaseProvider base={ADMIN_BASE}>{children}</AdminBaseProvider>
      </body>
    </html>
  );
}
