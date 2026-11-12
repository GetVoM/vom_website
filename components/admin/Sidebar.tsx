"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { Suspense, useEffect, useState } from "react";
import { useAdminHref } from "./AdminBase";

interface Item {
  label: string;
  /** Path under the admin's address, with any query. */
  to: string;
  /** Marks the item current when the address matches. */
  match: (path: string, type: string) => boolean;
}

const content: Item[] = [
  { label: "المقالات", to: "?type=post", match: (path, type) => path === "" && (type === "post" || type === "") },
  { label: "الأخبار", to: "?type=news", match: (path, type) => path === "" && type === "news" },
  { label: "القوالب والنماذج", to: "?type=template", match: (path, type) => path === "" && type === "template" },
];
const library: Item[] = [
  { label: "التصنيفات", to: "categories/", match: (path) => path.startsWith("categories") },
  { label: "الكتّاب والمراجعون", to: "authors/", match: (path) => path.startsWith("authors") },
];
const inbox: Item[] = [{ label: "الطلبات", to: "leads/", match: (path) => path.startsWith("leads") }];

/** A small spinner beside the link that was pressed, until its page arrives. */
function Pending() {
  const { pending } = useLinkStatus();
  return <span className="adm-side-pending" data-pending={pending || undefined} aria-hidden="true" />;
}

function Items({ items, onNavigate }: { items: Item[]; onNavigate: () => void }) {
  const href = useAdminHref();
  const base = href();
  const pathname = usePathname();
  const type = useSearchParams().get("type") ?? "";
  // The path below the admin's address, whatever that address is.
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\/admin\/?/, "");
  return (
    <ul role="list">
      {items.map((item) => (
        <li key={item.to}>
          <Link href={href(item.to)} aria-current={item.match(path, type) ? "page" : undefined} onClick={onNavigate}>
            <span>{item.label}</span>
            <Pending />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * The admin's sidebar: content types, the library behind them, and the leads
 * inbox, with the current section marked. It establishes the verified Supabase
 * user ID for browser analytics once the authenticated panel mounts.
 */
export function Sidebar({ userId, signOutAction }: { userId: string; signOutAction: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    posthog.identify(userId);
  }, [userId]);

  const signOut = () => {
    posthog.reset();
    void signOutAction();
  };
  const group = (title: string, items: Item[]) => (
    <div className="adm-side-group">
      <p className="adm-side-title">{title}</p>
      {/* The links read the address's query, which is only known per request. */}
      <Suspense fallback={null}>
        <Items items={items} onNavigate={close} />
      </Suspense>
    </div>
  );
  return (
    <aside className="adm-side">
      <div className="adm-side-head">
        <p className="adm-brand">ڤوم · لوحة التحرير</p>
        <button type="button" className="adm-side-toggle" aria-expanded={open} aria-controls="adm-side-nav" onClick={() => setOpen((value) => !value)}>
          القائمة
        </button>
      </div>
      <nav id="adm-side-nav" className="adm-side-nav" aria-label="أقسام اللوحة" data-open={open || undefined}>
        {group("المحتوى", content)}
        {group("المكتبة", library)}
        {group("الوارد", inbox)}
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener">
            فتح الموقع
          </a>
          <button type="button" className="adm-side-signout" onClick={signOut}>
            تسجيل الخروج
          </button>
        </div>
      </nav>
    </aside>
  );
}
