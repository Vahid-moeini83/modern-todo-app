import { MainLayout } from "@/components/layout/main-layout";
import { StatisticsSection } from "@/components/modules/statistics";

/**
 * Statistics Page - صفحه آمار کلی
 * SSR-first approach
 */
export default function StatisticsPage() {
  return (
    <MainLayout>
      <StatisticsSection />
    </MainLayout>
  );
}

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: "Statistics - Modern Todo App",
    description: "View your task statistics and productivity metrics",
  };
}
