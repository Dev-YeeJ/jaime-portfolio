import Image from "next/image";
import { UserRound } from "lucide-react";
import { hero } from "@/lib/content";

/**
 * The hero cut-out.
 *
 * Two things make a background-removed PNG sit convincingly *in front of* type
 * rather than float on top of it:
 *
 * 1. `drop-shadow` rather than `box-shadow`. A drop-shadow filter follows the
 *    image's alpha channel, so the shadow traces the shoulders and hair instead
 *    of drawing a rectangle around a transparent file. This is the whole trick.
 * 2. A soft contact shadow at the feet, so the figure is standing on the page
 *    instead of hovering above it.
 *
 * Until the real PNG exists, a silhouette stand-in occupies the exact same
 * footprint — same ratio, same shadow, same grounding — so the overlap can be
 * judged now and swapping the file in shifts nothing.
 */
const FADE = "linear-gradient(to bottom, #000 86%, rgba(0,0,0,0.4) 95%, transparent 100%)";

export function HeroPortrait() {
  const ratio = `${hero.portraitWidth}/${hero.portraitHeight}`;

  return (
    /*
      The cut-out is cropped flat across the torso, which left the figure looking
      guillotined in mid-air above the strapline. Fading the last fifth of it out
      turns that hard crop into a deliberate dissolve, so the figure reads as
      emerging from the page rather than as a photo with its bottom sliced off.

      The mask sits on the wrapper, after `filter` in the painting order, so the
      drop-shadow fades with the figure instead of surviving it as a floating
      smudge. A contact shadow would fight this — a figure that dissolves has no
      feet to ground — so there is deliberately none.
    */
    <div
      className="relative"
      style={{
        WebkitMaskImage: FADE,
        maskImage: FADE,
      }}
    >

      {hero.portraitSrc ? (
        <Image
          src={hero.portraitSrc}
          alt={hero.portraitAlt}
          width={hero.portraitWidth}
          height={hero.portraitHeight}
          /*
            The hero image is the LCP element, so it must not be lazy-loaded.
            Next.js 16 deprecated `priority` in favour of being explicit: the
            docs recommend `loading="eager"` + `fetchPriority="high"` over the
            `preload` prop for exactly this case.
          */
          loading="eager"
          fetchPriority="high"
          /*
            Mirrors the rendered width exactly: 72vw below md, then 38vw until
            the 31rem cap is reached at 1306px, and a flat 496px above that.
          */
          sizes="(min-width: 1306px) 496px, (min-width: 768px) 38vw, 72vw"
          className="h-auto w-full select-none object-contain [filter:var(--figure-shadow)]"
        />
      ) : (
        <PortraitStandIn ratio={ratio} />
      )}
    </div>
  );
}

/**
 * Silhouette stand-in. Shaped like a bust — not a rectangle — because a
 * rectangular placeholder would occlude the nameplate in a way the real cut-out
 * never will, and the point of the composition is the ragged overlap.
 */
function PortraitStandIn({ ratio }: { ratio: string }) {
  return (
    <div
      className="relative w-full [filter:var(--figure-shadow)]"
      style={{ aspectRatio: ratio }}
    >
      {/*
        Head and shoulders are drawn as two untinted, unbordered shapes that
        overlap. No borders: an outline would stay visible where the head crosses
        the shoulders and give away the seam, and the real cut-out has no outline
        either. The drop-shadow on the parent traces their combined alpha, so the
        two shapes throw one silhouette's shadow.
      */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] rounded-t-[46%] bg-accent-tint" />
      <div className="absolute bottom-[52%] left-1/2 h-[42%] w-[46%] -translate-x-1/2 rounded-[46%] bg-accent-tint" />

      <div aria-hidden className="dot-field absolute inset-0 opacity-60" />

      <div className="absolute inset-x-0 bottom-[14%] flex flex-col items-center gap-2 px-4 text-center">
        <UserRound aria-hidden strokeWidth={1.25} className="size-6 text-accent/40" />
        <span className="text-[11px] leading-snug text-muted">{hero.portraitLabel}</span>
      </div>
    </div>
  );
}
