import type { ReactNode } from "react";
import type { ReportId } from "@/lib/i18n/dictionaries/types";

/**
 * The reports' icons: the owner's set of 2026-11-22 (VoM-Report-Icons, one 80 by
 * 40 SVG per report), drawn inline so a list of seventeen costs no requests. The
 * paths are the files' own; their two colours, #17BAA3 and #D7E3EC, are the teal
 * and paper-300 tokens. Drawn the same in both languages, as the set was: the
 * percent signs would read wrong mirrored.
 */

const teal = "var(--color-teal-500)";
const grey = "var(--color-paper-300)";

/** A stroked path with the set's round caps and joins. */
function Line({ d, color, width }: { d: string; color: string; width: number }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />;
}

/** A bar with fully rounded ends; at equal sides, a dot. */
function Bar({ x, y, w, h = 5, color }: { x: number; y: number; w: number; h?: number; color: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} />;
}

/** The percent sign the three VAT icons share, its upper dot at `x`. */
function Percent({ x }: { x: number }) {
  return (
    <>
      <circle cx={x} cy={13} r={3} fill={teal} />
      <Line d={`M${x} 29l14 -17`} color={teal} width={4.6} />
      <circle cx={x + 14} cy={28} r={3} fill={teal} />
    </>
  );
}

const tray = "M9 22v7q0 5 5 5h31q5 0 5 -5v-7";

