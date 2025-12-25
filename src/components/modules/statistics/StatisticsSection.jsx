"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  Calendar,
  Flag,
  ArrowUpDown,
} from "lucide-react";
import { usePublicStore } from "@/app/store/publicStore";
import { Button } from "@/components/ui/button";

const StatisticsSection = () => {
  const { tasks } = usePublicStore();
  const [sortOrder, setSortOrder] = useState("desc"); // desc = newest first, asc = oldest first

  // Calculate overall statistics
  const allTasks = Object.values(tasks).flat();
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Priority statistics
  const priorityStats = {
    high: allTasks.filter((t) => t.priority === "high").length,
    medium: allTasks.filter((t) => t.priority === "medium").length,
    low: allTasks.filter((t) => t.priority === "low").length,
  };

  const completedByPriority = {
    high: allTasks.filter((t) => t.priority === "high" && t.completed).length,
    medium: allTasks.filter((t) => t.priority === "medium" && t.completed)
      .length,
    low: allTasks.filter((t) => t.priority === "low" && t.completed).length,
  };

  // Days with tasks
  const daysWithTasks = Object.keys(tasks).filter(
    (date) => tasks[date].length > 0
  ).length;

  // Most productive day
  const mostProductiveDay = Object.entries(tasks).reduce(
    (max, [date, dayTasks]) => {
      const completed = dayTasks.filter((t) => t.completed).length;
      return completed > max.count ? { date, count: completed } : max;
    },
    { date: null, count: 0 }
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const mainStats = [
    {
      icon: ListTodo,
      label: "Total Tasks",
      value: totalTasks,
      color: "text-primary-700",
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
    },
    {
      icon: CheckCircle2,
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
      icon: Calendar,
      label: "Active Days",
      value: daysWithTasks,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  const priorityConfig = {
    low: {
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      progressColor: "bg-blue-600 dark:bg-blue-500",
      label: "Low Priority",
    },
    medium: {
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      progressColor: "bg-yellow-600 dark:bg-yellow-500",
      label: "Medium Priority",
    },
    high: {
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      progressColor: "bg-red-600 dark:bg-red-500",
      label: "High Priority",
    },
  };

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Task Statistics
          </h1>
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
            Track your productivity and task completion metrics
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-8">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-background border border-border rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-foreground/70">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Overall Progress */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary-700" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Overall Progress
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-foreground/80 font-medium">
                  Completion Rate
                </span>
                <span className="text-2xl font-bold text-primary-700">
                  {completionRate}%
                </span>
              </div>

              <div className="w-full bg-border rounded-full h-6 overflow-hidden">
                <div
                  className="bg-linear-to-r from-primary-700 to-primary-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${completionRate}%` }}
                >
                  {completionRate > 15 && (
                    <span className="text-sm font-bold text-white drop-shadow-sm">
                      {completionRate}%
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {completedTasks}
                  </div>
                  <div className="text-sm text-foreground/70">Done</div>
                </div>
                <div className="text-center p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {pendingTasks}
                  </div>
                  <div className="text-sm text-foreground/70">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Days List */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Active Days
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                }
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="w-4 h-4" />
                {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-foreground/70 mb-4">
                {daysWithTasks} {daysWithTasks === 1 ? "day" : "days"} with
                scheduled tasks
              </div>

              {daysWithTasks > 0 ? (
                <div className="max-h-[220px] overflow-y-auto space-y-2 pr-2">
                  {Object.keys(tasks)
                    .filter((date) => tasks[date].length > 0)
                    .sort((a, b) =>
                      sortOrder === "desc"
                        ? new Date(b) - new Date(a)
                        : new Date(a) - new Date(b)
                    )
                    .map((date) => {
                      const dayTasks = tasks[date];
                      const completedCount = dayTasks.filter(
                        (t) => t.completed
                      ).length;
                      const dateObj = new Date(date);
                      const formattedDate = dateObj.toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      );

                      return (
                        <a
                          key={date}
                          href={`/day/${date}`}
                          className="block p-3 bg-background hover:bg-primary-100 dark:hover:bg-primary-900/30 border border-border hover:border-primary-500 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-foreground">
                                {formattedDate}
                              </div>
                              <div className="text-xs text-foreground/60 mt-1">
                                {dayTasks.length}{" "}
                                {dayTasks.length === 1 ? "task" : "tasks"} •{" "}
                                {completedCount} completed
                              </div>
                            </div>
                            <div className="text-xs font-medium text-primary-700">
                              View →
                            </div>
                          </div>
                        </a>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-foreground/30" />
                  <p className="text-sm text-foreground/60">
                    No active days yet. Start adding tasks!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-background border border-border rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Flag className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Priority Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(priorityConfig).map(([priority, config]) => {
              const total = priorityStats[priority];
              const completed = completedByPriority[priority];
              const completionPercent =
                total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div
                  key={priority}
                  className={`${config.bgColor} border-2 border-current ${config.color} rounded-xl p-6`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Flag className={`w-5 h-5 ${config.color}`} />
                    <h3 className={`text-lg font-bold ${config.color}`}>
                      {config.label}
                    </h3>
                  </div>

                  {total === 0 ? (
                    // Empty state when no tasks
                    <div className="py-8 text-center">
                      <p className="text-sm text-foreground/60 ">
                        No tasks for this priority
                      </p>
                    </div>
                  ) : (
                    // Stats when tasks exist
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground/70">
                          Total
                        </span>
                        <span className={`text-xl font-bold ${config.color}`}>
                          {total}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground/70">
                          Completed
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          {completed}
                        </span>
                      </div>

                      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${config.progressColor}`}
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>

                      <div className="text-center">
                        <span
                          className={`text-sm flex items-center justify-center gap-2 font-medium ${config.color}`}
                        >
                          {completionPercent}% Complete{" "}
                          {completionPercent === 100 ? (
                            <CheckCircle2 color="green" />
                          ) : null}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
