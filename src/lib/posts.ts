import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { Post, PostCollection, PostFrontmatter } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function collectionDir(collection: PostCollection): string {
  return path.join(CONTENT_ROOT, collection);
}

/** Read and parse every MDX post in a collection, newest first. */
export function getPosts(collection: PostCollection): Post[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => parsePost(collection, file))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Read a single post by slug, or null if it does not exist. */
export function getPost(collection: PostCollection, slug: string): Post | null {
  const dir = collectionDir(collection);
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  const file = candidates.find((c) => fs.existsSync(path.join(dir, c)));
  if (!file) return null;
  return parsePost(collection, file);
}

/** Every slug in a collection (for generateStaticParams). */
export function getPostSlugs(collection: PostCollection): string[] {
  return getPosts(collection).map((p) => p.slug);
}

function parsePost(collection: PostCollection, file: string): Post {
  const filePath = path.join(collectionDir(collection), file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<PostFrontmatter>;

  return {
    slug: file.replace(/\.mdx?$/, ""),
    collection,
    title: frontmatter.title ?? "Untitled",
    date: frontmatter.date ?? "1970-01-01",
    tags: frontmatter.tags ?? [],
    summary: frontmatter.summary ?? "",
    content,
  };
}
