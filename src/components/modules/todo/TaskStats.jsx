"use client";

import { CheckCircle, Clock, Flag, Calendar } from "lucide-react";
import { usePublicStore } from "@/app/store/publicStore";

const TaskStats = ({ selectedDate, tasks }) => {
  if (!selectedDate || tasks.length === 0) {
    return null;
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);

  const priorityStats = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    {
      icon: Calendar,
      label: "Total Tasks",
      value: tasks.length,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: completedTasks,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: Clock,
      label: "Pending",
      value: pendingTasks,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      icon: Flag,
      label: "High Priority",
      value: priorityStats.high || 0,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="w-full mx-auto mb-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-foreground/70">
            {completionRate}% Complete
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border border-border transition-all duration-200
              hover:border-primary-500 ${stat.bgColor}
            `}
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-xs text-foreground/70 font-medium">
                  {stat.label}
                </p>
                <p className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStats;
