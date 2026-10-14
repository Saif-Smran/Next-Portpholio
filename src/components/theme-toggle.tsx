"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="w-9 h-9 text-[var(--muted)]"
      >
        <span className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="h-9 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/60 text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[var(--accent)] transition-all flex items-center gap-1.5 cursor-pointer text-xs font-mono"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4 text-[var(--accent)]" />
          <span className="hidden sm:inline text-[var(--muted)] text-[11px]">
            Dark
          </span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-[var(--accent-2)]" />
          <span className="hidden sm:inline text-[var(--muted)] text-[11px]">
            Light
          </span>
        </>
      )}
    </Button>
  );
}
