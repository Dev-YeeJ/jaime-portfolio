import { about, stats } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading } from "@/components/ui";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={about.heading}
        description="Three lanes, one person — and a habit of finishing what I start."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <div className="prose-measure space-y-5 text-[15px] leading-[1.75] text-muted md:text-base">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-foreground" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/*
          The stat row is set as a vertical list rather than the horizontal strip
          the brief sketched: three of the four entries carry a long qualifier
          ("13th & 14th IT Olympics, Computer Network Category"), which truncates
          badly across four columns. Stacked, each one keeps its full detail.
        */}
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="label mb-6">Selected credentials</p>
          <Stagger as="ul" delay={0.1}>
            {stats.map((stat) => (
              <StaggerItem
                as="li"
                key={stat.value}
                className="border-t border-border py-4 last:border-b"
              >
                <p className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{stat.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
