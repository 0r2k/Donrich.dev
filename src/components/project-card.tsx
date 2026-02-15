import type { CSSProperties } from "react";

import { TransitionLink } from "@/components/transition-link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
const imageStyle: CSSProperties = {
    ["viewTransitionName" as string]: `project-image-${project.slug}`
  };

  const titleStyle: CSSProperties = {
    ["viewTransitionName" as string]: `project-title-${project.slug}`
  };

  return (
    <article className="project-card">
      <TransitionLink href={`/proyectos/${project.slug}`} className="project-card-link">
        <div className="project-image-wrap" style={imageStyle}>
          {project.thumbnailUrl ? <img src={project.thumbnailUrl} alt={project.title} loading="lazy" /> : <div className="project-image-placeholder" />}
        </div>
        <div className="project-meta">
          <p className="project-category">{project.primaryCategory?.name ?? "Proyecto"}</p>
          <h3 style={titleStyle}>{project.title}</h3>
          <p>{project.excerpt}</p>
          <div className="project-tags">
            {project.stack.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
