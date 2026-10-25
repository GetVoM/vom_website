import type { Metadata } from "next";
import Link from "next/link";
import { effra } from "@/app/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | ڤوم",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={effra.variable}>
      <body className="min-h-full flex flex-col">
        <main className="mx-auto flex max-w-[640px] flex-1 flex-col items-start justify-center gap-6 px-[max(16px,env(safe-area-inset-left,0px))] py-24">
          <p className="num text-[0.875rem] font-bold text-teal-700">404</p>
          <h1 className="font-arabic text-[2rem] font-bold leading-tight">هذه الصفحة غير موجودة.</h1>
          <p className="text-[1.0625rem] leading-relaxed text-ink-700">
            ربما تغيّر عنوانها أو حُذفت. يمكنك العودة إلى الصفحة الرئيسية أو تصفّح المدونة.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="inline-flex h-11 items-center rounded-pill bg-orange-500 px-5 text-[0.9375rem] font-bold text-white hover:bg-orange-600">
              الصفحة الرئيسية
            </Link>
            <Link href="/blog/" className="inline-flex h-11 items-center rounded-pill border border-ink/80 px-5 text-[0.9375rem] font-bold text-ink hover:bg-paper-100">
              المدونة
            </Link>
          </div>
          <p className="text-[0.9375rem] text-ink-500" lang="en" dir="ltr">
            Page not found. <Link href="/en/" className="text-teal-700 underline underline-offset-4">Go to the English homepage</Link>.
          </p>
        </main>
      </body>
    </html>
  );
}
