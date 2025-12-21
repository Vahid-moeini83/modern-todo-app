'use client';

import { Header } from '../header';
import { Footer } from '../footer';

/**
 * MainLayout - ساختار اصلی layout پروژه
 */
export function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

