import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { ProjectCard } from "@/components/project-card";
import { ProjectDetailTracker } from "@/components/project-detail-tracker";
import { TransitionLink } from "@/components/transition-link";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 120;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado"
    };
  }

  return {
    title: project.title,
    description: project.excerpt
  };
}

export default async function ProyectoDetallePage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(project, 3);
  const titleTransitionStyle: CSSProperties = {
    ["viewTransitionName" as string]: "active-project-title"
  };
  const imageTransitionStyle: CSSProperties = {
    ["viewTransitionName" as string]: "active-project-image"
  };

  return (
    <article className="project-detail-page">
      <ProjectDetailTracker slug={project.slug} />
      <div className="container">
        <TransitionLink href="/proyectos" className="back-link">
          Volver a proyectos
        </TransitionLink>

        <header className="project-hero">
          <p className="project-category">{project.primaryCategory?.name ?? "Proyecto"}</p>
          <h1 style={titleTransitionStyle}>{project.title}</h1>
          <p>{project.excerpt}</p>
          <div className="project-tags">
            {project.stack.map((stackItem) => (
              <span key={stackItem}>{stackItem}</span>
            ))}
          </div>
        </header>

        {project.thumbnailUrl ? (
          <div className="project-detail-image" style={imageTransitionStyle}>
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, 80vw"
              priority
            />
          </div>
        ) : null}

        <section className="project-detail-grid">
          <div>
            {project.caseStudyMode === "full" ? (
              <>
                <h2>Problema y contexto</h2>
                <p>{project.content ?? project.excerpt}</p>
                <h2>Implementacion</h2>
                <p>
                  Arquitectura enfocada en mantenibilidad, velocidad de iteracion y experiencia de usuario medible en
                  produccion.
                </p>
                <h2>Resultado</h2>
                <p>Entrega orientada a negocio con mejoras en conversion, performance y estabilidad operativa.</p>
              </>
            ) : (
              <>
                <h2>Resumen tecnico</h2>
                <p>{project.content ?? project.excerpt}</p>
              </>
            )}
          </div>
          <aside>
            <dl>
              {project.year ? (
                <>
                  <dt>Ano</dt>
                  <dd>{project.year}</dd>
                </>
              ) : null}
              {project.client ? (
                <>
                  <dt>Cliente</dt>
                  <dd>{project.client}</dd>
                </>
              ) : null}
              {project.role ? (
                <>
                  <dt>Rol</dt>
                  <dd>{project.role}</dd>
                </>
              ) : null}
              <dt>Formato</dt>
              <dd>{project.caseStudyMode === "full" ? "Caso de estudio" : "Ficha tecnica"}</dd>
            </dl>
          </aside>
        </section>

        {project.metrics.length > 0 ? (
          <section className="project-metrics">
            <h2>Resultados</h2>
            <div className="metrics-grid">
              {project.metrics.map((metric) => (
                <article key={`${metric.label}-${metric.value}`}>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {project.caseStudyMode === "full" && project.gallery.length > 0 ? (
          <section className="project-gallery">
            <h2>Galeria</h2>
            <div className="gallery-grid">
              {project.gallery.map((item) => (
                <figure key={item.imageUrl}>
                  <Image
                    src={item.imageUrl}
                    alt={item.caption ?? project.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 760px) 100vw, 50vw"
                    loading="lazy"
                  />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {(project.links.liveUrl || project.links.repoUrl) && (
          <section className="project-links">
            <h2>Enlaces</h2>
            <div className="project-links-row">
              {project.links.liveUrl ? (
                <a href={project.links.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Ver demo
                </a>
              ) : null}
              {project.links.repoUrl ? (
                <a href={project.links.repoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  Ver repositorio
                </a>
              ) : null}
            </div>
          </section>
        )}

        {related.length > 0 ? (
          <section className="related-projects">
            <h2>Proyectos relacionados</h2>
            <div className="project-grid">
              {related.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} project={relatedProject} analyticsContext="related_projects" />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
