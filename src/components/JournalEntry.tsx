import Link from "next/link";

import type { Post } from "@/types/content";
import { formatDate } from "@/lib/progress";
import { glass } from "@/lib/ui";

interface JournalEntryProps {
  post: Post;
  /** When true, renders as a compact list item (e.g. on the home page). */
  compact?: boolean;
}

/** A dated entry preview linking to a journal / culture / work post. */
export function JournalEntry({ post, compact = false }: JournalEntryProps) {
  const href = `/${post.collection}/${post.slug}`;

  return (
    <article className={"rounded-lg " + glass + " " + (compact ? "p-4" : "p-5")}>
      <time
        dateTime={post.date}
        className="text-xs font-medium uppercase tracking-wide text-hanko dark:text-hanko-light"
      >
        {formatDate(post.date)}
      </time>
      <h3 className={"mt-1 font-serif font-semibold text-ink dark:text-paper-100 " + (compact ? "text-lg" : "text-xl")}>
        <Link href={href} className="underline-offset-4 hover:underline">
          {post.title}
        </Link>
      </h3>
      {post.summary && (
        <p className="mt-1 text-sm text-ink-light dark:text-paper-200">{post.summary}</p>
      )}
      {post.tags.length > 0 && !compact && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-xs text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-paper-300"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
