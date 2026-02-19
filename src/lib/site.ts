export const siteConfig = {
  name: "Donrich Portfolio",
  title: "Portafolio Cinematico | Full-Stack y Producto",
  description:
    "Portafolio de desarrollo frontend, backend, aplicaciones y WordPress con enfoque en producto y resultados.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL ?? "hola@donrich.dev",
  social: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" }
  ]
} as const;

export const projectCategorySeed = [
  "Sitios Web (Frontend)",
  "Sistemas Backend",
  "Aplicaciones",
  "Plugins de WordPress",
  "E-commerce e Integraciones",
  "Automatizaciones / IA",
  "Open Source / Herramientas Internas"
];
