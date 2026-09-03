import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { designCategories, designIntro, type DesignCategory } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";

// A teaser of the gallery's shape, not a second copy of it: one tile per
// category, each linking straight to that filter on /design.
const TEASER = ["campaign", "uiux", "logo", "3d"];

/** The category's own first real asset, or nothing if it is still all slots. */
const coverFor = (category: DesignCategory) =>
  category.items.find((item) => item.src)?.src;

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
                {/*
                  A category with real pieces in it fronts itself with the first
                  one, so the teaser stops being four empty frames as the gallery
                  fills up. The tile links to the filtered gallery, so the cover
                  is decorative here — the category name beside it is the label
                  that matters, which is why the alt text is empty.
                */}
                {coverFor(category) ? (
                  <div className="relative" style={{ aspectRatio: "4/5" }}>
                    <Image
                      src={coverFor(category) as string}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder ratio="4/5" className="rounded-none border-0" />
                )}
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
