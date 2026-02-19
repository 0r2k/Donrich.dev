"use client";

import { useEffect } from "react";
import { setActiveProjectSlug } from "@/lib/active-project-state";

export function ProjectDetailTracker({ slug }: { slug: string }) {
  // When this component mounts (meaning we are ON the detail page),
  // we set the active slug so that if the user navigates back,
  // the project list knows which card to animate TO.
  if (typeof window !== "undefined") {
    setActiveProjectSlug(slug);
  }

  useEffect(() => {
    setActiveProjectSlug(slug);
  }, [slug]);

  return null;
}