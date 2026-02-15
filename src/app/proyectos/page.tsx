import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { ProjectsFilter } from "@/components/projects-filter";
import { getCategories, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Catalogo completo de proyectos por categoria, stack y tipo de caso de estudio."
};

export const revalidate = 120;

type SearchParams = {
  categoria?: string;
  q?: string;
  tipo?: "full" | "short";
};

export default async function ProyectosPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const categorySlug = params.categoria?.trim() || undefined;
  const query = params.q?.trim() || undefined;
  const type = params.tipo === "full" || params.tipo === "short" ? params.tipo : undefined;

  const [categories, projects] = await Promise.all([
    getCategories(),
    getProjects({
      categorySlug,
      query,
      type
    })
  ]);

  return (
    <section className="projects-page">
      <div className="container">
        <p className="eyebrow">Proyectos</p>
        <h1>Catalogo completo de trabajo</h1>
        <p className="section-copy">
          Explora proyectos de frontend, backend, apps, WordPress, ecommerce, automatizaciones y herramientas
          internas.
        </p>

        <ProjectsFilter categories={categories} selectedCategory={categorySlug} selectedType={type} query={query} />

        {projects.length === 0 ? (
          <div className="empty-state">
            <h2>No hay resultados para estos filtros</h2>
            <p>Prueba otra categoria o limpia los filtros para ver todo el catalogo.</p>
          </div>
        ) : (
          <div className="project-grid full-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
