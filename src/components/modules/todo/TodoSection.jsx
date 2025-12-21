"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Calendar from "./Calendar";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import { usePublicStore } from "@/app/store/publicStore";

const TodoSection = () => {
  const { openModal, getTasksForDate } = usePublicStore();
  const [selectedDateForView, setSelectedDateForView] = useState(null);

  // Handle day click from calendar for viewing tasks
  const handleDaySelect = (date) => {
    setSelectedDateForView(date);
  };

  const selectedTasks = selectedDateForView
    ? getTasksForDate(selectedDateForView)
    : [];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Daily Task Management
          </h1>
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Plan your tasks for each day and track your progress efficiently
          </p>

          {/* Add Task Button */}
          <Button
            onClick={() => openModal()}
            className="flex items-center gap-2 mx-auto"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </Button>
        </div>

        {/* Calendar Component */}
        <div className="mb-6 md:mb-8">
          <Calendar onDaySelect={handleDaySelect} />
        </div>

        {/* Task Stats Component */}
        <div className="mb-4 md:mb-6">
          <TaskStats selectedDate={selectedDateForView} tasks={selectedTasks} />
        </div>

        {/* Task List Component */}
        <div className="max-w-4xl mx-auto">
          <TaskList selectedDate={selectedDateForView} tasks={selectedTasks} />
        </div>

        {/* Task Modal */}
        <TaskModal />
      </div>
    </section>
  );
};

export default TodoSection;
