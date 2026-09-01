import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import dart from "highlight.js/lib/languages/dart";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";
import { mdxComponents } from "@/components/mdx";
import { RuleWipe } from "@/components/motion";
import { ButtonLink } from "@/components/ui";

// rehype-highlight's `languages` option replaces the default set rather than
// extending it, and Dart is not in lowlight's `common` bundle — so Flutter code
// blocks would render untokenised without this.
const languages = { ...common, dart };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}`,
      authors: [site.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  const post = posts[index];

  if (!post) notFound();

  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;

  return (
    <article className="pb-24 md:pb-32">
      <header className="pt-32 md:pt-40">
        <div className="container-page">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft
              aria-hidden
              strokeWidth={1.75}
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            All posts
          </Link>

          <div className="mt-10 max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="label">{post.lane}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {formatDate(post.date)}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-balance md:text-5xl">
              {post.title}
            </h1>

            <p className="prose-measure mt-5 text-[16px] leading-relaxed text-muted md:text-lg">
              {post.description}
            </p>
          </div>

          <RuleWipe className="mt-12 h-px w-full origin-left bg-border" />
        </div>
      </header>

      <div className="container-page">
        <div className="mdx-body prose-measure mt-10 md:mt-14">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeHighlight, { languages }]],
              },
            }}
          />
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="lift card-surface group rounded-xl p-5"
              >
                <p className="label mb-2">Previous</p>
                <p className="font-display text-[15px] font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  {older.title}
                </p>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="lift card-surface group rounded-xl p-5 sm:text-right"
              >
                <p className="label mb-2">Next</p>
                <p className="font-display text-[15px] font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  {newer.title}
                </p>
              </Link>
            ) : null}
          </div>

          <div className="mt-12 rounded-xl border border-border px-6 py-10 text-center md:px-10">
            <p className="label mb-3">Hiring, or need a hand?</p>
            <p className="mx-auto max-w-md font-display text-xl font-semibold tracking-tight text-balance md:text-2xl">
              I&apos;m open to dev roles, design commissions, and VA work.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/#contact">
                Get in touch
                <ArrowRight aria-hidden strokeWidth={1.75} className="size-3.5" />
              </ButtonLink>
              <ButtonLink href="/experience" variant="outline">
                See experience
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
