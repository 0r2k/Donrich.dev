import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

type AnimatedSectionProps = ComponentPropsWithoutRef<"section">;

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  function AnimatedSection(props, ref) {
    return <section {...props} ref={ref} data-animated-section="true" />;
  }
);
