import { MainLayout } from "@/components/layout/main-layout";
import { TodoSection } from "@/components/modules/todo";

/**
 * Home Page - Main project page
 * SSR-first approach
 */
export default function Home() {
  return (
    <MainLayout>
      <TodoSection />
    </MainLayout>
  );
}
