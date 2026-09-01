import type { Metadata } from "next";
import { designCategories, designIntro } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { DesignGallery } from "@/components/design-gallery";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Design",
  description: designIntro,
};

const total = designCategories.reduce((sum, category) => sum + category.items.length, 0);

export default async function DesignPage(props: PageProps<"/design">) {
  const { category } = await props.searchParams;
  const initialCategory = typeof category === "string" ? category : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Design"
        title="Design gallery"
        description={designIntro}
        meta={`${total} pieces · ${designCategories.length} categories`}
      />

      <section className="container-page py-12 md:py-16">
        <DesignGallery categories={designCategories} initialCategory={initialCategory} />
      </section>

      <section className="container-page pb-24 md:pb-32">
        <div className="rounded-xl border border-border px-6 py-12 text-center md:px-12 md:py-16">
          <p className="label mb-4">Commissions</p>
          <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Need a mark, a poster, or a whole interface?
          </h2>
          <p className="prose-measure mx-auto mt-4 text-[15px] leading-relaxed text-muted">
            Logo and brand work, campaign sets, print layout, 3D renders, and product UI —
            in Figma, Photoshop, Illustrator, Canva and Blender.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/#contact">Request design work</ButtonLink>
            <ButtonLink href="/experience#services" variant="outline">
              See all services
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
