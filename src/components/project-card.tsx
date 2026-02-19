"use client";

import { TransitionLink } from "@/components/transition-link";
import { getActiveProjectSlug, setActiveProjectSlug } from "@/lib/active-project-state";
import { trackPlausibleEvent } from "@/lib/analytics/plausible";
import type { Project } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

export function ProjectCard({
  project,
  analyticsContext = "projects_catalog"
}: {
  project: Project;
  analyticsContext?: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Apply view transition name if this is the active project we are returning from
  useEffect(() => {
    const activeSlug = getActiveProjectSlug();
    if (activeSlug === project.slug) {
      if (imageRef.current) imageRef.current.style.viewTransitionName = "active-project-image";
      if (titleRef.current) titleRef.current.style.viewTransitionName = "active-project-title";
      
      // Clear it after a short delay so it doesn't persist if we navigate elsewhere
      const timer = setTimeout(() => {
        if (imageRef.current) imageRef.current.style.viewTransitionName = "";
        if (titleRef.current) titleRef.current.style.viewTransitionName = "";
        setActiveProjectSlug(null);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [project.slug]);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Standardize view transition names for the clicked element
    const card = e.currentTarget;
    const image = card.querySelector(".project-image-wrap") as HTMLElement;
    const title = card.querySelector("h3") as HTMLElement;

    if (image) image.style.viewTransitionName = "active-project-image";
    if (title) title.style.viewTransitionName = "active-project-title";

    // Set active slug so if we come back, we know who we are
    setActiveProjectSlug(project.slug);

    trackPlausibleEvent(analyticsContext === "featured_projects" ? "Featured Project Click" : "Project Click", {
      project_slug: project.slug,
      project_title: project.title,
      category: project.primaryCategory?.slug ?? "none",
      section: analyticsContext
    });
  };

  return (
    <article className="project-card">
      <TransitionLink
        href={`/proyectos/${project.slug}`}
        className="project-card-link"
        onClick={handleProjectClick}
        data-transition-type="project"
      >
        <div className="project-image-wrap" ref={imageRef}>
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="project-image-placeholder" />
          )}
        </div>
        <div className="project-meta">
          <p className="project-category">{project.primaryCategory?.name ?? "Proyecto"}</p>
          <h3 className="project-title" ref={titleRef}>{project.title}</h3>
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
