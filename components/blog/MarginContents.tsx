"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useActiveSection } from "@/components/ui/useActiveSection";

/**
 * The ledger's margin: the article's sections as numbered entries, the one
 * being read inked in teal. Beside the text from 1024 px; below that, one row
 * that opens the list.
 */
export function MarginContents({ sections, title }: { sections: { id: string; heading: string }[]; title: string }) {
  const active = useActiveSection(
    useMemo(() => sections.map((section) => section.id), [sections]),
    "none",
  );
  const [open, setOpen] = useState(false);

  return (
    <nav className="blg-margin" aria-label={title}>
      <button type="button" className="blg-margin-toggle" aria-expanded={open} aria-controls="blg-contents" onClick={() => setOpen((value) => !value)}>
        <span>{title}</span>
        <Icon name="chevron" size={16} className="blg-margin-chevron" />
      </button>
      <p className="blg-margin-title" aria-hidden="true">
        {title}
      </p>
      <ol id="blg-contents" className="blg-margin-list" data-open={open || undefined}>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={section.id === active ? "true" : undefined} onClick={() => setOpen(false)}>
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
