import { TransitionLink } from "@/components/transition-link";

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Esta pagina no existe</h1>
        <p>Revisa la URL o vuelve al catalogo de proyectos.</p>
        <TransitionLink href="/proyectos" className="btn btn-primary">
          Ir a proyectos
        </TransitionLink>
      </div>
    </section>
  );
}
