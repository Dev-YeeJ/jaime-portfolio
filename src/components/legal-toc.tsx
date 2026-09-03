"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * The contents rail beside a policy, with the current section marked.
 *
 * Long documents are the one place on this site where a reader genuinely needs
 * to know where they are — someone lands on `#cookies` from a search result and
 * needs the rest of the document to still make sense around it.
 *
 * `rootMargin` pins the detection line near the top of the viewport rather than
 * its middle: a heading counts as current once it has reached the top, which is
 * where a reader's eye actually is, not once it has scrolled halfway up.
 */
export function LegalToc({
  sections,
}: {
  sections: { id: string; heading: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <ul className="space-y-1 border-l border-border">
      {sections.map((section, index) => {
        const current = section.id === active;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={current ? "true" : undefined}
              className={clsx(
                "-ml-px flex gap-2.5 border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200",
                current
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:border-border hover:text-foreground",
              )}
            >
              <span
                aria-hidden
                className={clsx(
                  "font-mono text-[10px] leading-[1.5]",
                  current ? "text-accent" : "text-muted/60",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
