"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { DesignCategory } from "@/lib/content";
import { ImagePlaceholder } from "./image-placeholder";
import { ImageLightbox } from "./image-lightbox";
import { FilterChips } from "./filter-chips";
import { EmptyState } from "./empty-state";
import { EASE } from "./motion";

/**
 * `initialCategory` is resolved from the query string on the server rather than
 * with `useSearchParams`, which would defer this whole grid to the client and
 * ship an empty gallery to crawlers. Deep links like /design?category=petsy land
 * already filtered, in the first paint.
 */
export function DesignGallery({
  categories,
  initialCategory,
}: {
  categories: DesignCategory[];
  initialCategory?: string;
}) {
  const initial = categories.some((c) => c.id === initialCategory)
    ? [initialCategory as string]
    : [];

  const [selected, setSelected] = useState<string[]>(initial);
  const reduce = useReducedMotion();

  const chips = categories.map((category) => ({
    value: category.id,
    label: category.name,
    count: category.items.length,
  }));

  const items = useMemo(() => {
    const active =
      selected.length === 0
        ? categories
        : categories.filter((category) => selected.includes(category.id));

    return active.flatMap((category) =>
      category.items.map((item, index) => ({
        ...item,
        category: category.name,
        key: `${category.id}-${index}`,
      })),
    );
  }, [categories, selected]);

  // Single-select: picking a category replaces the current one.
  const toggle = (value: string) =>
    setSelected((current) => (current.includes(value) ? [] : [value]));

  return (
    <div>
      <div className="flex flex-col gap-4">
        <FilterChips
          label="Filter the gallery by category"
          chips={chips}
          selected={selected}
          onToggle={toggle}
          onClear={() => setSelected([])}
        />
        <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
          {selected.length > 0
            ? ` · ${categories.find((c) => c.id === selected[0])?.name ?? ""}`
            : " · all categories"}
        </p>
      </div>

      <div className="mt-10">
        {items.length === 0 ? (
          <EmptyState
            title="Nothing in this category yet"
            description="This category is set up and waiting on its pieces. Try another one in the meantime."
          />
        ) : (
          <motion.ul
            layout={!reduce}
            className="grid grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.li
                  key={item.key}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="lift overflow-hidden rounded-xl border border-border">
                    {item.src ? (
                      <ImageLightbox
                        src={item.src}
                        alt={item.alt ?? item.label}
                        title={item.label}
                        ratio={item.ratio}
                        /* Mirrors the grid below: 4 up, then 3, then 2. */
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                    ) : (
                      <ImagePlaceholder ratio={item.ratio} className="rounded-none border-0" />
                    )}
                  </div>
                  <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {item.category}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-muted">{item.label}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
