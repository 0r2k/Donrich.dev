"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { ExperienceMilestone } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceTimeline({ items }: { items: ExperienceMilestone[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const yearRangeLabel = useMemo(() => {
    const first = items[0]?.year;
    const last = items[items.length - 1]?.year;
    if (!first || !last) {
      return "";
    }
    return `${first} - ${last}`;
  }, [items]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track || !progress || items.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      progress.style.transform = "scaleX(1)";
      return;
    }

    let lastIndex = -1;

    const ctx = gsap.context(() => {
      const animation = gsap.to(track, {
        x: () => {
          const maxOffset = Math.max(0, track.scrollWidth - section.clientWidth + 80);
          return -maxOffset;
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(progress, {
              scaleX: self.progress,
              transformOrigin: "left center"
            });

            const index = Math.min(items.length - 1, Math.floor(self.progress * items.length));
            if (index !== lastIndex) {
              lastIndex = index;
              setActiveIndex(index);
            }
          }
        }
      });

      return () => {
        animation.kill();
      };
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [items]);

  return (
    <section id="experiencia" className="experience-section" ref={sectionRef}>
      <div className="experience-sticky">
        <div className="container">
          <p className="eyebrow">Experiencia</p>
          <h2>Timeline en movimiento con hitos por ano</h2>
          <p className="section-copy">{yearRangeLabel}</p>
        </div>

        <div className="experience-progress-track" aria-hidden="true">
          <div className="experience-progress-fill" ref={progressRef} />
        </div>

        <ul className="experience-track" ref={trackRef}>
          {items.map((item, index) => (
            <li key={`${item.year}-${item.title}`} className={index === activeIndex ? "experience-item active" : "experience-item"}>
              <p className="experience-year">{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.impact ? <p className="experience-impact">{item.impact}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
