"use client";

import { X, Flag, Calendar, Clock } from "lucide-react";
import Modal from "./Modal";
import { Button } from "../button";

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  const getPriorityConfig = (priority) => {
    const configs = {
      high: {
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/30",
      },
      medium: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      },
      low: {
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
      },
    };
    return configs[priority] || configs.medium;
  };

  const priorityConfig = getPriorityConfig(task.priority);

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const createdDateTime = formatDateTime(task.createdAt);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="md">
      <div className="space-y-6">
        {/* Task Title */}
        <div>
          <h3
            className={`text-xl md:text-2xl font-bold ${
              task.completed
                ? "text-foreground/60 line-through"
                : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
        </div>

        {/* Task Description */}
        {task.description && (
          <div>
            <label className="text-sm font-medium text-foreground/70 block mb-2">
              Description
            </label>
            <p
              className={`text-sm md:text-base text-foreground/80 leading-relaxed ${
                task.completed ? "line-through opacity-60" : ""
              }`}
            >
              {task.description}
            </p>
          </div>
        )}

        {/* Priority */}
        <div>
          <label className="text-sm font-medium text-foreground/70 block mb-2">
            Priority
          </label>
          <div
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${priorityConfig.bgColor} ${priorityConfig.color}`}
          >
            <Flag className="w-4 h-4" />
            <span className="capitalize">{task.priority} Priority</span>
          </div>
        </div>

        {/* Created Date & Time */}
        <div>
          <label className="text-sm font-medium text-foreground/70 block mb-2">
            Created
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Calendar className="w-4 h-4 text-foreground/50" />
              <span>{createdDateTime.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Clock className="w-4 h-4 text-foreground/50" />
              <span>{createdDateTime.time}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-foreground/70 block mb-2">
            Status
          </label>
          <div
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              task.completed
                ? "bg-success-600/10 text-success-600"
                : "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                task.completed ? "bg-success-600" : "bg-orange-600"
              }`}
            />
            <span>{task.completed ? "Completed" : "Pending"}</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-4 border-t border-border">
          <Button onClick={onClose} className="w-full" variant="outline">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
