import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Post styling is set here rather than with a prose plugin so the type scale,
 * measure and colours stay identical to the rest of the site.
 */
export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-14 scroll-mt-28 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-balance md:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-lg font-semibold tracking-tight md:text-xl"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-5 text-[15.5px] leading-[1.75] text-muted md:text-base" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return <Link href={href} className="link-underline text-accent" {...props} />;
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-accent"
        {...props}
      />
    );
  },
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-5 list-disc space-y-2.5 pl-5 marker:text-accent" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 marker:text-accent" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="pl-1.5 text-[15.5px] leading-[1.75] text-muted md:text-base" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-7 border-l-2 border-accent pl-5 text-[15.5px] leading-relaxed text-foreground italic"
      {...props}
    />
  ),
  hr: () => <hr className="mt-12 border-border" />,
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => <pre className="mt-6" {...props} />,
  table: (props: ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-[14px]" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="border-b border-border bg-background-soft px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-b border-border px-4 py-3 text-muted last:border-0" {...props} />
  ),
};
