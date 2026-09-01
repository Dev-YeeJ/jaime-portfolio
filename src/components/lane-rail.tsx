import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { lanes } from "@/lib/content";

/**
 * The lane rail — the site's organising device.
 *
 * A generalist site fails when the three things blur into one vague claim, so
 * the three lanes are named once, up front, and a visitor picks their own:
 * a recruiter goes to Build, a client goes to Design or Support. The same three
 * ids then tag every project, service and post.
 *
 * The hairline that fills from the left on hover is the same gesture used by
 * every link underline and section rule on the site.
 */
export function LaneRail({ className }: { className?: string }) {
  return (
    <div className={clsx("border-t border-border", className)}>
      <ul className="grid grid-cols-1 sm:grid-cols-3">
        {lanes.map((lane, index) => (
          <li
            key={lane.id}
            className={clsx(
              "border-b border-border sm:border-b-0",
              index > 0 && "sm:border-l sm:border-border",
            )}
          >
            <Link
              href={lane.href}
              className={clsx(
                "group relative block h-full py-6 pr-6 transition-colors duration-300",
                index > 0 && "sm:pl-6",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />

              <span className="flex items-center gap-2">
                <span className="label">{lane.label}</span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={2}
                  className="size-3.5 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </span>

              <span className="mt-2.5 block font-display text-[17px] font-semibold tracking-tight text-foreground">
                {lane.title}
              </span>

              <span className="mt-1.5 block max-w-[38ch] text-[13.5px] leading-relaxed text-muted">
                {lane.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
