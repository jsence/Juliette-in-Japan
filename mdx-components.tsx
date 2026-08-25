import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx for the App Router. next-mdx-remote uses its own
 * component mapping for post bodies, so this simply passes components through.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
