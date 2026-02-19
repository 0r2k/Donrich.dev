"use client";

import { useParams } from "next/navigation";
import { CSSProperties } from "react";

export default function LoadingProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const formattedTitle = slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Cargando proyecto...";

  const titleStyle: CSSProperties = {
    ["viewTransitionName" as string]: "active-project-title"
  };
  const imageStyle: CSSProperties = {
    ["viewTransitionName" as string]: "active-project-image"
  };

  return (
    <section className="project-detail-page">
      <div className="container">
        <p className="eyebrow">Cargando</p>
        <h1 style={titleStyle}>{formattedTitle}</h1>
        <div className="skeleton-card" style={{ marginTop: "1rem", height: "380px", ...imageStyle }} />
      </div>
    </section>
  );
}
