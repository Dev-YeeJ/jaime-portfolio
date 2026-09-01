import { featuredProjects, projects } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";

export function FeaturedProjects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Build"
        title="Selected projects"
        description="Systems built end to end — civic records, live event software, and commerce on mobile."
        action={
          <ButtonLink href="/projects" variant="outline" size="sm">
            All {projects.length} projects
          </ButtonLink>
        }
      />

      <Stagger as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <StaggerItem as="li" key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
