"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePublicStore } from "@/app/store/publicStore";

const Calendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { hasTasksForDate, getTaskStatsByPriority } = usePublicStore();

  // Helper functions
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // Convert to standard calendar day (Sunday = 0)
    return firstDay.getDay();
  };

  const isToday = (date, day) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateStr = formatDate(selectedDate);

    // Navigate to day detail page
    router.push(`/day/${dateStr}`);
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, index: i });
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ day, index: firstDayOfMonth + day - 1 });
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Priority Legend */}
      <div className="bg-white dark:bg-gray-800 border border-border/50 rounded-xl shadow-sm p-4 md:p-6">
        <h3 className="text-sm md:text-base font-semibold text-foreground/80 mb-3">
          Task Priority Legend
        </h3>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded-full shadow-sm"></div>
            <span className="text-xs md:text-sm text-foreground/70">
              High Priority Tasks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-600 rounded-full shadow-sm"></div>
            <span className="text-xs md:text-sm text-foreground/70">
              Medium Priority Tasks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded-full shadow-sm"></div>
            <span className="text-xs md:text-sm text-foreground/70">
              Low Priority Tasks
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="bg-linear-to-br from-background to-primary-100/20 dark:to-primary-900/10 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm p-3 sm:p-6 md:p-10">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(-1)}
            className="hover:bg-primary-100 dark:hover:bg-primary-900 sm:h-12 w-10 h-10 sm:w-12 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="sm:w-6 sm:h-6 w-4 h-4" />
          </Button>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              {getMonthName(currentDate)}
            </h2>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(1)}
            className="hover:bg-primary-100 dark:hover:bg-primary-900 sm:h-12 w-10 h-10 sm:w-12 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
          >
            <ChevronRight className="sm:w-6 sm:h-6 w-4 h-4" />
          </Button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 md:gap-4 mb-2 md:mb-6">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-12 md:h-14 flex items-center justify-center text-sm md:text-base font-semibold text-foreground/80 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid - Fixed height to prevent jumping */}
        <div className="grid grid-cols-7 gap-1 md:gap-4 min-h-[300px] md:min-h-[400px] lg:min-h-[480px]">
          {days.map((dayObj) => {
            const { day, index } = dayObj;

            if (day === null) {
              return (
                <div key={`empty-${index}`} className="h-12 md:h-16 lg:h-20" />
              );
            }

            const dateStr = formatDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            );
            const hasTasks = hasTasksForDate(dateStr);
            const taskStats = getTaskStatsByPriority(dateStr);
            const todayClass = isToday(currentDate, day);

            // Priority colors configuration
            const priorityConfig = {
              high: { bg: "bg-red-600", text: "text-white" },
              medium: { bg: "bg-yellow-600", text: "text-white" },
              low: { bg: "bg-blue-600", text: "text-white" },
            };

            return (
              <button
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`}
                onClick={() => handleDayClick(day)}
                className={`
                h-12 md:h-16 lg:h-20 rounded-xl border-2 transition-all duration-300 relative
                hover:shadow-lg hover:scale-105 hover:-translate-y-1
                focus:outline-none focus:ring-4 focus:ring-primary-500/30
                ${
                  todayClass
                    ? "bg-linear-to-br from-orange-400 to-red-500 text-white border-orange-500 shadow-xl ring-4 ring-orange-200 dark:ring-orange-800"
                    : "bg-white dark:bg-gray-800 border-border hover:border-primary-300 dark:hover:border-primary-600 text-foreground shadow-sm"
                }
                ${
                  hasTasks && !todayClass
                    ? "bg-linear-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-300 dark:border-primary-600"
                    : ""
                }
              `}
              >
                <span
                  className={`text-sm md:text-base lg:text-lg font-semibold ${
                    todayClass ? "drop-shadow-sm" : ""
                  }`}
                >
                  {day}
                </span>

                {/* Priority Task Indicators - Responsive Layout */}
                {hasTasks && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex flex-row gap-0.5 md:flex-col md:left-1 md:translate-x-0 md:gap-1">
                    {["high", "medium", "low"].map((priority) => {
                      const count = taskStats[priority];
                      if (count === 0) return null;

                      const config = priorityConfig[priority];
                      return (
                        <div
                          key={priority}
                          className={`
                          ${config.bg} ${config.text} 
                          rounded-full shadow-sm transition-all duration-200
                          hover:scale-110 border border-white/20
                          ${todayClass ? "ring-1 ring-white/50" : ""}
                          
                          // Mobile: Horizontal dots
                          w-2 h-2 
                          // Medium: Vertical with count
                          md:w-4 md:h-4 lg:w-5 lg:h-5
                          md:flex md:items-center md:justify-center
                        `}
                          title={`${count} ${priority} priority task${
                            count > 1 ? "s" : ""
                          }`}
                        >
                          {/* Show count only on medium screens and up */}
                          <span className="hidden md:block text-xs lg:text-sm font-bold">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
