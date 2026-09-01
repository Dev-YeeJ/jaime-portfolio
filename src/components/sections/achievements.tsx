import { achievements } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading } from "@/components/ui";

export function Achievements() {
  return (
    // The one tinted section on the homepage — and it stays at --background-soft
    // rather than --accent-tint, so the page keeps reading as white.
    <Section id="achievements" tinted>
      <SectionHeading
        eyebrow="Achievements"
        title="Where the work has been tested"
        description="Competitions, honours and training — the record behind the three lanes."
      />

      <Stagger as="ul" className="border-t border-border">
        {achievements.map((achievement) => (
          <StaggerItem
            as="li"
            key={achievement.title + achievement.detail}
            className="group grid gap-1 border-b border-border py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
          >
            <p className="font-display text-[15px] font-semibold tracking-tight sm:col-span-5 md:text-base">
              {achievement.title}
            </p>
            <p className="text-[14px] leading-relaxed text-muted sm:col-span-5">
              {achievement.detail}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent sm:col-span-2 sm:text-right">
              {achievement.year ?? ""}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
