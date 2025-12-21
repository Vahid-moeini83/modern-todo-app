"use client";

import { useState } from "react";
import { Check, Trash2, Calendar as CalendarIcon, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicStore } from "@/app/store/publicStore";

const TaskList = ({ selectedDate, tasks }) => {
  const { toggleTask, deleteTask } = usePublicStore();

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: {
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        label: "Low",
      },
      medium: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        label: "Medium",
      },
      high: {
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        label: "High",
      },
    };
    return configs[priority] || configs.medium;
  };

  // Sort tasks by priority (high -> medium -> low) and then by completion status
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Incomplete tasks first
    }
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (!selectedDate || tasks.length === 0) {
    return (
      <div className="text-center py-8 text-foreground/60">
        <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Select a day from the calendar to view its tasks</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background border border-border rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <CalendarIcon className="w-5 h-5 text-primary-700" />
        <h3 className="text-lg font-semibold text-foreground">
          Tasks for {formatDateForDisplay(selectedDate)}
        </h3>
        <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-500 px-2 py-1 rounded-full text-sm">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {sortedTasks.map((task) => {
          const priorityConfig = getPriorityConfig(task.priority);
          return (
            <div
              key={task.id}
              className={`
              p-4 rounded-lg border transition-all duration-200
              ${
                task.completed
                  ? "bg-success-600/10 border-success-600/30"
                  : "bg-background border-border hover:border-primary-500"
              }
            `}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(selectedDate, task.id)}
                  className={`
                  shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                  ${
                    task.completed
                      ? "bg-success-600 border-success-600 text-white"
                      : "border-border hover:border-primary-500"
                  }
                `}
                >
                  {task.completed && <Check className="w-3 h-3" />}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={`
                    font-medium transition-all duration-200
                    ${
                      task.completed
                        ? "text-foreground/60 line-through"
                        : "text-foreground"
                    }
                  `}
                    >
                      {task.title}
                    </h4>

                    {/* Priority Badge */}
                    <span
                      className={`
                    inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                    ${priorityConfig.bgColor} ${priorityConfig.color}
                  `}
                    >
                      <Flag className="w-3 h-3" />
                      {priorityConfig.label}
                    </span>
                  </div>

                  {task.description && (
                    <p
                      className={`
                    text-sm mt-1 transition-all duration-200
                    ${
                      task.completed
                        ? "text-foreground/40 line-through"
                        : "text-foreground/70"
                    }
                  `}
                    >
                      {task.description}
                    </p>
                  )}

                  <p className="text-xs text-foreground/50 mt-2">
                    Created:{" "}
                    {new Date(task.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(selectedDate, task.id)}
                  className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
