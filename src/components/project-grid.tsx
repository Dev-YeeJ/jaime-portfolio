"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";
import { ProjectCard } from "./project-card";
import { FilterChips } from "./filter-chips";
import { EmptyState } from "./empty-state";
import { Button } from "./ui";
import { EASE } from "./motion";

/**
 * Tag filtering is multi-select and combines with AND: picking "Flutter" and
 * "Firebase" shows what uses both. That is how someone actually screens a
 * portfolio ("has this person shipped Laravel *and* MySQL?"), and it means the
 * empty state is a real state rather than decoration.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const reduce = useReducedMotion();

  const chips = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((project) =>
      project.stack.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
    );

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: value, count }));
  }, [projects]);

  const visible = useMemo(
    () =>
      selected.length === 0
        ? projects
        : projects.filter((project) => selected.every((tag) => project.stack.includes(tag))),
    [projects, selected],
  );

  const toggle = (value: string) =>
    setSelected((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <FilterChips
          label="Filter projects by technology"
          chips={chips}
          selected={selected}
          multi
          onToggle={toggle}
          onClear={() => setSelected([])}
        />
        <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {visible.length} of {projects.length} projects
          {selected.length > 0 ? ` · ${selected.join(" + ")}` : ""}
        </p>
      </div>

      <div className="mt-10">
        {visible.length === 0 ? (
          <EmptyState
            title="No project uses all of those"
            description="These filters combine, so a project has to match every tag you have picked. Drop one and try again."
            action={
              <Button variant="outline" size="sm" onClick={() => setSelected([])}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.li
                  key={project.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
