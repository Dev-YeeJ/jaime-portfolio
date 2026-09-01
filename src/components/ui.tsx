import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import { Reveal, RuleWipe } from "./motion";

/* -------------------------------------------------------------------------- */
/*  Shape language: actions are pills, containers are rounded-xl.              */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:pointer-events-none";

const buttonVariants: Record<ButtonVariant, string> = {
  // The one place a solid accent fill is expected.
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-deep hover:-translate-y-0.5 hover:shadow-[var(--lift-shadow)]",
  outline:
    "border border-border text-foreground hover:border-accent hover:text-accent hover:-translate-y-0.5",
  ghost: "text-muted hover:text-accent",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return clsx(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

/* -------------------------------------------------------------------------- */

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isLive = status === "Shipped";

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
        isLive
          ? "bg-accent-tint text-accent-deep dark:text-accent"
          : "border border-border text-muted",
      )}
    >
      <span
        aria-hidden
        className={clsx("size-1.5 rounded-full", isLive ? "bg-accent" : "bg-muted")}
      />
      {status}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={clsx("label", className)}>{children}</p>;
}

/* -------------------------------------------------------------------------- */

export function Section({
  id,
  className,
  children,
  tinted = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Use sparingly — at most one tinted section per page. */
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-28 py-20 md:py-32",
        tinted && "bg-background-soft",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mb-12 md:mb-16", className)}>
      <RuleWipe className="mb-8 h-px w-full origin-left bg-border" />
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-balance md:text-[2.75rem]">
              {title}
            </h2>
            {description ? (
              <p className="prose-measure mt-4 text-[15px] leading-relaxed text-muted md:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </Reveal>
    </div>
  );
}

/** A card container. Containers are rounded-xl — never pills. */
export function Card({
  className,
  children,
  ...props
}: ComponentProps<"div"> & { children: ReactNode }) {
  return (
    <div
      className={clsx("card-surface rounded-xl overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}
