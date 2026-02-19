import gsap from "gsap";

import type { GSAPSectionAnimation } from "@/hooks/use-gsap-section";

export const animateHeroCinematic: GSAPSectionAnimation = ({ root, reducedMotion }) => {
  if (reducedMotion) {
    return;
  }

  gsap.from("[data-hero-item]", {
    opacity: 0,
    y: 28,
    duration: 0.9,
    stagger: 0.14,
    ease: "power3.out"
  });

  const glow = root.querySelector(".hero-glow");
  if (!glow) return;

  // Background color animation
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(glow, {
    background: "radial-gradient(circle at 30% 30%, rgba(90, 140, 255, 0.66), transparent 58%), radial-gradient(circle at 70% 70%, rgba(255, 143, 102, 0.44), transparent 64%)",
    duration: 8,
    ease: "sine.inOut"
  });

  // Default floating animation (Vertical breathing only)
  const floatAnim = gsap.to(glow, {
    yPercent: -15,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Mouse move parallax effect (using quickTo for performance)
  const xTo = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power2.out" });
  const yTo = gsap.quickTo(glow, "y", { duration: 1.2, ease: "power2.out" });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    // Increased range to 150px for better visibility
    const x = (clientX / window.innerWidth - 0.5) * 150;
    const y = (clientY / window.innerHeight - 0.5) * 150;

    xTo(x);
    yTo(y);
  };

  const handleMouseLeave = () => {
    // Return to center
    xTo(0);
    yTo(0);
  };

  root.addEventListener("mousemove", handleMouseMove);
  root.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    root.removeEventListener("mousemove", handleMouseMove);
    root.removeEventListener("mouseleave", handleMouseLeave);
    tl.kill();
    floatAnim.kill();
    // Cleanup quickTo instances isn't strictly necessary as they're bound to the element, 
    // but good practice if we could. However, GSAP doesn't have a kill() on quickTo functions directly,
    // killing tweens of the element handles it.
    gsap.killTweensOf(glow);
  };
};
