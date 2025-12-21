"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicStore } from "@/app/store/publicStore";

const Calendar = ({ onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState("");
  const { hasTasksForDate, getTaskStatsByPriority, openModal } =
    usePublicStore();

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
    setAnimationDirection(
      direction > 0 ? "calendar-slide-right" : "calendar-slide-left"
    );
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });

    // Reset animation after it completes
    setTimeout(() => setAnimationDirection(""), 400);
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateStr = formatDate(selectedDate);

    // Call onDaySelect if provided (for viewing tasks)
    if (onDaySelect) {
      onDaySelect(dateStr);
    }

    // Open modal for adding task
    openModal(dateStr);
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full mx-auto bg-linear-to-br from-background to-primary-100/20 dark:to-primary-900/10 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm p-6 md:p-10">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          className="hover:bg-primary-100 dark:hover:bg-primary-900 h-12 w-12 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
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
          className="hover:bg-primary-100 dark:hover:bg-primary-900 h-12 w-12 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-6">
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
      <div
        className={`grid grid-cols-7 gap-2 md:gap-4 min-h-[300px] md:min-h-[400px] lg:min-h-[480px] ${animationDirection}`}
      >
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-12 md:h-16 lg:h-20" />;
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
              key={day}
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

              {/* Priority Task Indicators */}
              {hasTasks && (
                <div className="absolute bottom-1 left-1 right-1 flex gap-0.5 md:gap-1 justify-center">
                  {["high", "medium", "low"].map((priority) => {
                    const count = taskStats[priority];
                    if (count === 0) return null;

                    const config = priorityConfig[priority];
                    return (
                      <div
                        key={priority}
                        className={`
                          ${config.bg} ${config.text} 
                          text-xs font-bold rounded-full 
                          w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6
                          flex items-center justify-center 
                          shadow-md transition-all duration-200
                          hover:scale-110 border border-white/20
                          ${todayClass ? "ring-1 ring-white/50" : ""}
                        `}
                        title={`${count} ${priority} priority task${
                          count > 1 ? "s" : ""
                        }`}
                      >
                        <span className="text-xs lg:text-sm">{count}</span>
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
  );
};

export default Calendar;
