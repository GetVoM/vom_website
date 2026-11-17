"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { otherLocale, type Locale } from "@/lib/i18n/config";
import { alternateHref } from "@/lib/i18n/routes";
import { track } from "@/lib/analytics/track";

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
    <Link href={alternateHref(locale, segments)} hrefLang={other} lang={other} className={className}
      onClick={() => {
        track("locale_switched", { from: locale, to: other });
        onClick?.();
      }}
    >
      {label}
    </Link>
  );
}
