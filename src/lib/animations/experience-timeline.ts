import gsap from "gsap";

import type { GSAPSectionAnimationContext } from "@/hooks/use-gsap-section";
import type { ExperienceMilestone } from "@/lib/types";

type ExperienceTimelineAnimationOptions = {
  items: ExperienceMilestone[];
  track: HTMLUListElement;
  progress: HTMLDivElement;
  setActiveIndex: (index: number) => void;
};

export function animateExperienceTimeline(
  { items, track, progress, setActiveIndex }: ExperienceTimelineAnimationOptions,
  { root, reducedMotion }: GSAPSectionAnimationContext
) {
  if (items.length === 0) {
    return;
  }

  if (reducedMotion) {
    gsap.set(progress, {
      scaleX: 1,
      transformOrigin: "left center"
    });
    return;
  }

  let lastIndex = -1;

  const animation = gsap.to(track, {
    x: () => {
      const maxOffset = Math.max(0, track.scrollWidth - root.clientWidth + 80);
      return -maxOffset;
    },
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(progress, {
          scaleX: self.progress,
          transformOrigin: "left center"
        });

        const index = Math.min(
          items.length - 1,
          Math.floor(self.progress * items.length)
        );
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
}
