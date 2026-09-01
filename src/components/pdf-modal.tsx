"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion";

export function PdfModal({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="link-underline inline-flex items-baseline gap-1 text-left text-accent"
      >
        {children}
        <ArrowUpRight
          aria-hidden
          strokeWidth={2.5}
          className="relative top-0.5 size-3.5 shrink-0"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h3 className="font-display font-medium text-white">{title}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden bg-black/50">
                <iframe src={href} className="h-full w-full border-0" title={title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
