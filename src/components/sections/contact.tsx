import dynamic from "next/dynamic";
import { Mail, MapPin } from "lucide-react";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";
import { AmbientField } from "@/components/ambient-field";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";

// The form is interactive, below the fold, and the heaviest client component on
// the page — worth splitting out of the initial bundle.
const ContactForm = dynamic(() =>
  import("@/components/contact-form").then((m) => m.ContactForm),
);

export function Contact() {
  return (
    <section id="contact" className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-32">
      {/* The hero's ambient field, reprised quietly to close the page. */}
      <AmbientField className="opacity-60" />

      <div className="container-page">
        <SectionHeading eyebrow="Contact" title={contact.heading} description={contact.subhead} />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="card-surface h-full rounded-xl p-6 md:p-8">
              <p className="label mb-6">Direct</p>

              <ul className="space-y-5">
                <li>
                  <p className="mb-1 text-[12.5px] text-muted">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline inline-flex items-center gap-2 font-display text-[15px] font-medium tracking-tight transition-colors hover:text-accent"
                  >
                    <Mail aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-accent" />
                    {site.email}
                  </a>
                </li>

                <li>
                  <p className="mb-1 text-[12.5px] text-muted">Based in</p>
                  <p className="inline-flex items-center gap-2 font-display text-[15px] font-medium tracking-tight">
                    <MapPin aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-accent" />
                    {site.location}
                  </p>
                </li>

                <li>
                  <p className="mb-1 text-[12.5px] text-muted">LinkedIn</p>
                  {site.linkedin ? (
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-display text-[15px] font-medium tracking-tight transition-colors hover:text-accent"
                    >
                      View profile
                    </a>
                  ) : (
                    // [ ] Set site.linkedin in src/lib/site.ts.
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      [ ] Profile URL
                    </p>
                  )}
                </li>

                <li>
                  <p className="mb-1 text-[12.5px] text-muted">Resume</p>
                  {/* [ ] Add public/resume.pdf — this link is already pointed at it. */}
                  <a
                    href={site.resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-display text-[15px] font-medium tracking-tight transition-colors hover:text-accent"
                  >
                    Download PDF
                  </a>
                </li>
              </ul>

              <p className="mt-8 border-t border-border pt-6 text-[13.5px] leading-relaxed text-muted">
                I read everything that comes in and reply to anything real. If it is
                urgent, email is the fastest way through.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
