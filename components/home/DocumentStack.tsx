import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/seo/site";
import { QrCode } from "./QrCode";

/**
 * The hero's three sheets. Every size inside them is in em, and the stack sets the em
 * from its own width (globals.css, .doc-stack), so the drawing keeps its proportions
 * from a phone to a wide screen instead of wrapping.
 *
 * The invoice in front follows the layout of the tax invoice VoM prints (the owner's
 * sample of 2026-11-22): the title, the seller's box with its logo, the invoice's
 * number and date beside the customer and the QR code, the item table, the totals, and
 * the ZATCA and Fatoora marks at its foot. Its business, customer and figures are
 * sample data, and the hero says so under the stack.
 */
export function DocumentStack({ t }: { t: Dictionary }) {
  const h = t.heroInvoice;
  const rows = h.items.map(([name, qty, price]) => {
    const net = Number(qty) * Number(price);
    return { name, qty, price: Number(price), vat: net * 0.15, total: net * 1.15, net };
  });
  const net = rows.reduce((sum, row) => sum + row.net, 0);
  const vat = net * 0.15;
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="doc-stack" aria-hidden="true">
      {/* Report, at the back */}
      <div className="sheet sheet-report p-[1.4em]">
        <div className="mb-[0.7em] flex items-center justify-between border-b border-teal-500 pb-[0.7em]">
          <span className="font-bold">{t.report.title}</span>
          <span className="label-en text-[0.9em]">P&amp;L</span>
        </div>
        <div className="flex flex-col gap-[0.5em]">
          {t.report.rows.map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-ink-700">{label}</span>
              <span className="num">{value}</span>
            </div>
          ))}
          <div className="mt-[0.3em] flex justify-between border-t border-teal-500 pt-[0.5em] font-bold">
            <span>{t.report.net}</span>
            <span className="num text-teal-500">{t.report.netValue}</span>
          </div>
        </div>
        <div className="mt-[1em] flex h-[3.6em] items-end gap-[0.35em]">
          {[40, 55, 48, 70, 62, 84, 76, 96].map((height, i) => (
            <span key={i} className="flex-1 rounded-sm bg-teal-500" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="sheet sheet-certificate doc-frame p-[1.8em]">
        <div className="border-b border-teal-500 pb-[1em]">
          <div className="text-[1.35em] font-bold">{t.certificate.title}</div>
          <div className="label-en text-[0.9em]">Certificate of compliance</div>
        </div>
        <div className="mt-[1em] grid grid-cols-2 gap-[1em]">
          <div>
            <div className="text-ink-500">{t.certificate.establishment}</div>
            <div className="font-bold">{h.seller}</div>
          </div>
          <div>
            <div className="text-ink-500">{h.vatNumber}</div>
            <div className="num font-bold">300000000000003</div>
          </div>
          <div className="col-span-2">
            <div className="text-ink-500">{t.certificate.status}</div>
            <div className="flex items-center gap-[0.4em] font-bold text-teal-500">
              <span className="inline-flex h-[1.3em] w-[1.3em] items-center justify-center rounded-full bg-teal-500 text-white">
                <Icon name="check" size={9} strokeWidth={3} className="h-[0.8em] w-[0.8em]" />
              </span>
              {t.certificate.statusValue}
            </div>
          </div>
        </div>
        <div className="seal ms-auto mt-[1.3em] flex h-[7.6em] w-[7.6em] flex-col items-center justify-center rounded-full border-[3px] border-double border-teal-500 text-center text-teal-500">
          <span className="text-[0.75em] leading-tight">{t.certificate.sealTop}</span>
          <span className="text-[1.35em] font-extrabold leading-none">{t.certificate.sealMain}</span>
          <span className="label-en text-[0.9em] text-teal-500">Phase 2</span>
        </div>
      </div>

      {/* The tax invoice, in front */}
      <div className="sheet sheet-invoice">
        <div className="flex flex-col gap-[1.1em] p-[1.6em]">
          <span className="self-start rounded-pill bg-paper-100 px-[1em] py-[0.3em] text-[1.3em] font-bold text-teal-500">
            {h.title}
          </span>

          {/* The seller */}
          <div className="flex items-center justify-between gap-[1em] rounded-[0.9em] bg-paper-100 px-[1.1em] py-[0.9em]">
            <div className="flex flex-col gap-[0.35em]">
              <div className="text-[1.1em] font-bold">{h.seller}</div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-[0.9em] gap-y-[0.25em]">
              <dt className="text-ink-500">{h.vatNumber}</dt>
              <dd className="num">300000000000003</dd>
              <dt className="text-ink-500">{h.crNumber}</dt>
              <dd className="num">1010000000</dd>
              </dl>
            </div>
            {/* The sample seller's own mark: a sun on its horizon, for "الأفق". */}
            <svg viewBox="0 0 40 40" className="h-[3.6em] w-[3.6em] shrink-0 rounded-[0.6em] bg-paper" aria-hidden="true">
              <path d="M11 25a9 9 0 0 1 18 0z" fill="var(--color-orange-500)" />
              <path d="M7 28.5h26" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>

          {/* The invoice and its customer, with the QR code */}
          <div className="flex items-start justify-between gap-[1em]">
            <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-[0.9em] gap-y-[0.3em]">
              <dt className="text-ink-500">{h.number}</dt>
              <dd className="num font-bold">INV0142</dd>
              <dt className="text-ink-500">{h.date}</dt>
              <dd className="num">25-10-2026</dd>
              <dt className="text-ink-500">{h.customer}</dt>
              <dd className="font-bold">{h.customerName}</dd>
              <dt className="text-ink-500">{h.vatNumber}</dt>
              <dd className="num">310000000000003</dd>
            </dl>
            <QrCode className="w-[6.4em] shrink-0" />
          </div>

          {/* The items */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-500 text-[0.9em] text-white">
                {h.columns.map((column, i) => (
                  <th
                    key={column}
                    className={`px-[0.6em] py-[0.45em] font-bold first:rounded-s-[0.5em] last:rounded-e-[0.5em] ${i === 0 ? "text-start" : i === 1 ? "text-center" : "text-end"}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-paper-200">
                  <td className="px-[0.6em] py-[0.5em]">{row.name}</td>
                  <td className="num px-[0.6em] py-[0.5em] text-center">{row.qty}</td>
                  <td className="num px-[0.6em] py-[0.5em] text-end">{fmt(row.price)}</td>
                  <td className="num px-[0.6em] py-[0.5em] text-end text-ink-500">{fmt(row.vat)}</td>
                  <td className="num px-[0.6em] py-[0.5em] text-end">{fmt(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* The totals, on the end side as the printed invoice has them, and ZATCA's clearance stamped beside them */}
          <div className="flex items-center justify-between gap-[1em]">
            <span className="inv-stamp inline-flex items-center gap-[0.45em] rounded-[0.5em] border-[3px] border-double border-teal-500 px-[0.8em] py-[0.4em] text-[1.05em] font-bold text-teal-500">
              <Icon name="check" size={11} strokeWidth={3} className="h-[1em] w-[1em]" />
              {h.cleared}
            </span>
            <dl className="grid w-[58%] grid-cols-[1fr_auto] gap-x-[1em] gap-y-[0.35em]">
              <dt className="text-ink-700">{h.net}</dt>
              <dd className="num text-end">{fmt(net)}</dd>
              <dt className="text-ink-700">{h.vat}</dt>
              <dd className="num text-end">{fmt(vat)}</dd>
              <dt className="mt-[0.3em] border-t border-ink pt-[0.4em] text-[1.2em] font-bold">{h.total}</dt>
              <dd className="mt-[0.3em] border-t border-ink pt-[0.4em] text-end text-[1.2em] font-bold text-teal-500">
                <span className="num">{fmt(net + vat)}</span> <span className="text-[0.75em]">{h.currency}</span>
              </dd>
            </dl>
          </div>

          {/* ZATCA and Fatoora */}
          <div className="flex items-center justify-between gap-[1em] border-t border-paper-200 pt-[1em]">
            <span className="text-[0.9em] text-ink-500">{h.phase}</span>
            <span className="flex items-center gap-[1.1em]">
              {/* eslint-disable-next-line @next/next/no-img-element -- an SVG is served as is */}
              <img src={site.zatcaLogo.src} alt="" width={site.zatcaLogo.width} height={site.zatcaLogo.height} decoding="async" className="h-[3em] w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element -- an SVG is served as is */}
              <img src={site.fatooraLogo.src} alt="" width={site.fatooraLogo.width} height={site.fatooraLogo.height} decoding="async" className="h-[4.6em] w-auto" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
