"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { navLinks, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { EASE } from "./motion";

/** Ids of the on-page sections that the anchor links in the nav point at. */
const HOME_SECTIONS = ["about", "contact"];

/** Subscribes to the page scroll without pushing state from inside an effect. */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 16,
    () => false,
  );
}

function useActiveSection(isHome: boolean) {
  const [observed, setObserved] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = HOME_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setObserved(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Derived rather than reset in an effect: off the homepage there is no active
  // section, whatever the observer last saw.
  return isHome ? observed : null;
}

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled();
  const activeSection = useActiveSection(isHome);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The overlay remembers which route it was opened on, so navigating anywhere —
  // including via browser back — closes it as a derivation rather than an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenedOn(next ? pathname : null),
    [pathname],
  );

  // While the overlay is open: lock the page, trap Escape, and return focus.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Captured now: by cleanup time the ref may point somewhere else.
    const trigger = triggerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, setOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        return isHome && activeSection === href.slice(2);
      }
      if (href === "/") {
        return isHome && activeSection === null;
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [activeSection, isHome, pathname],
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-4 z-[70] md:top-6">
        <div className="container-page">
          <nav
            aria-label="Main"
            className={clsx(
              "pointer-events-auto mx-auto flex items-center gap-2 rounded-full border px-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:gap-1 md:px-3",
              scrolled
                ? "border-border bg-background/75 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                : "border-transparent bg-background/45 backdrop-blur-sm",
            )}
          >
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="group ml-1 mr-1.5 flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-2"
            >
              <span className="grid size-8 place-items-center rounded-full bg-accent font-display text-[13px] font-bold leading-none tracking-tight text-accent-foreground transition-colors duration-300 group-hover:bg-accent-deep">
                {site.initials}
              </span>
              <span className="hidden font-display text-sm font-semibold tracking-tight lg:block">
                Jaime Yee
              </span>
            </Link>

            <ul className="hidden items-center md:flex">
              {navLinks
                .filter((link) => link.href !== "/")
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={clsx(
                        "relative block rounded-full px-3 py-2 text-[13px] transition-colors duration-300 hover:text-accent",
                        isActive(link.href) ? "text-accent" : "text-muted",
                      )}
                    >
                      {link.label}
                      {isActive(link.href) ? (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
            </ul>

            <div className="ml-auto flex items-center gap-1.5">
              <ThemeToggle />

              {/* [ ] Point this at the real file by dropping resume.pdf into /public. */}
              <a
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-[13px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-deep"
              >
                Resume
              </a>

              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid size-9 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-accent-tint hover:text-accent md:hidden"
              >
                <Menu aria-hidden strokeWidth={1.75} className="size-4.5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[80] flex flex-col bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="container-page flex items-center justify-between pt-6">
              <span className="grid size-8 place-items-center rounded-full bg-accent font-display text-[13px] font-bold leading-none text-accent-foreground">
                {site.initials}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-accent-tint hover:text-accent"
              >
                <X aria-hidden strokeWidth={1.75} className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.04 * index, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "block border-b border-border py-4 font-display text-3xl font-semibold tracking-tight transition-colors",
                        isActive(link.href) ? "text-accent" : "text-foreground hover:text-accent",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="container-page flex items-center gap-3 pb-10">
              <a
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground"
              >
                Resume
              </a>
              <ThemeToggle className="size-12 border border-border" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
