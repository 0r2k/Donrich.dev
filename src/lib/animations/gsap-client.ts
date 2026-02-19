"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export function registerGSAPPlugins() {
  if (pluginsRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
}
