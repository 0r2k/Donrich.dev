import { cache } from "react";

import { getPayloadClient } from "@/lib/payload";
import { projectCategorySeed } from "@/lib/site";
import type { Category, CaseStudyMode, Project } from "@/lib/types";
import { slugify } from "@/lib/utils";

type Filters = {
  categorySlug?: string;
  query?: string;
  type?: CaseStudyMode;
};

const fallbackCategories: Category[] = projectCategorySeed.map((name, index) => ({
  id: `fallback-category-${index}`,
  name,
  slug: slugify(name),
  order: index,
  active: true
}));

const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    title: "Plataforma comercial para servicios profesionales",
    slug: "plataforma-comercial-servicios",
    excerpt:
      "Redisenio frontend y mejora de conversion con arquitectura modular en Next.js para escalar paginas de venta.",
    content:
      "Caso enfocado en simplificar la experiencia de contratacion, mejorar tiempos de carga y aumentar conversion en formularios.",
    caseStudyMode: "full",
    featured: true,
    featuredOrder: 1,
    primaryCategory: fallbackCategories[0],
    secondaryCategories: [fallbackCategories[4]],
    stack: ["Next.js", "TypeScript", "GSAP", "Supabase"],
    year: 2025,
    client: "Cliente privado",
    role: "Lead Full-Stack",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        caption: "Pantalla principal y recorrido de conversion"
      }
    ],
    links: {
      liveUrl: "https://example.com"
    },
    metrics: [
      { label: "Conversion", value: "+31%" },
      { label: "LCP", value: "1.7s" }
    ],
    status: "published"
  },
  {
    id: "fallback-2",
    title: "Sistema backend para automatizar operaciones",
    slug: "sistema-backend-automatizacion-operaciones",
    excerpt: "Backend orientado a eventos con integraciones externas y trazabilidad operativa.",
    content:
      "Se consolidaron procesos dispersos en un sistema unico con validaciones, logs y panel de observabilidad.",
    caseStudyMode: "full",
    featured: true,
    featuredOrder: 2,
    primaryCategory: fallbackCategories[1],
    secondaryCategories: [fallbackCategories[5]],
    stack: ["Node.js", "Postgres", "Supabase", "Webhooks"],
    year: 2024,
    client: "Cliente privado",
    role: "Backend Engineer",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    links: {
      repoUrl: "https://github.com"
    },
    metrics: [
      { label: "Tiempo operativo", value: "-42%" },
      { label: "Errores manuales", value: "-68%" }
    ],
    status: "published"
  },
  {
    id: "fallback-3",
    title: "Aplicacion para gestion de contenido interno",
    slug: "aplicacion-gestion-contenido-interno",
    excerpt: "App de uso interno para equipos con flujos editoriales y control de estados.",
    content: "Se construyo una app con roles, aprobaciones y paneles para reducir dependencia de hojas de calculo.",
    caseStudyMode: "short",
    featured: true,
    featuredOrder: 3,
    primaryCategory: fallbackCategories[2],
    secondaryCategories: [fallbackCategories[6]],
    stack: ["React", "TypeScript", "Payload", "Postgres"],
    year: 2023,
    client: "Cliente privado",
    role: "Product Engineer",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    links: {},
    metrics: [{ label: "Tiempo de publicacion", value: "-55%" }],
    status: "published"
  },
  {
    id: "fallback-4",
    title: "Plugin WordPress para personalizacion de checkout",
    slug: "plugin-wordpress-checkout",
    excerpt: "Extension custom para checkout con reglas por tipo de cliente e integracion externa.",
    content:
      "Plugin orientado a ecommerce para mejorar conversion y adaptar reglas comerciales por segmento.",
    caseStudyMode: "short",
    featured: true,
    featuredOrder: 4,
    primaryCategory: fallbackCategories[3],
    secondaryCategories: [fallbackCategories[4]],
    stack: ["PHP", "WordPress", "WooCommerce", "JavaScript"],
    year: 2022,
    client: "Cliente privado",
    role: "WordPress Developer",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    links: {},
    metrics: [{ label: "Tasa de compra", value: "+18%" }],
    status: "published"
  }
];

