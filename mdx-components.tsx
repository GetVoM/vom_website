import type { MDXComponents } from "mdx/types";
import { accountingGuideMdxComponents } from "@/components/accounting-guide/mdx";
import { einvoicingMdxComponents } from "@/components/einvoicing/mdx";

/**
 * Required by @next/mdx in the App Router. The MDX today is the e-invoicing
 * guides (content/e-invoicing/) and the accounting-software guide
 * (content/accounting-guide.mdx); the second uses the first's house components
 * plus a few of its own.
 */
const components: MDXComponents = {
  ...einvoicingMdxComponents,
  ...accountingGuideMdxComponents,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
