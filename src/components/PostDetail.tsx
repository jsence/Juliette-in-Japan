import Link from "next/link";

import { Mdx } from "./Mdx";
import { formatDate } from "@/lib/progress";
import type { Post } from "@/types/content";

interface PostDetailProps {
  post: Post;
  backHref: string;
  backLabel: string;
}

/** A single rendered post with its dated header and tags. */
export function PostDetail({ post, backHref, backLabel }: PostDetailProps) {
  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href={backHref}
        className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
      >
        ← {backLabel}
      </Link>
      <header className="mt-4">
        <time
          dateTime={post.date}
          className="text-xs font-medium uppercase tracking-wide text-hanko dark:text-hanko-light"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="mt-1 font-serif text-3xl font-bold text-ink dark:text-paper-100 sm:text-4xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
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
      </header>
      <div className="mt-6">
        <Mdx source={post.content} />
      </div>
    </article>
  );
}
