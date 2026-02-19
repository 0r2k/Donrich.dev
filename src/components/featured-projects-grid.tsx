import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { TransitionLink } from "@/components/transition-link";
import type { Project } from "@/lib/types";

export function FeaturedProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="section-block">
      <div className="container">
        <Reveal analyticsId="featured-projects-header">
          <div className="section-row">
            <div>
              <p className="eyebrow">Proyectos destacados</p>
              <h2>Ultimos casos con impacto medible</h2>
            </div>
            <TransitionLink href="/proyectos" className="btn btn-ghost">
              Ver todos
            </TransitionLink>
          </div>
        </Reveal>

        <div className="project-grid">
          {projects.map((project) => (
            <Reveal key={project.id} analyticsId={`featured-project-card-${project.slug}`}>
              <ProjectCard project={project} analyticsContext="featured_projects" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
