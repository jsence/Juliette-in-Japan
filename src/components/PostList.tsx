import type { ReactNode } from "react";

import { PageHeader } from "./PageHeader";
import { JournalEntry } from "./JournalEntry";
import { ScrollReveal } from "./ScrollReveal";
import { getPosts } from "@/lib/posts";
import type { PostCollection } from "@/types/content";

interface PostListProps {
  collection: PostCollection;
  title: string;
  glyph: string;
  intro: ReactNode;
}

/** A dated listing of every post in a collection. */
export function PostList({ collection, title, glyph, intro }: PostListProps) {
  const posts = getPosts(collection);

  return (
    <div className="space-y-8">
      <PageHeader title={title} glyph={glyph} intro={intro} />
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} index={i}>
              <JournalEntry post={post} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p className="text-ink-muted dark:text-paper-300">No entries yet.</p>
      )}
    </div>
  );
}
