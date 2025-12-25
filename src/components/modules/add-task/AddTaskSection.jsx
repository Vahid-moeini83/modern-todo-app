"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Calendar as CalendarIcon, Plus, Flag, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Calendar } from "@/components/modules/todo";
import { usePublicStore } from "@/app/store/publicStore";

const AddTaskSection = () => {
  const router = useRouter();
  const { addTask } = usePublicStore();
  const [showManualForm, setShowManualForm] = useState(false);
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

  const handleManualAdd = () => {
    setShowManualForm(true);
    setFormData({
      title: "",
      description: "",
      date: formatDateForInput(),
      priority: "medium",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date) return;

    const task = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    };

    addTask(formData.date, task);

    // Show success toast
    toast.success("Task added successfully!");

    // Navigate to day page
    router.push(`/day/${formData.date}`);
  };

  const handleCancel = () => {
    setShowManualForm(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      priority: "medium",
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
    <section className="w-full py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-3 md:px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Add New Task
          </h1>
          <p className="text-foreground/70 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Select a date from the calendar or add a task manually
          </p>
        </div>

        {/* Manual Add Button */}
        <div className="mb-6 md:mb-8 text-center">
          <Button
            onClick={handleManualAdd}
            className="flex items-center gap-2 mx-auto"
            size="lg"
          >
            <Edit3 className="w-4 h-4 md:w-5 md:h-5" />
            Add Task Manually
          </Button>
        </div>

        {/* Manual Add Form */}
        {showManualForm && (
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="bg-background border border-border rounded-xl shadow-sm p-4 md:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Date
                  </label>
                  <DatePicker
                    value={formData.date}
                    onChange={(date) => handleInputChange("date", date)}
                    placeholder="Select date..."
                  />
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
                        onClick={() =>
                          handleInputChange("priority", option.value)
                        }
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
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 flex items-center gap-2"
                    disabled={!formData.title.trim() || !formData.date}
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Calendar Component */}
        <div>
          <Calendar />
        </div>
      </div>
    </section>
  );
};

export default AddTaskSection;
