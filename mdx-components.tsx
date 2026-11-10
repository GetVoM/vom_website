import type { MDXComponents } from "mdx/types";
import { einvoicingMdxComponents } from "@/components/einvoicing/mdx";

/**
 * Required by @next/mdx in the App Router. The only MDX today is the
 * e-invoicing guides (content/e-invoicing/), so their house components are
 * the whole map.
 */
const components: MDXComponents = {
  ...einvoicingMdxComponents,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
