import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const projectEntries: MetadataRoute.Sitemap = projects.map(
    (project): MetadataRoute.Sitemap[number] => ({
      url: absoluteUrl(`/proyectos/${project.slug}`),
      priority: 0.7,
      changeFrequency: "monthly"
    })
  );

  return [
    {
      url: absoluteUrl("/"),
      priority: 1,
      changeFrequency: "weekly"
    },
    {
      url: absoluteUrl("/proyectos"),
      priority: 0.9,
      changeFrequency: "weekly"
    },
    ...projectEntries
  ];
}
