export default function LoadingProjectDetail() {
  return (
    <section className="project-detail-page">
      <div className="container">
        <p className="eyebrow">Cargando</p>
        <h1>Cargando proyecto...</h1>
        <div className="skeleton-card" style={{ marginTop: "1rem", height: "380px" }} />
      </div>
    </section>
  );
}