function normalizeCategory(raw: any): Category | undefined {
  if (!raw || typeof raw !== "object") {
    return undefined;
  }

  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    order: raw.order,
    colorToken: raw.colorToken,
    active: raw.active
  };
}

function normalizeProject(raw: any): Project {
  const primaryCategory = normalizeCategory(raw.primaryCategory);

  const secondaryCategories = Array.isArray(raw.secondaryCategories)
    ? raw.secondaryCategories.map(normalizeCategory).filter(Boolean)
    : [];

  const stack = Array.isArray(raw.stack)
    ? raw.stack
        .map((entry: any) => (typeof entry === "string" ? entry : entry?.name))
        .filter(Boolean)
    : [];

  const gallery = Array.isArray(raw.gallery)
    ? raw.gallery
        .map((item: any) => ({
          imageUrl: item?.imageUrl,
          caption: item?.caption
        }))
        .filter((item: { imageUrl?: string }) => Boolean(item.imageUrl))
    : [];

  const metrics = Array.isArray(raw.metrics)
    ? raw.metrics
        .map((metric: any) => ({
          label: metric?.label,
          value: metric?.value
        }))
        .filter((metric: { label?: string; value?: string }) => Boolean(metric.label && metric.value))
    : [];

  return {
    id: String(raw.id),
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt,
    content: raw.content,
    caseStudyMode: raw.caseStudyMode === "full" ? "full" : "short",
    featured: Boolean(raw.featured),
    featuredOrder: typeof raw.featuredOrder === "number" ? raw.featuredOrder : undefined,
    primaryCategory,
    secondaryCategories: secondaryCategories as Category[],
    stack,
    year: raw.year,
    client: raw.client,
    role: raw.role,
    thumbnailUrl: raw.thumbnailUrl,
    gallery,
    links: {
      liveUrl: raw.links?.liveUrl,
      repoUrl: raw.links?.repoUrl
    },
    metrics,
    status: raw.status === "draft" ? "draft" : "published"
  };
}

const fetchProjectsFromPayload = cache(async (): Promise<Project[]> => {
  try {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: "projects",
      limit: 200,
      depth: 2,
      where: {
        status: {
          equals: "published"
        }
      },
      sort: "-year"
    });

    if (!response.docs.length) {
      return fallbackProjects;
    }

    return response.docs.map(normalizeProject);
  } catch {
    return fallbackProjects;
  }
});

export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: "categories",
      limit: 100,
      where: {
        active: {
          equals: true
        }
      },
      sort: "order"
    });

    if (!response.docs.length) {
      return fallbackCategories;
    }

    return response.docs
      .map(normalizeCategory)
      .filter(Boolean)
      .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)) as Category[];
  } catch {
    return fallbackCategories;
  }
});

function applyFilters(projects: Project[], filters: Filters): Project[] {
  return projects.filter((project) => {
    if (filters.categorySlug) {
      const slugs = [project.primaryCategory?.slug, ...project.secondaryCategories.map((category) => category.slug)].filter(
        Boolean
      );
      if (!slugs.includes(filters.categorySlug)) {
        return false;
      }
    }

    if (filters.type && project.caseStudyMode !== filters.type) {
      return false;
    }

    if (filters.query) {
      const haystack = [project.title, project.excerpt, project.content ?? "", project.stack.join(" ")]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(filters.query.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await fetchProjectsFromPayload();
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
    .slice(0, 4);
}

export async function getProjects(filters: Filters = {}): Promise<Project[]> {
  const projects = await fetchProjectsFromPayload();
  const filtered = applyFilters(projects, filters);
  return filtered.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await fetchProjectsFromPayload();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const projects = await fetchProjectsFromPayload();
  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .filter((candidate) => {
      const categorySlug = project.primaryCategory?.slug;
      if (!categorySlug) {
        return true;
      }
      return (
        candidate.primaryCategory?.slug === categorySlug ||
        candidate.secondaryCategories.some((category) => category.slug === categorySlug)
      );
    })
    .slice(0, limit);
}
