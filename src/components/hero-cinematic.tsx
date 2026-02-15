"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { TransitionLink } from "@/components/transition-link";

export function HeroCinematic() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out"
      });

      gsap.to(".hero-glow", {
        yPercent: -10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={rootRef}>
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
    </section>
  );
}
