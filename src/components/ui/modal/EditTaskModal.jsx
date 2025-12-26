"use client";

import { useState, useEffect } from "react";
import { Flag } from "lucide-react";
import Modal from "./Modal";
import { Button } from "../button";
import { Input } from "../input";

const EditTaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
      });
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...task,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    });

    onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <div className="space-y-2">
          <label
            htmlFor="edit-title"
            className="text-sm font-medium text-foreground"
          >
            Task Title *
          </label>
          <Input
            id="edit-title"
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
            htmlFor="edit-description"
            className="text-sm font-medium text-foreground"
          >
            Description (Optional)
          </label>
          <textarea
            id="edit-description"
            placeholder="Enter task description..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            rows={4}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={!formData.title.trim()}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
