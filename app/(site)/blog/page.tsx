import type { Metadata } from "next";

import { listPublishedBlogPosts } from "@/lib/dal/cms";

export const metadata: Metadata = {
  title: "Blog | SVGOI",
  description: "Latest news, research insights, and stories from SVGOI campus.",
};

export default async function BlogPage() {
  const posts = await listPublishedBlogPosts();

  return (
    <div className="space-y-6 py-8">
      <h1 className="text-4xl">Blog</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="card p-6">
            <h2 className="text-2xl">{post.title}</h2>
            <p className="mt-2 text-[var(--ink-700)]">{post.excerpt}</p>
            <p className="mt-3 line-clamp-4 text-sm text-[var(--ink-700)]">{post.content}</p>
          </article>
        ))}
        {posts.length === 0 ? <p>No published blog posts.</p> : null}
      </div>
    </div>
  );
}
