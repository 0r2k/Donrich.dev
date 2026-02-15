import { ExperienceTimeline } from "@/components/experience-timeline";
import { FeaturedProjectsGrid } from "@/components/featured-projects-grid";
import { HeroCinematic } from "@/components/hero-cinematic";
import { SkillsMatrix } from "@/components/skills-matrix";
import { WhoIAmSection } from "@/components/who-i-am-section";
import { EXPERIENCE_TIMELINE, SKILL_GROUPS } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 120;

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <HeroCinematic />
      <WhoIAmSection />
      <ExperienceTimeline items={EXPERIENCE_TIMELINE} />
      <SkillsMatrix groups={SKILL_GROUPS} />
      <FeaturedProjectsGrid projects={featuredProjects} />
    </>
  );
}
