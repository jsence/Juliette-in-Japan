import { MDXRemote } from "next-mdx-remote/rsc";

interface MdxProps {
  source: string;
}

/** Renders MDX post bodies with the site's prose styling. */
export function Mdx({ source }: MdxProps) {
  return (
    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink-light prose-a:text-hanko dark:prose-invert dark:prose-headings:text-paper-100 dark:prose-p:text-paper-200 dark:prose-a:text-hanko-light">
      <MDXRemote source={source} />
    </div>
  );
}
