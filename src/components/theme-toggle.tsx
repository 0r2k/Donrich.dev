"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button type="button" className="theme-toggle" aria-label="Cambiar tema" disabled>
        THEME
      </button>
    );
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button type="button" className="theme-toggle" aria-label="Cambiar tema" onClick={() => setTheme(nextTheme)}>
      {resolvedTheme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
