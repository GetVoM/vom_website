"use client";

import { createContext, useContext, type ReactNode } from "react";

const AdminBase = createContext("/admin");

/** Gives client components the admin's address, which only the server knows (lib/admin/path.ts). */
export function AdminBaseProvider({ base, children }: { base: string; children: ReactNode }) {
  return <AdminBase.Provider value={base}>{children}</AdminBase.Provider>;
}

/** Builds admin addresses in a client component: `href("posts/")`. */
export function useAdminHref(): (path?: string) => string {
  const base = useContext(AdminBase);
  return (path = "") => `${base}/${path.replace(/^\/+/, "")}`;
}
