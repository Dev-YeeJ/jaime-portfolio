import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Section, SectionHeading } from "@/components/ui";

/**
 * No invented praise. Until a real quote exists, each card renders visibly as an
 * open slot — a standing reminder rather than filler that could be mistaken for
 * the finished thing. Fill in quote/name/role in content.ts and the card flips
 * to its finished state on its own.
 */
export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say"
        description="Quotes from the people I have worked with, going in here as they come in."
      />

      <Stagger as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => {
          const isFilled = testimonial.quote.trim().length > 0;

          return (
            <StaggerItem as="li" key={testimonial.id} className="h-full">
              <figure className="card-surface flex h-full flex-col rounded-xl p-6">
                <Quote
                  aria-hidden
                  strokeWidth={1.5}
                  className="mb-5 size-5 shrink-0 text-accent/45"
                />

                {isFilled ? (
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground">
                    {testimonial.quote}
                  </blockquote>
                ) : (
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      [ ] Awaiting quote
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {testimonial.prompt}
                    </p>
                  </div>
                )}

                <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <div className="w-9 shrink-0">
                    <ImagePlaceholder ratio="1/1" compact />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-[14px] font-semibold tracking-tight">
                      {isFilled ? testimonial.name : "[ ] Name"}
                    </p>
                    <p className="truncate text-[12.5px] text-muted">
                      {isFilled ? testimonial.role : "[ ] Role"}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
