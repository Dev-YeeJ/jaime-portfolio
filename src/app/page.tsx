import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { DesignTeaser } from "@/components/sections/design-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { RecentPosts } from "@/components/sections/recent-posts";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Achievements />
      <FeaturedProjects />
      <DesignTeaser />
      <Testimonials />
      <RecentPosts />
      <Contact />
    </>
  );
}
