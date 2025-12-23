import { MainLayout } from "@/components/layout/main-layout";
import { HomeSection } from "@/components/modules/home";

/**
 * Home Page - Main landing page
 * SSR-first approach
 */
export default function Home() {
  return (
    <MainLayout>
      <HomeSection />
    </MainLayout>
  );
}
