"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

import { registerGSAPPlugins } from "@/lib/animations/gsap-client";

export type GSAPSectionAnimationContext = {
  root: HTMLElement;
  reducedMotion: boolean;
};

export type GSAPSectionAnimation = (
  context: GSAPSectionAnimationContext
) => void | (() => void);

export function useGSAPSection(
  rootRef: RefObject<HTMLElement | null>,
  animation: GSAPSectionAnimation
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    registerGSAPPlugins();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cleanup: void | (() => void);

    const ctx = gsap.context(() => {
      cleanup = animation({ root, reducedMotion });
    }, root);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, [rootRef, animation]);
}
