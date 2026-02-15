import { Reveal } from "@/components/reveal";

export function WhoIAmSection() {
  return (
    <section className="section-block">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Quien soy</p>
          <h2>Ingenieria, diseno y producto en una sola ejecucion.</h2>
          <p className="section-copy">
            Trabajo entre diseno, ingenieria y producto. Construyo soluciones escalables con atencion obsesiva
            al detalle, enfocadas en impacto real para clientes y equipos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
