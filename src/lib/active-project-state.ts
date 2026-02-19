// Simple mutable state for SPA navigation view transitions
// This allows us to "morph back" to the correct card when navigating back from a detail page
let activeSlug: string | null = null;

export const setActiveProjectSlug = (slug: string | null) => {
  activeSlug = slug;
};

export const getActiveProjectSlug = () => {
  return activeSlug;
};
