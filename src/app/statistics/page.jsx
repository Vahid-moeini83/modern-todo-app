import { MainLayout } from "@/components/layout/main-layout";
import { StatisticsSection } from "@/components/modules/statistics";

export async function generateMetadata() {
  return {
    title: "Statistics - Modern Todo App",
    description: "View your task statistics and productivity metrics",
  };
}

export default function StatisticsPage() {
  return (
    <MainLayout>
      <StatisticsSection />
    </MainLayout>
  );
}
