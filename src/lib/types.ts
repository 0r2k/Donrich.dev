export type CaseStudyMode = "full" | "short";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  colorToken?: string;
  active?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectGalleryItem {
  imageUrl: string;
  caption?: string;
}

export interface ProjectLinks {
  liveUrl?: string;
  repoUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  caseStudyMode: CaseStudyMode;
  featured: boolean;
  featuredOrder?: number;
  primaryCategory?: Category;
  secondaryCategories: Category[];
  stack: string[];
  year?: number;
  client?: string;
  role?: string;
  thumbnailUrl?: string;
  gallery: ProjectGalleryItem[];
  links: ProjectLinks;
  metrics: ProjectMetric[];
  status: "draft" | "published";
}

export interface ExperienceMilestone {
  year: number;
  title: string;
  description: string;
  impact?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface LeadPayload {
  name: string;
  email: string;
  message: string;
  sourcePath?: string;
}
