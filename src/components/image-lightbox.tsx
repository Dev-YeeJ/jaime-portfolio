"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion";

/**
 * A gallery tile that opens its own full-size view.
 *
 * The gallery grid is four columns wide on desktop, which leaves each tile
 * around 250px — fine for a logo, useless for a poster carrying twenty lines of
 * type. Without a way to enlarge, text-heavy pieces are shown but not readable,
 * so the lightbox is what makes this content legible rather than decoration.
 *
 * Modelled on `PdfModal` — same backdrop, same escape-to-close, same `EASE` —
 * with two deliberate differences: the keydown listener is mounted only while
 * the dialog is open (a gallery renders dozens of these, and dozens of idle
 * window listeners is a waste), and the dialog carries the ARIA roles that make
 * it announce as a dialog.
 */
export function ImageLightbox({
  src,
  alt,
  title,
  ratio,
  sizes,
}: {
  src: string;
  alt: string;
  /** Caption text, reused as the dialog's accessible name. */
  title: string;
  ratio: string;
  sizes: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Both effects are gated on `isOpen`, so a closed tile costs nothing.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`View “${title}” full size`}
        className="group/zoom relative block w-full"
        style={{ aspectRatio: ratio }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />

        {/*
          The affordance has to be visual, not a cursor change: the custom
          cursor sets `cursor: none !important` while mounted, so a
          `cursor-zoom-in` here would never be seen.
        */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/45 opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          <Maximize2 strokeWidth={2} className="size-5 text-white" />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            /*
              Above the fixed nav (z-70) and its mobile overlay (z-80), below
              the custom cursor (z-90) and the intro curtain (z-100). At the
              Tailwind default z-50 the nav bar paints straight over the
              dialog's header and eats the close button.
            */
            className="fixed inset-0 z-[85] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex max-h-full w-full max-w-4xl flex-col gap-3"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[13px] leading-snug text-white/85">{title}</p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  autoFocus
                  className="-mt-1.5 shrink-0 rounded-full p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/*
                `object-contain` inside a ratio box, rather than a bare ratio
                box, because the gallery mixes 5:6 posters with a 3:2
                tarpaulin: when `max-h` clamps the height the box stops
                matching the file, and contain keeps the piece whole instead of
                cropping it.
              */}
              <div
                className="relative max-h-[80vh] w-full overflow-hidden rounded-xl bg-zinc-950/60"
                style={{ aspectRatio: ratio }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 896px) 896px, 92vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
