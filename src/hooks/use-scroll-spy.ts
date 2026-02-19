import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentId: string | null = null;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const { top, height } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = elementTop + height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentId = id;
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
}
