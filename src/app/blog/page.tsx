import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PageHeader } from "@/components/page-header";
import { PostRow } from "@/components/post-row";
import { Stagger, StaggerItem } from "@/components/motion";
import { EmptyState } from "@/components/empty-state";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on what Jaime Yee II is building, competing in, and designing — Flutter and Firebase, booking flows, Packet Tracer competitions, and virtual assistant work.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the work"
        description="Notes on what I'm building, competing in, and designing — and what I'm learning along the way."
        meta={posts.length > 0 ? `${posts.length} posts` : undefined}
      />

      <section className="container-page py-12 pb-24 md:py-16 md:pb-32">
        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="The first ones are being written. In the meantime, the projects page has the detail."
            action={
              <ButtonLink href="/projects" variant="outline" size="sm">
                See projects
              </ButtonLink>
            }
          />
        ) : (
          <Stagger className="border-t border-border">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <PostRow post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
    </>
  );
}
