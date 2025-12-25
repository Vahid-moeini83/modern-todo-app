"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Trash2,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { usePublicStore } from "@/app/store/publicStore";

const HomeSection = () => {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask } = usePublicStore();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Get today's tasks
  const todayTasks = tasks[todayStr] || [];
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const pendingToday = todayTasks.length - completedToday;

  const formatTodayDate = () => {
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleToggleTask = (taskId) => {
    const task = todayTasks.find((t) => t.id === taskId);
    toggleTask(todayStr, taskId);

    if (task) {
      if (!task.completed) {
        toast.success("Task completed!");

        // Check if all tasks are completed
        const updatedTasks = todayTasks.map((t) =>
          t.id === taskId ? { ...t, completed: true } : t
        );
        const allCompleted = updatedTasks.every((t) => t.completed);

        if (allCompleted && updatedTasks.length > 0) {
          setTimeout(() => {
            toast.success("All tasks completed!");
          }, 500);
        }
      } else {
        toast("Task marked as incomplete");
      }
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(todayStr, taskToDelete.id);
      toast.error("Task deleted!");
      setTaskToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  return (
    <section className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center py-6 md:py-12">
      <div className="container mx-auto px-3 md:px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
            Modern{" "}
            <span className="bg-linear-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              Todo App
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 px-2">
            Organize your daily tasks, track your progress, and boost your
            productivity with our intuitive task management system. Stay focused
            and achieve your goals efficiently.
          </p>

          {/* Main CTA */}
          <Button
            onClick={() => router.push("/add-task")}
            size="lg"
            className="flex items-center gap-2 mx-auto text-base md:text-lg px-6 py-5 md:px-8 md:py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Manage your tasks
          </Button>
        </div>

        {/* Today's Tasks Box */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-background border border-border rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
                <div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                    Today's Tasks
                  </h2>
                  <p className="text-xs md:text-sm text-foreground/60 mt-0.5 md:mt-1">
                    {formatTodayDate()}
                  </p>
                </div>
              </div>
            </div>

            {todayTasks.length === 0 ? (
              <div className="text-center py-6 md:py-8">
                <Calendar className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 text-foreground/30" />
                <p className="text-sm md:text-base text-foreground/60 mb-3 md:mb-4">
                  No tasks scheduled for today
                </p>
                <Button
                  onClick={() => router.push("/add-task")}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Add Task for Today
                </Button>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2 md:p-3 text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary-700">
                      {todayTasks.length}
                    </div>
                    <div className="text-xs text-foreground/70">Total</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 md:p-3 text-center">
                    <div className="text-xl md:text-2xl font-bold text-green-600">
                      {completedToday}
                    </div>
                    <div className="text-xs text-foreground/70">Done</div>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2 md:p-3 text-center">
                    <div className="text-xl md:text-2xl font-bold text-orange-600">
                      {pendingToday}
                    </div>
                    <div className="text-xs text-foreground/70">Pending</div>
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg border transition-all duration-200 ${
                        task.completed
                          ? "bg-success-600/5 border-success-600/20"
                          : "bg-background border-border hover:border-primary-500"
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.completed
                            ? "bg-success-600 border-success-600 text-white"
                            : "border-border hover:border-primary-500"
                        }`}
                      >
                        {task.completed && <Check className="w-3 h-3" />}
                      </button>

                      {/* Task Title */}
                      <span
                        className={`flex-1 text-sm ${
                          task.completed
                            ? "text-foreground/60 line-through"
                            : "text-foreground"
                        }`}
                      >
                        {task.title}
                      </span>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(task)}
                        className="shrink-0 p-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* View Day Button */}
                <Button
                  onClick={() => router.push(`/day/${todayStr}`)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  View Today's Tasks
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this task?"
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </section>
  );
};

export default HomeSection;
