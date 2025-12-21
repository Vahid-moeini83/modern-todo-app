"use client";

import { Moon, Sun } from "lucide-react";
import { usePublicStore } from "@/app/store/publicStore";
import { useEffect } from "react";

/**
 * Header - هدر اصلی پروژه
 */
export function Header() {
  const { theme, setTheme } = usePublicStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Modern Todo App</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
