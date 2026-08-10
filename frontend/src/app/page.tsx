"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { TaskCard, Task } from "@/components/tasks/task-card";
import { TaskModal } from "@/components/tasks/task-modal";
import { Plus } from "lucide-react";

const API_URL = "http://localhost:5000/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Check guest login & redirect inside component body
  useEffect(() => {
    const isGuest = localStorage.getItem("user_mode");
    if (!isGuest) {
      window.location.href = "/login";
    }
  }, []);

  // 2. Fetch tasks from NestJS Backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      const mappedTasks = res.data.map((t: any) => ({
        ...t,
        id: t._id || t.id,
      }));
      setTasks(mappedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 3. Create Task via API
  const handleCreateTask = async (taskData: Omit<Task, "id">) => {
    try {
      const res = await axios.post(API_URL, taskData);
      const createdTask = { ...res.data, id: res.data._id || res.data.id };
      setTasks((prev) => [createdTask, ...prev]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const columns = [
    { title: "To Do", status: "TODO" },
    { title: "In Progress", status: "IN_PROGRESS" },
    { title: "Completed", status: "COMPLETED" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      <main className="p-6 flex-1 max-w-7xl w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Board</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your project tasks live</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.status);

              return (
                <div
                  key={col.status}
                  className="bg-gray-100/60 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between px-1">
                    <h2 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                      {col.title}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {colTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}