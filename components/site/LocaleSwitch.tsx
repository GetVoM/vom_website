"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { otherLocale, type Locale } from "@/lib/i18n/config";
import { alternateHref } from "@/lib/i18n/routes";

interface LocaleSwitchProps {
  locale: Locale;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function LocaleSwitch({ locale, label, className, onClick }: LocaleSwitchProps) {
  const segments = useSelectedLayoutSegments();
  const other = otherLocale(locale);
  return (
    <Link href={alternateHref(locale, segments)} hrefLang={other} lang={other} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}
