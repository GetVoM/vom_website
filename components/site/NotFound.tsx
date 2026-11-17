import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { contactPaths, featuresPaths, pricingPaths } from "@/lib/i18n/routes";
import { Icon } from "@/components/ui/Icon";

/** The message and the ways out, in each language. */
const copy = {
  ar: {
    title: "لا يوجد قيد بهذا العنوان.",
    body: "راجعنا الدفاتر ولم نجد صفحة بهذا الرابط. ربما تغيّر عنوانها أو حُذفت. هذه أقرب الطرق إلى ما تبحث عنه:",
    total: "الإجمالي",
    stamp: "لا يوجد قيد",
    ways: [
      ["الصفحة الرئيسية", "/"],
      ["المميزات", featuresPaths.ar],
      ["الباقات", pricingPaths.ar],
      ["المدونة", "/blog/"],
      ["تواصل معنا", contactPaths.ar],
    ],
  },
  en: {
    title: "No entry at this address.",
    body: "We checked the books and found no page at this link. It may have moved or been removed. These are the nearest ways to what you were after:",
    total: "Total",
    stamp: "NO ENTRY",
    ways: [
      ["Home", "/en/"],
      ["Features", `/en${featuresPaths.en}`],
      ["Pricing", `/en${pricingPaths.en}`],
      ["Blog", "/en/blog/"],
      ["Contact", `/en${contactPaths.en}`],
    ],
  },
} as const;

function Ways({ lang }: { lang: Locale }) {
  return (
    <ul className="nf-ways">
      {copy[lang].ways.map(([label, href]) => (
        <li key={href}>
          <Link href={href} data-track="not_found_exit_clicked">
            {label}
            <Icon name="arrow" size={16} className={lang === "ar" ? "-scale-x-100" : undefined} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * The 404 page's body, inside the site's header and footer. The page's language
 * leads; the other follows under a rule, because a mistyped address says little
 * about who typed it. Its one idea is the voided receipt: the address the visitor
 * asked for, looked up in the ledger and found to have no entry.
 */
export function NotFound({ locale }: { locale: Locale }) {
  const other: Locale = locale === "ar" ? "en" : "ar";
  const c = copy[locale];
  const o = copy[other];
  return (
    <section className="nf page-wrap" data-track-section="not_found" aria-labelledby="nf-heading">
      <div className="nf-copy">
        <p className="nf-code num">404</p>
        <h1 id="nf-heading" className="nf-title">
          {c.title}
        </h1>
        <p className="nf-body">{c.body}</p>
        <Ways lang={locale} />

        <div className="nf-alt" lang={other} dir={other === "ar" ? "rtl" : "ltr"}>
          <h2 className="nf-alt-title">{o.title}</h2>
          <Ways lang={other} />
        </div>
      </div>

      {/* The voided receipt: decoration only; the message is in the text beside it. */}
      <div className="nf-stage" aria-hidden="true">
        <div className="nf-field guilloche-tile" />
        <div className="nf-receipt">
          <span className="nf-receipt-no num">404</span>
          <span className="nf-row">
            <i />
            <i />
          </span>
          <span className="nf-row">
            <i />
            <i />
          </span>
          <span className="nf-row">
            <i />
            <i />
          </span>
          <span className="nf-row nf-sum">
            <b>{c.total}</b>
            <b className="num">0.00</b>
          </span>
          <span className="nf-stamp">
            <span>{c.stamp}</span>
            <span lang={other} dir={other === "ar" ? "rtl" : "ltr"}>
              {o.stamp}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
