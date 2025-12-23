"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Plus, Flag, Eye } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { usePublicStore } from "@/app/store/publicStore";

const TaskModal = ({ hideViewDayButton = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isModalOpen, selectedDate, closeModal, addTask, hasTasksForDate } =
    usePublicStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "medium",
  });

  const formatDateForInput = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isModalOpen) {
      setFormData({
        title: "",
        description: "",
        date: selectedDate || formatDateForInput(),
        priority: "medium",
      });
    }
  }, [isModalOpen, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const task = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    };

    // Add task to store (will be persisted to localStorage automatically)
    addTask(formData.date, task);

    // Close modal
    closeModal();

    // Check if we're already on a day page
    const isOnDayPage = pathname?.startsWith("/day/");
    const currentDayPage = pathname?.replace("/day/", "");

    if (isOnDayPage && currentDayPage === formData.date) {
      // We're already on the correct day page, no need to navigate
      // The page will update automatically due to Zustand reactivity
      return;
    }

    // Navigate to the day page for the task's date
    router.push(`/day/${formData.date}`);
  };

  const handleViewDay = () => {
    const targetDate = selectedDate || formData.date;
    closeModal();
    router.push(`/day/${targetDate}`);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const priorityOptions = [
    {
      value: "low",
      label: "Low Priority",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      value: "medium",
      label: "Medium Priority",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      value: "high",
      label: "High Priority",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Add New Task"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Display/Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Date
          </label>

          {selectedDate ? (
            // Fixed date (when clicked on calendar day)
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg border border-primary-500">
              <span className="text-sm text-foreground">
                {formatDateForDisplay(selectedDate)}
              </span>
            </div>
          ) : (
            // Date picker (when clicked on add button)
            <DatePicker
              value={formData.date}
              onChange={(date) => handleInputChange("date", date)}
              placeholder="Select date..."
            />
          )}
        </div>

        {/* Task Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium text-foreground"
          >
            Task Title *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your task title..."
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full"
            required
          />
        </div>

        {/* Priority Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange("priority", option.value)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                  ${
                    formData.priority === option.value
                      ? `border-current ${option.color} ${option.bgColor}`
                      : "border-border hover:border-primary-500 bg-background"
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  <Flag
                    className={`w-4 h-4 ${
                      formData.priority === option.value
                        ? option.color
                        : "text-foreground/50"
                    }`}
                  />
                  <span
                    className={
                      formData.priority === option.value
                        ? option.color
                        : "text-foreground"
                    }
                  >
                    {option.label.split(" ")[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Task Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            placeholder="Enter task description..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            rows={4}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1 flex items-center gap-2"
              disabled={!formData.title.trim()}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
          {/* View Day Button - Show only if date has tasks and not hidden by prop */}
          {!hideViewDayButton &&
            hasTasksForDate(selectedDate || formData.date) && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleViewDay}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Day
              </Button>
            )}
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
