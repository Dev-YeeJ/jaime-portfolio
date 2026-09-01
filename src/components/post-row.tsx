import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

/**
 * Posts are set as rows rather than cards. A blog list is a sequence, and rows
 * read as one — cards would turn five posts into a grid of competing objects.
 */
export function PostRow({ post, className }: { post: PostMeta; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "group relative block border-b border-border py-7 transition-colors",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-6">
        <div className="flex items-center gap-3 md:col-span-3 md:flex-col md:items-start md:gap-2">
          <span className="label">{post.lane}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {formatDate(post.date)}
          </span>
        </div>

        <div className="md:col-span-8">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-balance transition-colors group-hover:text-accent md:text-2xl">
            {post.title}
          </h3>
          <p className="prose-measure mt-2 text-[14.5px] leading-relaxed text-muted">
            {post.description}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {post.readingTime} min read
          </p>
        </div>

        <div className="hidden justify-end md:col-span-1 md:flex">
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.75}
            className="size-5 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </Link>
  );
}
