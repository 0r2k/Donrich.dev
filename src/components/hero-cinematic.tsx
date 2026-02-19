"use client";

import { useRef } from "react";

import { animateHeroCinematic } from "@/lib/animations/hero-cinematic";
import { useGSAPSection } from "@/hooks/use-gsap-section";
import { AnimatedSection } from "@/components/animated-section";
import { TransitionLink } from "@/components/transition-link";

export function HeroCinematic() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAPSection(rootRef, animateHeroCinematic);

  return (
    <AnimatedSection className="hero" ref={rootRef}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <p className="eyebrow" data-hero-item>
          Full-Stack Developer
        </p>
        <h1 data-hero-item>
          Soy Donrich, desarrollo experiencias web y sistemas que convierten ideas en producto real.
        </h1>
        <p className="hero-subcopy" data-hero-item>
          Frontend, backend, apps y WordPress con enfoque en negocio, rendimiento y diseno.
        </p>
        <div className="hero-cta" data-hero-item>
          <TransitionLink href="/proyectos" className="btn btn-primary">
            Ver proyectos
          </TransitionLink>
          <TransitionLink href="/#contacto" className="btn btn-ghost">
            Hablemos
          </TransitionLink>
        </div>
        <p className="scroll-indicator" data-hero-item>
          Scroll para explorar
        </p>
      </div>
    </AnimatedSection>
  );
}
