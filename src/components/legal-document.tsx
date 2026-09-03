import { Fragment, type ReactNode } from "react";
import type { LegalBlock, LegalDocument } from "@/lib/legal";
import { PageHeader } from "@/components/page-header";
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

/** Backticks mark the literal storage keys named in the privacy policy. */
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

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHeader
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
        meta={`Last updated ${document.updated}`}
      />

      <div className="container-page py-16 md:py-20">
        {/*
          A single measured column. Policy text is read in sequence rather than
          scanned, so it gets the prose measure and no multi-column layout.
        */}
        <div className="prose-measure space-y-12">
          {document.sections.map((section) => (
            <Reveal key={section.heading}>
              <section className="space-y-4">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {section.heading}
                </h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
