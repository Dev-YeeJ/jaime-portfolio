import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { ProjectGrid } from "@/components/project-grid";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack, mobile and desktop projects by Jaime Yee II — a barangay information system, an automated event photobooth, a Flutter e-commerce app, and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Build"
        title="Things I've built, and what they had to handle"
        description="Five projects across web, mobile and desktop. Each one is listed with what it does, what it's made of, and whether there's something public to look at — no link where there isn't one."
        meta={`${projects.length} projects · filterable by technology`}
      />

      <section className="container-page py-12 md:py-16">
        <ProjectGrid projects={projects} />
      </section>

      <section className="container-page pb-24 md:pb-32">
        <div className="rounded-xl border border-border px-6 py-12 text-center md:px-12 md:py-16">
          <p className="label mb-4">Next</p>
          <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Got something that needs building?
          </h2>
          <p className="prose-measure mx-auto mt-4 text-[15px] leading-relaxed text-muted">
            I take on web and mobile work, and I can pick up the design and the day-to-day
            running of it too.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/#contact">Start a conversation</ButtonLink>
            <ButtonLink href="/experience" variant="outline">
              See experience
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
