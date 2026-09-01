import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

/**
 * The empty state is built from the same parts as the placeholder frames — a
 * tinted panel, a schematic grid, one quiet icon — so a filtered-to-nothing grid
 * still looks like part of the site rather than a dead end.
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-xl border border-border bg-accent-tint px-6 py-16 text-center md:py-24">
      <div aria-hidden className="dot-field absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-sm">
        <SearchX aria-hidden strokeWidth={1.25} className="mx-auto size-8 text-accent/40" />
        <p className="mt-5 font-display text-lg font-semibold tracking-tight">{title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{description}</p>
        {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
      </div>
    </div>
  );
}
