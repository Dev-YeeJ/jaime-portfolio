import type { Metadata } from "next";
import { Download } from "lucide-react";
import {
  achievements,
  certifications,
  education,
  experience,
  services,
  skillGroups,
} from "@/lib/content";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import Link from "next/link";
import { buttonClass, Section, SectionHeading, Tag } from "@/components/ui";
import { PdfModal } from "@/components/pdf-modal";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Resume-style experience, services and skills for Jaime Yee II — virtual assistance, freelance design, JITS and SK leadership roles, and a full technical stack across web, mobile and design.",
};

const serviceGroups = [
  {
    id: "va",
    title: "Virtual assistant services",
    blurb: "The day-to-day work that keeps a business or organisation running.",
    items: services.filter((service) => service.lane === "support"),
  },
  {
    id: "dev",
    title: "Development & design",
    blurb: "Products designed and built, from the first wireframe to the deployed thing.",
    items: services.filter((service) => service.lane !== "support"),
  },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="The full record — roles, services and skills"
        description="This page is the resume. The PDF is the same thing in a file, for anyone who needs one to attach."
      >
        <div className="mt-8">
          {/* [ ] Add public/resume.pdf. The link is already wired to it.
              A plain anchor, not next/link — the target is a static file, not a route. */}
          <a
            href={site.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass()}
          >
            <Download aria-hidden strokeWidth={1.75} className="size-3.5" />
            Download PDF resume
          </a>
        </div>
      </PageHeader>

      {/* ------------------------------------------------------------------ */}
      <Section id="roles">
        <SectionHeading
          eyebrow="Roles"
          title="Where I've done the work"
          description="Freelance engagements alongside two elected and appointed roles built on communication and follow-through."
        />

        <Stagger as="ul" className="border-t border-border">
          {experience.map((role) => (
            <StaggerItem
              as="li"
              key={role.title + role.org}
              className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <p className="label mb-2">{role.lane}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {role.period}
                </p>
              </div>

              <div className="md:col-span-9">
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {role.title}
                </h3>
                <p className="mt-1 text-[14.5px] text-muted">{role.org}</p>

                <ul className="prose-measure mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-[14.5px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.6em] size-1.5 rounded-full bg-accent/50"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="services" tinted>
        <SectionHeading
          eyebrow="Services"
          title="What I do"
          description="Hire me for one lane or all three — the overlap is the point."
        />

        <div className="space-y-16">
          {serviceGroups.map((group) => (
            <div key={group.id}>
              <Reveal>
                <div className="mb-8 border-b border-border pb-5">
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] text-muted">{group.blurb}</p>
                </div>
              </Reveal>

              <Stagger as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((service) => (
                  <StaggerItem as="li" key={service.title} className="h-full">
                    <div className="lift card-surface h-full rounded-xl p-6">
                      <p className="label mb-4">{service.lane}</p>
                      <h4 className="font-display text-[17px] font-semibold tracking-tight">
                        {service.title}
                      </h4>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted">
                        {service.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="skills">
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit"
          description="What I reach for, grouped by the lane it belongs to."
        />

        <Stagger as="ul" className="border-t border-border">
          {skillGroups.map((group) => (
            <StaggerItem
              as="li"
              key={group.group}
              className="grid gap-4 border-b border-border py-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="font-display text-[15px] font-semibold tracking-tight md:col-span-3">
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-1.5 md:col-span-9">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="education">
        <SectionHeading
          eyebrow="Education & training"
          title="Study, honours and certification"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full rounded-xl p-6 md:p-8">
              <p className="label mb-5">Degree</p>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {education.degree}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-muted">{education.school}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                {education.period}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-[14px] text-muted">
                {education.note}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-surface h-full rounded-xl p-6 md:p-8">
              <p className="label mb-5">Certifications & training</p>
              <ul className="space-y-4">
                {certifications.map((certification) => (
                  <li key={certification.title}>
                    <h3 className="font-display text-[17px] font-semibold tracking-tight">
                      {certification.href ? (
                        <PdfModal title={certification.title} href={certification.href}>
                          {certification.title}
                        </PdfModal>
                      ) : (
                        certification.title
                      )}
                    </h3>
                    <p className="mt-1 text-[14px] text-muted">
                      {certification.org} — {certification.detail}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-border pt-4 text-[13.5px] leading-relaxed text-muted">
                Plus {achievements.length} competition results and honours, listed on the{" "}
                <Link href="/#achievements" className="link-underline text-accent">
                  homepage
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
