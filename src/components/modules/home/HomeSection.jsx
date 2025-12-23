"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const HomeSection = () => {
  const router = useRouter();

  return (
    <section className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Modern{" "}
            <span className="bg-linear-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              Todo App
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-12">
            Organize your daily tasks, track your progress, and boost your
            productivity with our intuitive task management system. Stay focused
            and achieve your goals efficiently.
          </p>

          {/* Main CTA */}
          <Button
            onClick={() => router.push("/add-task")}
            size="lg"
            className="flex items-center gap-2 mx-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
