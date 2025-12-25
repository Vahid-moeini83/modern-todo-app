import { MainLayout } from "@/components/layout/main-layout";
import { AddTaskSection } from "@/components/modules/add-task";

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: "Add Task - Modern Todo App",
    description: "Add new tasks to your daily schedule",
  };
}

export default function AddTaskPage() {
  return (
    <MainLayout>
      <AddTaskSection />
    </MainLayout>
  );
}
