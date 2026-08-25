import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetail } from "@/components/PostDetail";
import { getPost, getPostSlugs } from "@/lib/posts";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPostSlugs("culture").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost("culture", params.slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default function CulturePostPage({ params }: Params) {
  const post = getPost("culture", params.slug);
  if (!post) notFound();

  return <PostDetail post={post} backHref="/culture" backLabel="All culture notes" />;
}
