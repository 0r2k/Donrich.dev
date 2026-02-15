import { ThemeToggle } from "@/components/theme-toggle";
import { TransitionLink } from "@/components/transition-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <TransitionLink href="/" className="brand-link" aria-label="Ir al inicio">
          DONRICH
        </TransitionLink>

        <nav className="site-nav" aria-label="Navegacion principal">
          <TransitionLink href="/#experiencia">Experiencia</TransitionLink>
          <TransitionLink href="/#skills">Skills</TransitionLink>
          <TransitionLink href="/proyectos">Proyectos</TransitionLink>
          <TransitionLink href="/#contacto" className="nav-cta">
            Contacto
          </TransitionLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
