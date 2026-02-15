import type { ExperienceMilestone, SkillGroup } from "@/lib/types";

export const EXPERIENCE_TIMELINE: ExperienceMilestone[] = [
  {
    year: 2018,
    title: "Primeros productos web",
    description: "Inicie proyectos para clientes pequenos y valide procesos reales de entrega.",
    impact: "Base de trabajo full-stack orientado a negocio"
  },
  {
    year: 2019,
    title: "Escalado de frontend",
    description: "Estructure componentes reutilizables y patrones de UI para velocidad de iteracion.",
    impact: "Menor tiempo de salida a produccion"
  },
  {
    year: 2020,
    title: "Sistemas backend",
    description: "Implemente APIs y servicios con foco en integraciones y datos confiables.",
    impact: "Mayor estabilidad operativa"
  },
  {
    year: 2021,
    title: "Automatizacion y WordPress",
    description: "Combine plugins, pipelines y automatizaciones para procesos de contenido.",
    impact: "Reduccion de tareas manuales"
  },
  {
    year: 2022,
    title: "Arquitectura de producto",
    description: "Pase de soluciones aisladas a plataformas mas mantenibles y medibles.",
    impact: "Mejor calidad tecnica y roadmap"
  },
  {
    year: 2023,
    title: "Entrega multi-categoria",
    description: "Consolide trabajo entre frontend, backend, apps y ecommerce.",
    impact: "Portafolio transversal"
  },
  {
    year: 2024,
    title: "UI de alta calidad",
    description: "Eleve diseno y motion para experiencias mas memorables y diferenciales.",
    impact: "Mayor conversion visual"
  },
  {
    year: 2025,
    title: "Aceleracion con IA",
    description: "Integre flujos asistidos por IA para velocidad de desarrollo y contenido.",
    impact: "Incremento de productividad"
  },
  {
    year: 2026,
    title: "Portafolio cinematografico",
    description: "Nueva presencia digital centrada en conversion, casos y posicionamiento premium.",
    impact: "Marca personal mas solida"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "HTML", "CSS", "GSAP", "View Transitions"]
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js", "APIs REST", "Arquitectura de servicios", "Autenticacion", "Integraciones"]
  },
  {
    id: "infra",
    title: "Infra y DevOps",
    skills: ["Vercel", "Supabase", "Postgres", "Monitoreo", "Optimización performance"]
  },
  {
    id: "cms",
    title: "CMS y WordPress",
    skills: ["Payload CMS", "WordPress Plugins", "Modelado de contenido", "SEO tecnico"]
  },
  {
    id: "automation",
    title: "Automatizacion e IA",
    skills: ["Automatizacion de flujos", "Asistentes IA", "Herramientas internas", "Integraciones AI"]
  }
];
