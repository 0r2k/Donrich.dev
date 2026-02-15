export default function LoadingProjects() {
  return (
    <section className="projects-page">
      <div className="container">
        <p className="eyebrow">Cargando</p>
        <h1>Cargando proyectos...</h1>
        <div className="project-grid full-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton-card" />
          ))}
        </div>
      </div>
    </section>
  );
}
