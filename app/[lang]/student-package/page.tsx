import type { Metadata } from "next";
import { lang } from "next/root-params";
import { StudentPage, studentMetadata } from "@/components/student/StudentPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return studentMetadata(await currentLocale());
}

/** Student package at /student-package/ and /en/student-package/. */
export default async function StudentRoute() {
  return <StudentPage locale={await currentLocale()} />;
}
