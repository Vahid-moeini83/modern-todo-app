import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Public Store - Global state management for the project
 * Using persist for localStorage storage
 */
export const usePublicStore = create(
  persist(
    (set, get) => ({
      // Theme Management
      theme: "light",
      setTheme: (theme) => set({ theme }),

      // Task Management - Tasks data structure: { "2024-12-17": [{ id: 1, title: "Task 1", description: "...", priority: "medium", completed: false }] }
      tasks: {},

      // Modal state
      isModalOpen: false,
      selectedDate: null,

      // Task Actions
      addTask: (date, task) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [date]: [
              ...(state.tasks[date] || []),
              {
                ...task,
                id: Date.now(),
                completed: false,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        })),

      toggleTask: (date, taskId) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [date]:
              state.tasks[date]?.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ) || [],
          },
        })),

      deleteTask: (date, taskId) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [date]:
              state.tasks[date]?.filter((task) => task.id !== taskId) || [],
          },
        })),

      // Modal Actions
      openModal: (date = null) =>
        set({ isModalOpen: true, selectedDate: date }),
      closeModal: () => set({ isModalOpen: false, selectedDate: null }),

      // Helper Functions
      getTasksForDate: (date) => {
        const state = get();
        return state.tasks[date] || [];
      },

      hasTasksForDate: (date) => {
        const state = get();
        return (state.tasks[date] || []).length > 0;
      },

      getTaskStatsByPriority: (date) => {
        const state = get();
        const tasks = state.tasks[date] || [];
        const stats = { low: 0, medium: 0, high: 0 };

        tasks.forEach((task) => {
          if (stats.hasOwnProperty(task.priority)) {
            stats[task.priority]++;
          }
        });

        return stats;
      },
    }),
    {
      name: "modern-todo-storage",
    }
  )
);
