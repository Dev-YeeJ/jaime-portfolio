import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/lib/content";
import { AmbientField } from "@/components/ambient-field";
import { HeroPortrait } from "@/components/hero-portrait";
import { LaneRail } from "@/components/lane-rail";
import { ButtonLink } from "@/components/ui";

/** Orders an element within the hero's staggered CSS entrance. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The hero is one composition, not two columns: the cut-out portrait stands in
 * front of the nameplate and the name runs behind it.
 *
 * The overlap has to survive every viewport, so nothing here is a fixed pixel
 * nudge. Three values are tied to the same unit (`vw`) and therefore stay in
 * proportion at any width:
 *
 *   name size   →  13vw      (capped, so it stops growing on very wide screens)
 *   centre gap  →  12vw      (an empty slot reserved *inside* the h1)
 *   figure      →  38vw      (wider than the gap, so it laps the words)
 *
 * The gap is tuned against the *subject*, not the image box. The cut-out carries
 * 15.2% transparent padding on its left and 13.5% on its right (measured from
 * the alpha channel of public/portrait.png), so ~29% of the figure's width is
 * empty air. A slot sized to the box therefore leaves the words floating well
 * clear of the person: at a 21vw gap the box overlapped each word by 26% but the
 * silhouette only by ~9%. The 12vw slot above puts the real, visible overlap at
 * 18-25% per side from 768px to 2560px.
 *
 * If the photo is ever re-exported with different padding, re-measure the alpha
 * bounds and re-tune this one value — nothing else in the composition changes.
 *
 * `top-[26%]` puts the name across the chin and hand rather than the chest,
 * which is where the reference composition sets it.
 *
 * The two words get an equal `flex-1` share and are aimed at the gap. That is
 * load-bearing: centring the row instead would put the slot off-centre, because
 * "JAIME" sets ~2.2x the font size wide and "YEE II" only ~1.9x.
 *
 * Below `md` there is no room to set the name on one line, so it stacks to two
 * and the figure rises from beneath it: only the crown of the head crosses the
 * type, which keeps the name legible on a phone while preserving the layering.
 */
export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <AmbientField />

      <div className="container-page">
        <p className="hero-in label mb-4 text-center md:mb-6" style={step(0)}>
          {hero.eyebrow}
        </p>

        {/*
          The stage. On md+ the figure is the only element in flow, so it sets
          the stage's height, and the nameplate is positioned over it — behind
          it, via z-index. Below md both are in flow and simply stack.
        */}
        <div className="relative flex flex-col">
          <h1
            className={[
              "font-nameplate uppercase leading-[0.86] tracking-[-0.02em] text-foreground",
              "flex flex-col items-center text-center",
              "text-[clamp(3.5rem,18vw,6rem)]",
              // md+: one centred line with a reserved slot for the figure.
              "md:absolute md:inset-x-0 md:top-[26%] md:z-0 md:flex-row md:items-baseline md:justify-center",
              "md:text-[clamp(4.5rem,13vw,13rem)]",
            ].join(" ")}
          >
            <span className="block overflow-hidden pb-[0.08em] md:flex-1 md:text-right">
              <span className="name-line" style={step(1)}>
                {hero.name[0]}
              </span>
            </span>

            {/*
              The reserved slot the figure stands in. Empty and aria-hidden — the
              accessible name stays "Jaime Yee II" with a single space, because
              the two halves are still one heading.
            */}
            <span
              aria-hidden
              className="hidden md:block md:w-[clamp(3rem,12vw,11rem)] md:shrink-0"
            />

            <span className="block overflow-hidden pb-[0.08em] md:flex-1 md:text-left">
              <span className="name-line" style={step(2)}>
                {hero.name[1]}
              </span>
            </span>
          </h1>

          {/*
            The figure. `min-w` keeps it from collapsing to a sliver on a narrow
            tablet; `max-w` stops it ballooning on an ultrawide monitor, at which
            point the capped nameplate has stopped growing too.
          */}
          <div
            className={[
              "figure-in relative z-10 mx-auto",
              /*
                The subject is not centred in its own file: 15.2% padding on the
                left against 13.5% on the right puts them 0.85% of the width right
                of centre. Centring the box therefore left the words lapping the
                silhouette 18% on one side and 20% on the other. Nudging the box
                back by that same 0.85% centres the *person*, which is what the eye
                actually reads, and squares the overlap up.
              */
              "md:-translate-x-[0.85%]",
              "-mt-[8%] w-[72%] max-w-[20rem]",
              "md:mt-0 md:w-[38vw] md:min-w-[14rem] md:max-w-[31rem]",
            ].join(" ")}
            style={step(3)}
          >
            <HeroPortrait />
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-center md:mt-2">
          <p
            className="hero-in font-display text-lg font-medium tracking-tight text-balance text-foreground md:text-xl"
            style={step(4)}
          >
            {hero.role}
          </p>

          <p
            className="hero-in prose-measure mx-auto mt-5 text-[15px] leading-relaxed text-muted md:text-base"
            style={step(5)}
          >
            {hero.subhead}
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap items-center justify-center gap-3"
            style={step(6)}
          >
            <ButtonLink href="/projects">See my work</ButtonLink>
            <ButtonLink href="/experience#services" variant="outline">
              Hire me
            </ButtonLink>
            <Link
              href="/#contact"
              className="link-underline group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              Get in touch
              <ArrowRight
                aria-hidden
                strokeWidth={1.75}
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="hero-in mt-16 md:mt-24" style={step(7)}>
          <LaneRail />
        </div>
      </div>
    </section>
  );
}
