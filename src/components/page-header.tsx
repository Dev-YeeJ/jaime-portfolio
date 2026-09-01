import type { ReactNode } from "react";
import { Reveal, RuleWipe } from "./motion";

/**
 * The masthead for interior pages. Set in Bricolage rather than Anton — the
 * nameplate treatment stays exclusive to the hero, so it keeps its weight.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Small mono line under the title — counts, dates, status. */
  meta?: string;
  children?: ReactNode;
}) {
  return (
    <header className="pt-32 md:pt-44">
      <div className="container-page">
        <Reveal>
          <p className="label mb-5">{eyebrow}</p>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-balance md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="prose-measure mt-6 text-[15px] leading-relaxed text-muted md:text-lg">
              {description}
            </p>
          ) : null}
          {meta ? (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {meta}
            </p>
          ) : null}
          {children}
        </Reveal>

        <RuleWipe className="mt-12 h-px w-full origin-left bg-border md:mt-16" />
      </div>
    </header>
  );
}
