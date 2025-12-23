"use client";

import { useState } from "react";
import { Calendar, Plus, Filter, Check, Trash2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { TaskModal } from "@/components/modules/todo";
import { usePublicStore } from "@/app/store/publicStore";

const DayDetailSection = ({ date }) => {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Use direct store selector for reactivity - این باعث میشه کامپوننت به تغییرات واکنش نشون بده
  const tasks = usePublicStore((state) => state.tasks);
  const openModal = usePublicStore((state) => state.openModal);
  const toggleTask = usePublicStore((state) => state.toggleTask);
  const deleteTask = usePublicStore((state) => state.deleteTask);

  // Get tasks for this specific date from the reactive tasks object
  const allTasks = tasks[date] || [];

  // Filter tasks based on priority
  const filteredTasks =
    priorityFilter === "all"
      ? allTasks
      : allTasks.filter((task) => task.priority === priorityFilter);

  // Calculate stats
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Priority stats
  const priorityStats = {
    high: allTasks.filter((t) => t.priority === "high").length,
    medium: allTasks.filter((t) => t.priority === "medium").length,
    low: allTasks.filter((t) => t.priority === "low").length,
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddTask = () => {
    openModal(date);
  };

  const handleToggleTask = (taskId) => {
    toggleTask(date, taskId);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(date, taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: {
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-200 dark:border-red-800",
      },
      medium: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        borderColor: "border-yellow-200 dark:border-yellow-800",
      },
      low: {
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        borderColor: "border-blue-200 dark:border-blue-800",
      },
    };
    return configs[priority] || configs.medium;
  };

  const filterOptions = [
    { value: "all", label: "All Tasks", count: totalTasks },
    { value: "high", label: "High Priority", count: priorityStats.high },
    { value: "medium", label: "Medium Priority", count: priorityStats.medium },
    { value: "low", label: "Low Priority", count: priorityStats.low },
  ];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          {/* Date Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-primary-700" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent leading-tight">
                {formatDateForDisplay(date)}
              </h1>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">
                {totalTasks}
              </div>
              <div className="text-sm text-foreground/70">Total Tasks</div>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedTasks}
              </div>
              <div className="text-sm text-foreground/70">Completed</div>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {pendingTasks}
              </div>
              <div className="text-sm text-foreground/70">Pending</div>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-700">
                {completionRate}%
              </div>
              <div className="text-sm text-foreground/70">Progress</div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    priorityFilter === option.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setPriorityFilter(option.value)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-3 h-3" />
                  {option.label}
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded-full text-xs">
                    {option.count}
                  </span>
                </Button>
              ))}
            </div>

            <Button onClick={handleAddTask} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-background border border-border rounded-xl shadow-sm p-8">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-foreground/30" />
                  <h3 className="text-lg font-medium text-foreground/70 mb-2">
                    {priorityFilter === "all"
                      ? "No tasks for this day"
                      : `No ${priorityFilter} priority tasks`}
                  </h3>
                  <p className="text-foreground/50">
                    {priorityFilter === "all"
                      ? `Start by adding your first task for ${formatDateForDisplay(
                          date
                        )}`
                      : `Try a different filter or add a new ${priorityFilter} priority task`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const priorityConfig = getPriorityConfig(task.priority);

                  return (
                    <div
                      key={task.id}
                      className={`
                        bg-background border rounded-xl shadow-sm p-6 transition-all duration-200
                        ${
                          task.completed
                            ? "opacity-75 bg-success-600/5 border-success-600/20"
                            : `${priorityConfig.borderColor} hover:shadow-md`
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className={`
                            shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                            ${
                              task.completed
                                ? "bg-success-600 border-success-600 text-white"
                                : "border-border hover:border-primary-500"
                            }
                          `}
                        >
                          {task.completed && <Check className="w-4 h-4" />}
                        </button>

                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3
                                className={`
                                text-lg font-semibold transition-all duration-200
                                ${
                                  task.completed
                                    ? "text-foreground/60 line-through"
                                    : "text-foreground"
                                }
                              `}
                              >
                                {task.title}
                              </h3>

                              {task.description && (
                                <p
                                  className={`
                                  text-foreground/70 mt-2 transition-all duration-200
                                  ${
                                    task.completed
                                      ? "line-through opacity-60"
                                      : ""
                                  }
                                `}
                                >
                                  {task.description}
                                </p>
                              )}

                              <div className="flex items-center gap-4 mt-3">
                                {/* Priority Badge */}
                                <div
                                  className={`
                                  inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                                  ${priorityConfig.bgColor} ${priorityConfig.color}
                                `}
                                >
                                  <Flag className="w-3 h-3" />
                                  {task.priority} priority
                                </div>

                                {/* Created Date */}
                                <span className="text-xs text-foreground/50">
                                  Created:{" "}
                                  {new Date(task.createdAt).toLocaleDateString(
                                    "en-US"
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(task)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Chart */}
            <div className="bg-background border border-border rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">
                    Completion Rate
                  </span>
                  <span className="font-semibold text-foreground">
                    {completionRate}%
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div
                    className="bg-primary-700 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-background border border-border rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Priority Breakdown
              </h3>
              <div className="space-y-3">
                {["high", "medium", "low"].map((priority) => {
                  const count = priorityStats[priority];
                  const config = getPriorityConfig(priority);

                  return (
                    <div
                      key={priority}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${config.bgColor
                            .replace("bg-", "bg-")
                            .replace("/30", "")}`}
                        />
                        <span className="text-foreground/70 capitalize">
                          {priority}
                        </span>
                      </div>
                      <span className={`font-semibold ${config.color}`}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
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

      {/* Task Modal */}
      <TaskModal hideViewDayButton={true} />
    </section>
  );
};

export default DayDetailSection;
