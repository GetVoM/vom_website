"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { common } from "@/lib/tools/copy";
import { formatAmount, formatMoney, formatPercent } from "@/lib/tools/format";
import { parseAmount, type ParseError } from "@/lib/tools/parse";

/**
 * The calculators' shared parts: a number field that reads Arabic and Western
 * digits alike, the sheet (a form that never reloads the page), the poster
 * answer and its parts, and a polite live region. Styled from `.tol-` in
 * app/globals.css.
 */

export interface NumberState {
  raw: string;
  value: number | null;
  error: ParseError | undefined;
  set: (raw: string) => void;
  blur: () => void;
  reset: (raw?: string) => void;
}

/** A field's text as typed, its parsed value, and an error shown once the field has been left. */
export function useNumber(initial = ""): NumberState {
  const [raw, setRaw] = useState(initial);
  const [touched, setTouched] = useState(false);
  const parsed = parseAmount(raw);
  return {
    raw,
    value: parsed.value,
    error: touched ? parsed.error : undefined,
    set: setRaw,
    blur: () => {
      setTouched(true);
      // A valid figure is rewritten in Western digits with separators: ١٢٥٠٠ → 12,500.
      if (parsed.value !== null && !parsed.error) setRaw(formatAmount(parsed.value));
    },
    reset: (next = "") => {
      setRaw(next);
      setTouched(false);
    },
  };
}

export type Unit = "sar" | "percent" | "gram";

export function NumberField({
  label,
  field,
  unit,
  hint,
  placeholder,
  wide,
}: {
  label: string;
  field: NumberState;
  unit: Unit;
  hint?: string;
  placeholder?: string;
  wide?: boolean;
}) {
  const id = useId();
  const described = [hint && `${id}-hint`, field.error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="tol-field" data-wide={wide || undefined}>
      <label htmlFor={id}>
        {label}
        {unit === "sar" && !label.includes("ريال") && <span className="sr-only"> ({common.riyal})</span>}
      </label>
      <div className="tol-input" data-unit={unit}>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          dir="ltr"
          autoComplete="off"
          enterKeyHint="done"
          spellCheck={false}
          value={field.raw}
          placeholder={placeholder}
          onChange={(event) => field.set(event.target.value)}
          onBlur={field.blur}
          aria-invalid={field.error ? true : undefined}
          aria-describedby={described}
        />
        {unit === "percent" && <span aria-hidden="true">%</span>}
        {unit === "gram" && <span aria-hidden="true">{common.gram}</span>}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="tol-hint">
          {hint}
        </p>
      )}
      {field.error && (
        <p id={`${id}-error`} className="tol-error">
          {common.errors[field.error]}
        </p>
      )}
    </div>
  );
}

/**
 * The paper sheet: a form that never reloads the page. Results update as the
 * visitor types; the button (the old widget's label) brings the answer into
 * view on a phone, where it sits under the fields, and reads it out.
 */
export function Sheet({
  title,
  titleLevel = 2,
  intro,
  head,
  button,
  answerRef,
  onSubmit,
  children,
  footer,
}: {
  title?: string;
  titleLevel?: 2 | 3;
  intro?: string;
  head?: ReactNode;
  /** The old widget's button label; VAT had none, its results were live. */
  button?: string;
  answerRef: RefObject<HTMLDivElement | null>;
  onSubmit?: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const Title = titleLevel === 3 ? "h3" : "h2";
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit?.();
    const answer = answerRef.current;
    if (!answer) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (answer.getBoundingClientRect().top > window.innerHeight * 0.6) answer.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };
  return (
    <form className="tol-sheet" noValidate onSubmit={submit}>
      {head}
      {title && <Title className="tol-sheet-title">{title}</Title>}
      {intro && <p className="tol-sheet-intro">{intro}</p>}
      <div className="tol-fields">{children}</div>
      {(button || footer) && (
        <div className="tol-sheet-foot">
          {button && (
            <button type="submit" className="btn btn-secondary tol-submit">
              {button}
            </button>
          )}
          {footer}
        </div>
      )}
    </form>
  );
}

/** An amount in riyals with the drawn riyal sign; the word is for screen readers. */
export function Money({ value }: { value: number }) {
  return (
    <span className="sar" dir="ltr">
      {formatMoney(value)}
      <i>{` ${common.riyal}`}</i>
    </span>
  );
}

export function Percent({ value }: { value: number }) {
  return (
    <span className="num" dir="ltr">
      {formatPercent(value)}
    </span>
  );
}

export interface Part {
  label: string;
  value: ReactNode;
}

/**
 * The answer at poster scale: its label, the figure, the double white rule,
 * then the other results in a ruled row. `muted` before anything is typed.
 */
export function Answer({
  answerRef,
  caption,
  label,
  figure,
  figureText,
  parts,
  note,
  muted,
  children,
}: {
  answerRef: RefObject<HTMLDivElement | null>;
  /** Words that lead into the label and read as one sentence with it («بناءً على هذه الأرقام: سعر البيع»). */
  caption?: string;
  label: string;
  figure: ReactNode;
  /** The figure as plain text, to size it: long amounts step down. */
  figureText: string;
  parts?: Part[];
  note?: ReactNode;
  muted?: boolean;
  children?: ReactNode;
}) {
  const size = figureText.length > 15 ? "s" : figureText.length > 11 ? "m" : undefined;
  return (
    <div className="tol-answer" ref={answerRef} data-muted={muted || undefined}>
      <p className="tol-answer-label">
        {caption && <>{caption} </>}
        {label}
      </p>
      <p className="tol-figure" data-size={size}>
        {figure}
      </p>
      {parts && parts.length > 0 && (
        <dl className="tol-parts">
          {parts.map((part) => (
            <div key={part.label}>
              <dt>{part.label}</dt>
              <dd>{part.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {(muted || note) && <p className="tol-note">{muted ? common.empty : note}</p>}
      {children}
    </div>
  );
}

/** One sentence for screen readers, spoken a moment after typing stops. */
export function LiveSummary({ text }: { text: string }) {
  const [spoken, setSpoken] = useState("");
  const first = useRef(true);
  useEffect(() => {
    // Nothing is read on load: only a change the visitor made.
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = window.setTimeout(() => setSpoken(text), 700);
    return () => window.clearTimeout(timer);
  }, [text]);
  return (
    <p className="sr-only" aria-live="polite" aria-atomic="true">
      {spoken}
    </p>
  );
}

/** Plain-text amount for the live summary and the clipboard: "2,875.00 ريال". */
export const spokenMoney = (value: number) => `${formatMoney(value)} ${common.riyal}`;
export const spokenPercent = (value: number) => formatPercent(value);
