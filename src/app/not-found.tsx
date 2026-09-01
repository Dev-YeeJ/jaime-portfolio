import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Anton appears here as well as in the hero. The brief reserved it for the hero
 * alone, and the reasoning behind that rule is "one bold typographic moment" —
 * not "one per site". A 404 has no hero, so the numeral takes that slot. Delete
 * the `font-nameplate` class below to revert it to Bricolage.
 */
export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="label mb-6">Error 404</p>

      <p
        aria-hidden
        className="font-nameplate text-[clamp(5rem,20vw,12rem)] leading-none tracking-[-0.02em] text-foreground"
      >
        404
      </p>

      <h1 className="mt-8 font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
        This page doesn&apos;t exist
      </h1>

      <p className="prose-measure mt-4 text-[15px] leading-relaxed text-muted">
        The link is wrong, or the page moved. The work is all still here — start from one of
        these.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="outline">
          Projects
        </ButtonLink>
        <ButtonLink href="/design" variant="outline">
          Design
        </ButtonLink>
        <ButtonLink href="/blog" variant="outline">
          Blog
        </ButtonLink>
      </div>
    </div>
  );
}