const icons: Record<ReportId, ReactNode> = {
  vat: (
    <>
      <Bar x={3} y={6} w={9} h={6} color={teal} />
      <Bar x={16} y={6} w={30} h={6} color={grey} />
      <Bar x={3} y={17} w={14} h={6} color={teal} />
      <Bar x={21} y={17} w={25} h={6} color={grey} />
      <Bar x={3} y={28} w={7} h={6} color={teal} />
      <Bar x={14} y={28} w={32} h={6} color={grey} />
      <Percent x={55} />
    </>
  ),
  "income-statement": (
    <>
      <Line d="M6 32H73" color={grey} width={4} />
      <Line d="M8 27l16 -9 13 4 17 -14 14 2" color={teal} width={4} />
      <circle cx={68} cy={10} r={3.4} fill={teal} />
    </>
  ),
  "balance-sheet": (
    <>
      <Line d="M40 7v25m-12 1h24" color={grey} width={5} />
      <Line d="M13 10h54" color={teal} width={4} />
      <Line d="M17 12l-8 13h16z M63 12l-8 13h16z" color={grey} width={3.5} />
      <Bar x={8} y={25} w={18} color={teal} />
      <Bar x={54} y={25} w={18} color={teal} />
    </>
  ),
  "cash-flow-direct": (
    <>
      <Line d="M8 12h57l-7 -6m7 6 -7 6" color={teal} width={4} />
      <Line d="M72 28H15l7 -6m-7 6 7 6" color={grey} width={5} />
    </>
  ),
  "cash-flow-indirect": (
    <>
      <Line d="M8 28h14q5 0 5 -5v-8q0 -5 5 -5h32l-6 -6m6 6 -6 6" color={teal} width={4} />
      <Line d="M38 29h27" color={grey} width={5} />
      <circle cx={10} cy={28} r={4} fill={grey} />
    </>
  ),
  "trial-balance": (
    <>
      <Line d="M40 7v26" color={grey} width={4} />
      <Bar x={10} y={8} w={23} color={grey} />
      <Bar x={10} y={17} w={23} color={grey} />
      <Bar x={10} y={28} w={23} color={teal} />
      <Bar x={47} y={8} w={23} color={grey} />
      <Bar x={47} y={17} w={23} color={grey} />
      <Bar x={47} y={28} w={23} color={teal} />
    </>
  ),
  "general-ledger": (
    <>
      <Line d="M39 11q-13 -8 -28 -5v24q15 -3 28 5q14 -8 29 -5V6q-15 -3 -29 5z" color={grey} width={4.5} />
      <Line d="M39 12v20" color={teal} width={4} />
      <Line d="M19 15q6 0 12 3m17 0q6 -3 12 -3" color={teal} width={3.5} />
    </>
  ),
  "account-statements": (
    <>
      <Bar x={11} y={6} w={48} color={grey} />
      <Bar x={11} y={16} w={41} color={grey} />
      <Bar x={11} y={26} w={50} color={grey} />
      <circle cx={7} cy={8.5} r={2.5} fill={teal} />
      <circle cx={7} cy={18.5} r={2.5} fill={teal} />
      <circle cx={7} cy={28.5} r={2.5} fill={teal} />
      <Bar x={56} y={26} w={16} color={teal} />
    </>
  ),
  "account-summary": (
    <>
      <Line d="M27 7a13 13 0 1 0 13 13H27z" color={grey} width={5} />
      <Line d="M33 6q9 2 10 10H33z" color={teal} width={3} />
      <Bar x={50} y={10} w={21} color={teal} />
      <Bar x={50} y={20} w={15} color={teal} />
    </>
  ),
  "customer-ageing": (
    <>
      <circle cx={18} cy={12} r={7} fill={grey} />
      <Line d="M6 31q1 -10 12 -10t13 10" color={grey} width={5} />
      <Line d="M66 20a13 13 0 1 1 -26 0a13 13 0 1 1 26 0" color={teal} width={4} />
      <Line d="M53 12v9l6 3" color={teal} width={3.5} />
    </>
  ),
  sales: (
    <>
      <Line d={tray} color={grey} width={5} />
      <Line d="M31 24l18 -18m-9 0h9v9" color={teal} width={4} />
    </>
  ),
  purchases: (
    <>
      <Line d={tray} color={grey} width={5} />
      <Line d="M41 6l-18 18m9 0h-9v-9" color={teal} width={4} />
    </>
  ),
  "sales-vat": (
    <>
      <Line d="M8 31h31" color={grey} width={5} />
      <Line d="M13 26l18 -18m-9 0h9v9" color={teal} width={4} />
      <Percent x={54} />
    </>
  ),
  "purchases-vat": (
    <>
      <Line d="M8 31h31" color={grey} width={5} />
      <Line d="M31 8l-18 18m9 0h-9v-9" color={teal} width={4} />
      <Percent x={54} />
    </>
  ),
  "cost-centres": (
    <>
      <Line d="M40 11v8M15 26v-7h50v7" color={grey} width={4} />
      <Bar x={30} y={3} w={20} h={9} color={teal} />
      <Bar x={8} y={25} w={15} h={9} color={grey} />
      <Bar x={33} y={25} w={15} h={9} color={teal} />
      <Bar x={58} y={25} w={15} h={9} color={grey} />
    </>
  ),
  journal: (
    <>
      <Bar x={7} y={8} w={43} color={grey} />
      <Bar x={7} y={18} w={34} color={grey} />
      <Bar x={7} y={28} w={26} color={grey} />
      <Line d="M42 29l2 -7L62 5l5 5 -18 17z" color={teal} width={3.6} />
      <Line d="M58 10l5 5" color={teal} width={3} />
    </>
  ),
  assets: (
    <>
      <Line d="M12 32V10q0 -4 4 -4h20q4 0 4 4v22m0 -16h20q4 0 4 4v12" color={grey} width={4.5} />
      <Line d="M7 34h63" color={teal} width={4} />
      <Bar x={19} y={12} w={5} color={teal} />
      <Bar x={28} y={12} w={5} color={teal} />
      <Bar x={19} y={21} w={5} color={teal} />
      <Bar x={28} y={21} w={5} color={teal} />
      <Bar x={48} y={23} w={5} color={teal} />
      <Bar x={56} y={23} w={5} color={teal} />
    </>
  ),
};

/** One report's icon, 80 by 40 unless the stylesheet sizes it. Decorative: the report's name always sits beside it. */
export function ReportIcon({ id, className }: { id: ReportId; className?: string }) {
  return (
    <svg viewBox="0 0 80 40" width={80} height={40} aria-hidden="true" focusable="false" className={className}>
      {icons[id]}
    </svg>
  );
}
