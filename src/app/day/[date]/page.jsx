import { MainLayout } from "@/components/layout/main-layout";
import { DayDetailSection } from "@/components/modules/day";

// Generate metadata for the page
// export async function generateMetadata({ params }) {
//   const date = params.date;
//   const formattedDate = new Date(date).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return {
//     title: `Tasks for ${formattedDate} - Modern Todo App`,
//     description: `View and manage your tasks for ${formattedDate}`,
//   };
// }

export default async function DayDetailPage({ params }) {
  params = await params;

  return (
    <MainLayout>
      <DayDetailSection date={params?.date} />
    </MainLayout>
  );
}
