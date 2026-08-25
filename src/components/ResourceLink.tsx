import type { Resource } from "@/types/content";
import { glass } from "@/lib/ui";

interface ResourceLinkProps {
  resource: Resource;
}

/** An external study resource with a short neutral description. */
export function ResourceLink({ resource }: ResourceLinkProps) {
  return (
    <article className={"rounded-lg p-4 " + glass}>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-lg font-semibold text-ink underline-offset-4 hover:text-hanko hover:underline dark:text-paper-100 dark:hover:text-hanko-light"
        >
          {resource.name}
        </a>
        <span className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-xs text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-paper-300">
          {resource.category}
        </span>
        <span
          className={
            "rounded-full px-2 py-0.5 text-xs " +
            (resource.free
              ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200")
          }
        >
          {resource.free ? "Free" : "Paid"}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink-light dark:text-paper-200">{resource.comment}</p>
    </article>
  );
}
