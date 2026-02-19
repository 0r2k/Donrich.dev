"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { useGSAPSection } from "@/hooks/use-gsap-section";
import type { GSAPSectionAnimationContext } from "@/hooks/use-gsap-section";
import { animateExperienceTimeline } from "@/lib/animations/experience-timeline";
import type { ExperienceMilestone } from "@/lib/types";

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

  const animation = useCallback(
    ({ root, reducedMotion }: GSAPSectionAnimationContext) => {
      const track = trackRef.current;
      const progress = progressRef.current;

      if (!track || !progress) {
        return;
      }

      return animateExperienceTimeline(
        {
          items,
          track,
          progress,
          setActiveIndex
        },
        { root, reducedMotion }
      );
    },
    [items]
  );

  useGSAPSection(sectionRef, animation);

  return (
    <AnimatedSection id="experiencia" className="experience-section" ref={sectionRef}>
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
    </AnimatedSection>
  );
}
