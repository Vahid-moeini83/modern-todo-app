"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Home, BarChart3 } from "lucide-react";
import { usePublicStore } from "@/app/store/publicStore";
import { useEffect } from "react";

/**
 * Header - هدر اصلی پروژه
 */
export function Header() {
  const { theme, setTheme } = usePublicStore();
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/statistics", label: "Statistics", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-xl font-semibold">Modern Todo App</h1>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center justify-center h-9 w-9 rounded-md border transition-colors
                    ${
                      isActive
                        ? "border-primary-500 bg-primary-100 dark:bg-primary-900/30 text-primary-700"
                        : "border-border bg-background hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
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
      </div>
    </header>
  );
}
