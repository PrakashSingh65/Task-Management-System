"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "@/components/layout/sidebar";
import { TaskCard, Task } from "@/components/tasks/task-card";
import { Search, SlidersHorizontal, Plus, Filter, Columns } from "lucide-react";

const API_URL = "http://localhost:5000/tasks";

// Fallback dummy data image match ke liye
const defaultTasks: Task[] = [
  { id: "1", title: "Write API Documentation", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment", "Deployment"], status: "TODO" },
  { id: "2", title: "Implement Search Function", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment", "Deployment"], status: "TODO" },
  { id: "3", title: "Deploy to Production", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment", "Deployment"], status: "TODO" },
  { id: "4", title: "Code Review Completed", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment", "Deployment"], status: "DOING" },
  { id: "5", title: "Design Mockups Finalized", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment", "Deployment"], status: "DOING" },
  { id: "6", title: "Feature Testing Passed", assignee: "QA Team", dueDate: "30 Jul", tags: ["Testing", "Passed"], status: "COMPLETED" },
  { id: "7", title: "UI Design Updated", assignee: "Designer", dueDate: "31 Jul", tags: ["Design", "Updated"], status: "COMPLETED" },
  { id: "8", title: "Security Audit Scheduled", assignee: "Security", dueDate: "01 Aug", tags: ["Audit", "Scheduled"], status: "COMPLETED" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  useEffect(() => {
    const isGuest = localStorage.getItem("user_mode");
    if (!isGuest) {
      window.location.href = "/login";
    }
  }, []);

  const columns = [
    { title: "To Do", status: "TODO" },
    { title: "Doing", status: "DOING" },
    { title: "Completed", status: "COMPLETED" },
    { title: "On Hold", status: "ON_HOLD" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 overflow-x-auto">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Tasks</h1>

          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search className="w-4 h-4 text-gray-500" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              <Columns className="w-3.5 h-3.5 text-gray-500" />
              <span>Fields</span>
            </button>
            <button className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-medium hover:opacity-90">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Board Grid Columns */}
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.status);

            return (
              <div
                key={col.status}
                className="bg-gray-100/70 dark:bg-gray-900/50 p-3 rounded-2xl border border-gray-200/50 dark:border-gray-800 flex flex-col gap-3 min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1 py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {col.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>

                {/* Cards List */}
                <div className="flex flex-col gap-3 flex-1">
                  {colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>

                {/* Bottom Add Task Button */}
                <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}