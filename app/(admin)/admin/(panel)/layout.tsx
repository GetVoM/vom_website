import { Suspense } from "react";
import { Loader } from "@/components/admin/Loader";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/admin/auth";
import { signOut } from "../actions";

/** The sidebar and the page, rendered only once the visitor is known to be an admin. */
async function Shell({ children }: { children: React.ReactNode }) {
  const { userId } = await requireAdmin();
  return (
    <div className="adm-shell">
      <Sidebar userId={userId} signOutAction={signOut} />
      <main className="adm-main">
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </main>
    </div>
  );
}

/**
 * The admin's frame. Everything sits behind the admin check, so a visitor who
 * is not signed in sees a loader and is sent to the login page: no part of the
 * panel, not even its menu, is rendered for them. The check reads the session
 * per request, hence the Suspense boundary.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="adm-gate">
          <Loader rows={5} />
        </div>
      }
    >
      <Shell>{children}</Shell>
    </Suspense>
  );
}
