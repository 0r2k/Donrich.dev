"use client";

import { useCallback, useRef } from "react";
import type { PropsWithChildren } from "react";
import gsap from "gsap";

import { useGSAPSection } from "@/hooks/use-gsap-section";
import type { GSAPSectionAnimationContext } from "@/hooks/use-gsap-section";
import { trackPlausibleEvent } from "@/lib/analytics/plausible";

type RevealProps = PropsWithChildren<{
  className?: string;
  analyticsId?: string;
}>;

export function Reveal({ children, className, analyticsId }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  const animation = useCallback(
    ({ root, reducedMotion }: GSAPSectionAnimationContext) => {
      if (reducedMotion) {
        gsap.set(root, { opacity: 1, y: 0 });
        return;
      }

      // Reset any CSS transitions that might interfere with GSAP
      gsap.set(root, { transition: "none" });

      // Initial state
      gsap.set(root, { opacity: 0, y: 32 });

      // Animation with scrub
      gsap.to(root, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          end: "top 70%",
          scrub: 0.6,
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            if (analyticsId && !hasTrackedRef.current) {
              hasTrackedRef.current = true;
              trackPlausibleEvent("Animated Block Interaction", {
                block_id: analyticsId,
                path: window.location.pathname
              });
            }
          }
        }
      });
    },
    [analyticsId]
  );

  useGSAPSection(ref, animation);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
