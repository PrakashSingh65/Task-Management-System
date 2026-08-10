"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TaskCard, Task } from "@/components/tasks/task-card";
import { TaskDetailModal } from "@/components/tasks/task-detail-modal";
import {
  Search,
  Plus,
  Filter,
  Columns,
  List as ListIcon,
  LayoutGrid,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

const defaultTasks: Task[] = [
  { id: "1", title: "Write API Documentation", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment"], status: "TODO", priority: "High" },
  { id: "2", title: "Implement Search Function", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment"], status: "TODO", priority: "Low" },
  { id: "3", title: "Deploy to Production", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment"], status: "TODO", priority: "Medium" },
  { id: "4", title: "Code Review Completed", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment"], status: "DOING", priority: "High" },
  { id: "5", title: "Design Mockups Finalized", assignee: "Admin", dueDate: "29 Jul", tags: ["Deployment"], status: "DOING", priority: "Medium" },
  { id: "6", title: "Feature Testing Passed", assignee: "QA Team", dueDate: "30 Jul", tags: ["Testing"], status: "COMPLETED", priority: "High" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);

  // 1. New State for Search & Modal
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Fields Toggle State
  const [fields, setFields] = useState({
    priority: true,
    members: true,
    dueDate: true,
    labels: false,
    status: false,
    reporter: false,
  });

  useEffect(() => {
    const isGuest = localStorage.getItem("user_mode");
    if (!isGuest) {
      window.location.href = "/login";
    }
  }, []);

  const toggleField = (key: keyof typeof fields) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 2. Filter tasks based on Search Input
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { title: "To Do", status: "TODO" },
    { title: "Doing", status: "DOING" },
    { title: "Completed", status: "COMPLETED" },
    { title: "On Hold", status: "ON_HOLD" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex text-gray-900 dark:text-gray-100">
      <Sidebar />

      <main className="flex-1 flex flex-col p-6 overflow-x-auto relative">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-xl font-bold">Tasks</h1>

          <div className="flex items-center gap-2 relative flex-1 justify-end">
            {/* 3. Search Input Component */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks... (⌘F)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-xl text-xs bg-white dark:bg-gray-900 outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Fields Button with Popover */}
            <div className="relative">
              <button
                onClick={() => setIsFieldsOpen(!isFieldsOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Columns className="w-3.5 h-3.5 text-gray-500" />
                <span>Fields</span>
              </button>

              {isFieldsOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-2 text-xs">
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-1">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        viewMode === "list"
                          ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white"
                          : "text-gray-500"
                      }`}
                    >
                      <ListIcon className="w-3.5 h-3.5" />
                      List
                    </button>
                    <button
                      onClick={() => setViewMode("board")}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        viewMode === "board"
                          ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white"
                          : "text-gray-500"
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Board
                    </button>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-gray-100 dark:border-gray-800">
                    {Object.entries(fields).map(([key, enabled]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between cursor-pointer capitalize py-0.5 text-gray-700 dark:text-gray-300"
                      >
                        <span>{key.replace(/([A-Z])/g, " $1")}</span>
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => toggleField(key as keyof typeof fields)}
                          className="rounded border-gray-300 text-black focus:ring-black dark:border-gray-700 dark:bg-gray-800"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-medium hover:opacity-90">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Dynamic View Toggle */}
        {viewMode === "board" ? (
          /* Board View */
          <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
            {columns.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.status);
              return (
                <div
                  key={col.status}
                  className="bg-gray-100/70 dark:bg-gray-900/50 p-3 rounded-2xl border border-gray-200/50 dark:border-gray-800 flex flex-col gap-3 min-h-[500px]"
                >
                  <div className="flex items-center justify-between px-1 py-1">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {col.title}
                    </span>
                    <Plus className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    {colTasks.map((task) => (
                      /* 4. Click Handler on Board Card */
                      <div key={task.id} onClick={() => setSelectedTask(task)} className="cursor-pointer">
                        <TaskCard task={task} />
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-medium">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View (Table Mode) */
          <div className="flex flex-col gap-6">
            {columns.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.status);
              return (
                <div key={col.status} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>{col.title}</span>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                          <th className="py-2.5 px-4 font-normal">Task</th>
                          {fields.priority && <th className="py-2.5 px-4 font-normal">Priority</th>}
                          {fields.members && <th className="py-2.5 px-4 font-normal">Members</th>}
                          {fields.dueDate && <th className="py-2.5 px-4 font-normal">Due Date</th>}
                          <th className="py-2.5 px-4 font-normal text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {colTasks.length > 0 ? (
                          colTasks.map((task) => (
                            /* 5. Click Handler on Table Row */
                            <tr
                              key={task.id}
                              onClick={() => setSelectedTask(task)}
                              className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 cursor-pointer"
                            >
                              <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                                {task.title}
                              </td>
                              {fields.priority && (
                                <td className="py-3 px-4">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                      task.priority === "High"
                                        ? "text-red-600 bg-red-50 dark:bg-red-950/50"
                                        : task.priority === "Medium"
                                        ? "text-orange-600 bg-orange-50 dark:bg-orange-950/50"
                                        : "text-blue-600 bg-blue-50 dark:bg-blue-950/50"
                                    }`}
                                  >
                                    📶 {task.priority || "Low"}
                                  </span>
                                </td>
                              )}
                              {fields.members && (
                                <td className="py-3 px-4">
                                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                                    {(task.assignee || "A")[0]}
                                  </div>
                                </td>
                              )}
                              {fields.dueDate && (
                                <td className="py-3 px-4 text-gray-500">
                                  {task.dueDate || "12 Sep 2026"}
                                </td>
                              )}
                              <td className="py-3 px-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-3 px-4 text-center text-gray-400">
                              No tasks in {col.title}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. Detail Modal Component Rendering */}
      <TaskDetailModal
        isOpen={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}