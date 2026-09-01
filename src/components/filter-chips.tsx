"use client";

import clsx from "clsx";
import { X } from "lucide-react";

export type Chip = { value: string; label: string; count?: number };

/**
 * One filter control, shared by the project grid and the design gallery, so the
 * two pages behave identically. Chips are pills, like every other action.
 */
export function FilterChips({
  chips,
  selected,
  onToggle,
  onClear,
  label,
  multi = false,
}: {
  chips: Chip[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
  label: string;
  multi?: boolean;
}) {
  const allActive = selected.length === 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="sr-only" id="filter-label">
        {label}
      </span>

      <button
        type="button"
        onClick={onClear}
        aria-pressed={allActive}
        className={clsx(
          "h-8 rounded-full border px-3.5 text-[12.5px] transition-colors duration-300",
          allActive
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border text-muted hover:border-accent hover:text-accent",
        )}
      >
        All
      </button>

      {chips.map((chip) => {
        const active = selected.includes(chip.value);

        return (
          <button
            key={chip.value}
            type="button"
            onClick={() => onToggle(chip.value)}
            aria-pressed={active}
            className={clsx(
              "inline-flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] transition-colors duration-300",
              active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-accent hover:text-accent",
            )}
          >
            {chip.label}
            {typeof chip.count === "number" ? (
              <span className={clsx("font-mono text-[10px]", active ? "opacity-70" : "opacity-60")}>
                {chip.count}
              </span>
            ) : null}
            {multi && active ? <X aria-hidden strokeWidth={2.5} className="size-3" /> : null}
          </button>
        );
      })}
    </div>
  );
}
