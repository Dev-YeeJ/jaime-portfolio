import matter from "gray-matter";
import type { LaneId } from "./content";
import { rawPosts } from "./blog-data.generated";

/*
  Posts come from a generated module, not from node:fs.

  The Worker serving this site has no filesystem at request time. Reading
  content/blog with fs worked in `next dev` and during `next build`, then
  silently produced an empty /blog, a sitemap with no post URLs, and a 404 on
  every article once deployed — while still answering 200. Bundling the posts at
  build time (scripts/generate-blog-data.mjs) keeps rendering identical whether a
  request is served from the prerender cache or falls through to the server.
*/

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  lane: LaneId;
  tags: string[];
  readingTime: number;
};

export type Post = PostMeta & { content: string };

function readingTimeOf(markdown: string) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parsePost({ slug, raw }: { slug: string; raw: string }): Post {
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    lane: (data.lane ?? "build") as LaneId,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingTime: readingTimeOf(content),
    content,
  };
}

/** Newest first. */
export function getAllPosts(): Post[] {
  return rawPosts.map(parsePost).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
