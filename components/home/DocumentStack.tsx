import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { QrCode } from "./QrCode";

export function DocumentStack({ t }: { t: Dictionary }) {
  const subtotal = t.invoice.items.reduce((sum, [, qty, price]) => sum + Number(qty) * Number(price), 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="doc-stack" aria-hidden="true">
      {/* Report, at the back */}
      <div className="sheet sheet-report p-4 text-[0.6875rem]">
        <div className="mb-2 flex items-center justify-between border-b border-teal-200 pb-2">
          <span className="font-bold">{t.report.title}</span>
          <span className="label-en">P&amp;L</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {t.report.rows.map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-ink-700">{label}</span>
              <span className="num">{value}</span>
            </div>
          ))}
          <div className="mt-1 flex justify-between border-t border-teal-200 pt-1.5 font-bold">
            <span>{t.report.net}</span>
            <span className="num text-teal-700">{t.report.netValue}</span>
          </div>
        </div>
        <div className="mt-3 flex h-10 items-end gap-1">
          {[40, 55, 48, 70, 62, 84, 76, 96].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i % 2 ? "var(--color-teal-500)" : "var(--color-teal-200)" }}
            />
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="sheet sheet-certificate doc-frame p-5 text-[0.6875rem]">
        <div className="flex items-start justify-between border-b border-teal-200 pb-3">
          <div>
            <div className="text-[0.9375rem] font-bold">{t.certificate.title}</div>
            <div className="label-en">Certificate of compliance</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <div className="text-ink-500">{t.certificate.establishment}</div>
            <div className="font-bold">{t.invoice.seller}</div>
          </div>
          <div>
            <div className="text-ink-500">{t.invoice.vatNumber}</div>
            <div className="num font-bold" dir="ltr">
              3000 0000 0000 03
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-ink-500">{t.certificate.status}</div>
            <div className="flex items-center gap-1.5 font-bold text-teal-700">
              <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal-500 text-white">
                <Icon name="check" size={9} strokeWidth={3} />
              </span>
              {t.certificate.statusValue}
            </div>
          </div>
        </div>
        <div className="seal ms-auto mt-4 flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full border-[3px] border-double border-teal-500 text-center text-teal-700">
          <span className="text-[0.5rem] leading-tight">{t.certificate.sealTop}</span>
          <span className="text-[0.9375rem] font-extrabold leading-none">{t.certificate.sealMain}</span>
          <span className="label-en text-teal-700">Phase 2</span>
        </div>
      </div>

      {/* Invoice, in front */}
      <div className="sheet sheet-invoice p-4 text-[0.6875rem]">
        <div className="badge-pop inline-flex items-center gap-1.5 rounded-pill bg-teal-500 px-2.5 py-1 text-[0.625rem] font-bold text-white">
          <Icon name="check" size={11} strokeWidth={3} />
          {t.invoice.reported}
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[0.8125rem] font-bold">{t.invoice.kind}</div>
            <div className="text-ink-500">{t.invoice.seller}</div>
          </div>
          <div className="text-end">
            <div className="text-ink-500">{t.invoice.date}</div>
            <div className="num">2026/10/25</div>
          </div>
        </div>
        <div className="mt-3 border-t border-paper-300" />
        <table className="mt-2 w-full border-collapse">
          <tbody>
            {t.invoice.items.map(([name, qty, price]) => (
              <tr key={name} className="border-b border-paper-200">
                <td className="py-1.5">{name}</td>
                <td className="num py-1.5 text-center text-ink-500">×{qty}</td>
                <td className="num py-1.5 text-end">{fmt(Number(qty) * Number(price))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex justify-between text-ink-700">
            <span>{t.invoice.subtotal}</span>
            <span className="num">{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-700">
            <span>{t.invoice.vat}</span>
            <span className="num">{fmt(vat)}</span>
          </div>
          <div className="flex justify-between border-t border-ink pt-1.5 text-[0.875rem] font-bold">
            <span>{t.invoice.total}</span>
            <span className="num">{fmt(total)}</span>
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <QrCode className="w-[76px]" />
          <div className="label-en">ZATCA · Phase 2</div>
        </div>
      </div>
    </div>
  );
}
