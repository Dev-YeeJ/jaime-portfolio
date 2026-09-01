import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import type { Project } from "@/lib/content";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { StatusBadge, Tag } from "@/components/ui";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  // A link button only exists when there is somewhere real to go.
  const links = project.links.filter((link) => link.href.trim().length > 0);

  return (
    <article
      className={clsx(
        "lift card-surface group flex h-full flex-col overflow-hidden rounded-xl",
        className,
      )}
    >
      <div className="border-b border-border">
        {/*
          Swap for <Image src={…} alt={…} fill sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover" /> — the frame already owns the ratio.
        */}
        <ImagePlaceholder
          label={project.imageLabel}
          ratio={project.imageRatio}
          className="rounded-none border-0"
          captionInside
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="label">{project.lane}</span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-balance">
          {project.title}
        </h3>

        <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          {links.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("/") ? undefined : "_blank"}
                    rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                    className="link-underline inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden strokeWidth={2} className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {project.linkNote ?? "No public link"}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
