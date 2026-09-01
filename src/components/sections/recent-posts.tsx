import { getAllPosts } from "@/lib/blog";
import { Stagger, StaggerItem } from "@/components/motion";
import { PostRow } from "@/components/post-row";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";

export function RecentPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section id="blog">
      <SectionHeading
        eyebrow="Writing"
        title="From the blog"
        description="Notes on what I'm building, competing in, and designing — and what I'm learning along the way."
        action={
          <ButtonLink href="/blog" variant="outline" size="sm">
            Read all posts
          </ButtonLink>
        }
      />

      <Stagger className="border-t border-border">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <PostRow post={post} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
