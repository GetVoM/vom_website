import { Tracker } from "@/components/analytics/Tracker";
import type { Metadata } from "next";
import { fontVariables } from "@/app/fonts";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { NotFound } from "@/components/site/NotFound";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | ڤوم",
  robots: { index: false, follow: true },
};

/**
 * The 404 for an address no layout claims. It has no language to go on, so it is
 * the Arabic page: the site's header and footer around the same body the
 * language-aware one shows (app/[lang]/not-found.tsx).
 */
export default function GlobalNotFound() {
  const t = getDictionary("ar");
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body className="min-h-full flex flex-col">
        <Header locale="ar" t={t} />
        <main className="flex-1">
          <NotFound locale="ar" />
        </main>
        <Footer locale="ar" t={t} />
        <WhatsAppButton label={t.contact.whatsappCta} />
        <Tracker />
      </body>
    </html>
  );
}
