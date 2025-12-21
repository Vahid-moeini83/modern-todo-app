'use client';

/**
 * Footer - فوتر اصلی پروژه
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex h-16 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Modern Todo App. Developed by Vahid Moeini.
        </p>
      </div>
    </footer>
  );
}

