import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WorkSubNav } from "@/components/work/WorkSubNav";
import { getPosts } from "@/lib/posts";
import { workPageList } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Practical guides: first days, colleagues, keigo formulas, meetings, unwritten rules, social events, and interviews.",
};

export default function WorkPage() {
  const articles = getPosts("work");

  return (
    <div className="space-y-10">
      <WorkSubNav />
      <PageHeader
        title="Work"
        glyph="働"
        intro={
          <p>
            On-the-ground behaviour — what to do and say — not macro economics. Each page has
            ready-to-use phrases with register labelled, plus do/don&apos;t lists you can skim before
            a meeting or interview.
          </p>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {workPageList.map((page, i) => (
          <ScrollReveal key={page.slug} index={i}>
            <Link
              href={`/work/${page.slug}`}
              className="block rounded-xl border border-paper-300 bg-paper-50 p-5 transition hover:border-hanko/40 hover:shadow-sm dark:border-sumi-border dark:bg-sumi-light dark:hover:border-hanko-light/40"
            >
              <span className="font-jp text-lg text-hanko dark:text-hanko-light">{page.glyph}</span>
              <h2 className="mt-1 font-serif text-xl font-semibold text-ink dark:text-paper-100">
                {page.title}
              </h2>
              <p className="mt-2 text-sm text-ink-light dark:text-paper-200">{page.description}</p>
            </Link>
          </ScrollReveal>
        ))}
      </section>

      {articles.length > 0 && (
        <section className="space-y-3">
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">
              Field notes
            </h2>
            <p className="mt-1 text-sm text-ink-muted dark:text-paper-300">
              Longer write-ups from the learning log.
            </p>
          </ScrollReveal>
          <ul className="divide-y divide-paper-200 rounded-lg border border-paper-300 dark:divide-sumi-border dark:border-sumi-border">
            {articles.map((post) => (
              <li key={post.slug} className="bg-paper-50 dark:bg-sumi-light">
                <Link
                  href={`/work/${post.slug}`}
                  className="block px-4 py-3 hover:bg-paper-200 dark:hover:bg-sumi-border"
                >
                  <span className="font-medium text-ink dark:text-paper-100">{post.title}</span>
                  <span className="mt-1 block text-sm text-ink-muted dark:text-paper-300">
                    {post.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
