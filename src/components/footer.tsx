import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { legalLinks } from "@/lib/legal";
import { navLinks, site } from "@/lib/site";

/**
 * lucide-react v1 dropped its brand marks, so LinkedIn and GitHub are inlined
 * here rather than pulling in a second icon dependency for two glyphs.
 */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    site.linkedin
      ? { label: "LinkedIn", href: site.linkedin, icon: <LinkedInMark /> }
      : null,
    site.github ? { label: "GitHub", href: site.github, icon: <GitHubMark /> } : null,
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  return (
    <footer className="border-t border-border">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">{site.name}</p>
            <p className="prose-measure mt-3 text-sm leading-relaxed text-muted">
              Developer, designer, and virtual assistant. Currently finishing a BS in
              Information Technology and open to work in all three lanes.
            </p>

            {socials.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              // [ ] Add site.linkedin and site.github in src/lib/site.ts and the
              // social buttons appear here automatically.
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                [ ] Social links pending
              </p>
            )}
          </div>

          <nav aria-label="Footer">
            <p className="label mb-4">Site</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-4">Contact</p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail aria-hidden strokeWidth={1.5} className="size-3.5 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin aria-hidden strokeWidth={1.5} className="size-3.5 shrink-0" />
                {site.location}
              </li>
              <li>
                <a
                  href={site.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-block transition-colors hover:text-foreground"
                >
                  Download resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Built with Next.js.
          </p>

          {/* Policy pages live down here rather than in the site nav: findable
              where people look for them, without competing with the work. */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          With great power comes great responsibility.
        </p>
      </div>
    </footer>
  );
}
