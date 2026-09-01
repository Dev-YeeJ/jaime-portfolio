import clsx from "clsx";
import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  /**
   * What belongs in this slot. Written so the placeholder documents its own
   * replacement, e.g. "[ ] Petsy logo — white version".
   */
  label?: string;
  /** CSS aspect-ratio, e.g. "16/10", "4/5", "1/1". */
  ratio?: string;
  className?: string;
  /** Drops the icon and the ratio chip — for avatar-sized slots. */
  compact?: boolean;
  /** Renders the caption inside the frame instead of below it. */
  captionInside?: boolean;
};

/**
 * A deliberate empty frame, not a broken image.
 *
 * Swapping in the real asset is a one-line change: replace this component with
 * `<Image src="…" alt="…" fill sizes="…" className="object-cover" />`. The
 * wrapper below is already `relative` and already owns the aspect ratio, so the
 * surrounding layout does not move.
 */
export function ImagePlaceholder({
  label,
  ratio = "16/10",
  className,
  compact = false,
  captionInside = false,
}: ImagePlaceholderProps) {
  const frame = (
    <div
      className={clsx(
        "relative isolate flex items-center justify-center overflow-hidden bg-accent-tint",
        compact ? "rounded-full" : "rounded-xl border border-border",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {/* Faint schematic grid so an empty slot still feels designed. */}
      <div aria-hidden className="dot-field absolute inset-0 opacity-70" />

      <ImageIcon
        aria-hidden
        strokeWidth={1.25}
        className={clsx(
          "relative text-accent/35",
          compact ? "size-4" : "size-7 md:size-8",
        )}
      />

      {/* The ratio chip and an inside-caption share the bottom edge, so only one
          of them is ever shown. */}
      {!compact && !captionInside ? (
        <span className="absolute bottom-2.5 right-3 font-mono text-[10px] tracking-[0.14em] text-accent/40">
          {ratio.replace("/", ":")}
        </span>
      ) : null}

      {captionInside && label ? (
        <span className="absolute inset-x-3 bottom-3 line-clamp-2 text-center text-[11px] leading-snug text-muted">
          {label}
        </span>
      ) : null}
    </div>
  );

  if (!label || captionInside || compact) return frame;

  return (
    <figure className="m-0">
      {frame}
      <figcaption className="mt-2.5 text-[12px] leading-snug text-muted">{label}</figcaption>
    </figure>
  );
}
