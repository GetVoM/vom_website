import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { ToolsIndex, toolsIndexMetadata } from "@/components/tools/ToolsIndex";

/** The financial tools index at /tools/ (url-map.csv keep row), Arabic only: /en/tools/ 404s. */
async function arabicOnly() {
  if ((await lang()) !== "ar") notFound();
}

export async function generateMetadata(): Promise<Metadata> {
  await arabicOnly();
  return toolsIndexMetadata();
}

export default async function ToolsIndexRoute() {
  await arabicOnly();
  return <ToolsIndex />;
}
