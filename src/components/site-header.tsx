"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

export function SiteHeader() {
  const pathname = usePathname();
  const activeSection = useScrollSpy(["experiencia", "skills", "contacto"], 100);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <TransitionLink href="/" className="brand-link" aria-label="Ir al inicio">
          DONRICH
        </TransitionLink>

        <nav className="site-nav" aria-label="Navegación principal">
          <TransitionLink 
            href="/#experiencia"
            className={pathname === "/" && activeSection === "experiencia" ? "active" : ""}
          >
            Experiencia
          </TransitionLink>
          <TransitionLink 
            href="/#skills"
            className={pathname === "/" && activeSection === "skills" ? "active" : ""}
          >
            Skills
          </TransitionLink>
          <TransitionLink 
            href="/proyectos"
            className={pathname.startsWith("/proyectos") ? "active" : ""}
          >
            Proyectos
          </TransitionLink>
          <TransitionLink 
            href="/#contacto"
            className={pathname === "/" && activeSection === "contacto" ? "active" : ""}
          >
            Contacto
          </TransitionLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
