import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import clsx from "clsx";
import type { LegalBlock, LegalDocument } from "@/lib/legal";
import { legalDocuments } from "@/lib/legal";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { LegalToc } from "@/components/legal-toc";
import { Reveal } from "@/components/motion";

/**
 * Renders a policy from `src/lib/legal.ts`.
 *
 * The documents are stored as plain data like the rest of the site's content,
 * which leaves one gap: legal text needs links inside its sentences. Rather
 * than move the copy into JSX, blocks accept `[label](href)` and this file
 * resolves it — about fifteen lines, and the copy stays where copy lives.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const CODE = /`([^`]+)`/g;

/** Stable anchor per heading, so `#cookies-and-browser-storage` can be linked to. */
const slugify = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(...code(text.slice(cursor, start), nodes.length));

    // A mailto: or an on-site path stays in the tab; anything else leaves it.
    const external = /^https?:/.test(href);
    nodes.push(
      <a
        key={`link-${start}`}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="link-underline text-accent"
      >
        {label}
      </a>,
    );
    cursor = start + full.length;
  }

  if (cursor < text.length) nodes.push(...code(text.slice(cursor), nodes.length));
  return nodes;
}

/** Backticks mark the literal storage keys and headers named in the policies. */
function code(text: string, offset: number): ReactNode[] {
  const parts = text.split(CODE);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={`code-${offset}-${index}`}
        className="rounded bg-accent-tint px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
      >
        {part}
      </code>
    ) : (
      <Fragment key={`text-${offset}-${index}`}>{part}</Fragment>
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p className="text-[15px] leading-relaxed text-muted">{inline(block)}</p>;
  }

  return (
    <ul className="space-y-2.5">
      {block.list.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-[15px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-accent/50"
        >
          {inline(item)}
        </li>
      ))}
    </ul>
  );
}

/** Links across the three policies, with the current one marked, not linked. */
function DocumentSwitcher({ current }: { current: string }) {
  return (
    <nav aria-label="Policies" className="mt-8 flex flex-wrap items-center gap-2">
      {legalDocuments.map((doc) => {
        const isCurrent = doc.slug === current;
        return isCurrent ? (
          <span
            key={doc.slug}
            aria-current="page"
            className="rounded-full border border-accent bg-accent-tint px-3.5 py-1.5 text-[12.5px] font-medium text-accent"
          >
            {doc.eyebrow}
          </span>
        ) : (
          <Link
            key={doc.slug}
            href={`/${doc.slug}`}
            className="rounded-full border border-border px-3.5 py-1.5 text-[12.5px] text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
          >
            {doc.eyebrow}
          </Link>
        );
      })}
    </nav>
  );
}

export function LegalPage({ document }: { document: LegalDocument }) {
  const sections = document.sections.map((section) => ({
    ...section,
    id: slugify(section.heading),
  }));

  const contents = sections.map(({ id, heading }) => ({ id, heading }));

  return (
    <>
      <PageHeader
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
        meta={`Last updated ${document.updated} · Applies to ${site.url.replace(/^https?:\/\//, "")}`}
      >
        <DocumentSwitcher current={document.slug} />
      </PageHeader>

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          {/*
            The contents rail is sticky from `lg` up, where there is room beside
            the measure. Below that it collapses into a disclosure rather than
            eating the top of every phone screen — closed, it costs one line.
          */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="label mb-4 hidden lg:block">On this page</p>
            <div className="hidden lg:block">
              <LegalToc sections={contents} />
            </div>

            <details className="group rounded-xl border border-border px-4 py-3 lg:hidden">
              <summary className="label cursor-pointer list-none marker:content-none">
                On this page ({contents.length})
              </summary>
              <ul className="mt-4 space-y-2.5 border-l border-border">
                {contents.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block border-l border-transparent pl-4 text-[13px] leading-snug text-muted"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </aside>

          {/*
            Policy text is read in sequence rather than scanned, so it keeps the
            prose measure even though the grid could give it more room.
          */}
          <div className="prose-measure space-y-14">
            {sections.map((section, index) => (
              <Reveal key={section.id}>
                {/* Clears the fixed nav when an anchor link jumps here. */}
                <section id={section.id} className="scroll-mt-28 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden className="font-mono text-[11px] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                      <a href={`#${section.id}`} className="hover:text-accent">
                        {section.heading}
                      </a>
                    </h2>
                  </div>

                  <div className="space-y-4 pl-[1.85rem]">
                    {section.blocks.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <aside
                className={clsx(
                  "card-surface flex flex-col gap-4 rounded-xl p-6 sm:flex-row sm:items-center sm:justify-between",
                )}
              >
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-tight">
                    Questions about this document?
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                    Write to me directly — a real person reads it, and I answer.
                  </p>
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-accent"
                >
                  <Mail aria-hidden strokeWidth={1.75} className="size-4" />
                  {site.email}
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
