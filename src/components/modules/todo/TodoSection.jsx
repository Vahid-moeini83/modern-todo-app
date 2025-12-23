"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Calendar from "./Calendar";
import TaskModal from "./TaskModal";
import { usePublicStore } from "@/app/store/publicStore";

const TodoSection = () => {
  const { openModal, tasks } = usePublicStore();

  // Calculate overall statistics
  const allTasks = Object.values(tasks).flat();
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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

        {/* Overall Statistics */}
        <div className="mb-8">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
              Overall Progress
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700 rounded-lg p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-700">
                  {totalTasks}
                </div>
                <div className="text-sm md:text-base text-foreground/70 mt-1">
                  Total Tasks
                </div>
              </div>

              <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {completedTasks}
                </div>
                <div className="text-sm md:text-base text-foreground/70 mt-1">
                  Completed
                </div>
              </div>

              <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600">
                  {pendingTasks}
                </div>
                <div className="text-sm md:text-base text-foreground/70 mt-1">
                  Pending
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base font-medium text-foreground/80">
                  Completion Rate
                </span>
                <span className="text-lg md:text-xl font-bold text-primary-700">
                  {completionRate}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-4 md:h-5 overflow-hidden">
                <div
                  className="bg-linear-to-r from-primary-700 to-primary-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${completionRate}%` }}
                >
                  {completionRate > 10 && (
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {completionRate}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Component */}
        <div className="mb-6 md:mb-8">
          <Calendar />
        </div>

        {/* Task Modal */}
        <TaskModal />
      </div>
    </section>
  );
};

export default TodoSection;
