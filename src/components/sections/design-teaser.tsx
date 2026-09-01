import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { designCategories, designIntro } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";

// A teaser of the gallery's shape, not a second copy of it: one tile per
// category, each linking straight to that filter on /design.
const TEASER = ["campaign", "uiux", "logo", "3d"];

export function DesignTeaser() {
  const categories = TEASER.map((id) => designCategories.find((c) => c.id === id)).filter(
    (c): c is (typeof designCategories)[number] => Boolean(c),
  );

  return (
    <Section id="design">
      <SectionHeading
        eyebrow="Design"
        title="Design gallery"
        description={designIntro}
        action={
          <ButtonLink href="/design" variant="outline" size="sm">
            Open the gallery
          </ButtonLink>
        }
      />

      <Stagger as="ul" className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <StaggerItem as="li" key={category.id}>
            <Link href={`/design?category=${category.id}`} className="group block">
              <div className="lift overflow-hidden rounded-xl border border-border">
                <ImagePlaceholder ratio="4/5" className="rounded-none border-0" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {category.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {category.items.length} pieces
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={2}
                  className="mt-0.5 size-3.5 shrink-0 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
