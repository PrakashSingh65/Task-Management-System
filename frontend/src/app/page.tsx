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
  ChevronRight,
  Circle,
  BarChart2,
  Users,
  Calendar,
  Tag,
  UserCheck,
  Check,
} from "lucide-react";

const defaultTasks: Task[] = [
  { id: "1", title: "Design Homepage", assignee: "Admin", dueDate: "12 Sep 2026", tags: ["Design"], status: "TODO", priority: "High" },
  { id: "2", title: "Develop Login Feature", assignee: "CN", dueDate: "15 Sep 2026", tags: ["Development"], status: "TODO", priority: "Low" },
  { id: "3", title: "Test Payment Gateway", assignee: "QA", dueDate: "18 Sep 2026", tags: ["Testing"], status: "TODO", priority: "Medium" },
  { id: "4", title: "Design Homepage", assignee: "Admin", dueDate: "12 Sep 2026", tags: ["Design"], status: "DOING", priority: "High" },
  { id: "5", title: "Develop Login Feature", assignee: "CN", dueDate: "15 Sep 2026", tags: ["Development"], status: "DOING", priority: "Low" },
  { id: "6", title: "Test Payment Gateway", assignee: "QA", dueDate: "18 Sep 2026", tags: ["Testing"], status: "DOING", priority: "Medium" },
  { id: "7", title: "Design Homepage", assignee: "Admin", dueDate: "12 Sep 2026", tags: ["Design"], status: "COMPLETED", priority: "High" },
  { id: "8", title: "Develop Login Feature", assignee: "CN", dueDate: "15 Sep 2026", tags: ["Development"], status: "COMPLETED", priority: "Low" },
  { id: "9", title: "Test Payment Gateway", assignee: "QA", dueDate: "18 Sep 2026", tags: ["Testing"], status: "COMPLETED", priority: "Medium" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [viewMode, setViewMode] = useState<"board" | "list">("list");
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);
  
  // Filter Dropdown & Submenu state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterSubmenu, setActiveFilterSubmenu] = useState<string | null>(null);
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string | null>(null);

  // Search & Modal State
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

  // Filter tasks based on Search Input & Selected Priority Filter
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriorityFilter
      ? t.priority?.toLowerCase() === selectedPriorityFilter.toLowerCase()
      : true;
    return matchesSearch && matchesPriority;
  });

  const columns = [
    { title: "To Do", status: "TODO" },
    { title: "Doing", status: "DOING" },
    { title: "Completed", status: "COMPLETED" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex text-gray-900 dark:text-gray-100">
      <Sidebar />

      <main className="flex-1 flex flex-col p-6 overflow-x-auto relative">
        {/* Top Navigation & Breadcrumbs Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="cursor-pointer hover:text-black dark:hover:text-white">Projects</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Design Homepage</span>
          </div>
        </div>

        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-xl font-bold">Tasks</h1>

          <div className="flex items-center gap-2 relative flex-1 justify-end">
            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-xl text-xs bg-white dark:bg-gray-900 outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Fields Button with Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsFieldsOpen(!isFieldsOpen);
                  setIsFilterOpen(false);
                }}
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

            {/* Filter Button with Submenus Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setIsFieldsOpen(false);
                  setActiveFilterSubmenu(null);
                }}
                className={`p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedPriorityFilter ? "bg-gray-100 dark:bg-gray-800 border-black" : ""
                }`}
              >
                <Filter className="w-4 h-4 text-gray-500" />
              </button>

              {/* Main Filter Popover Menu */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1">
                  {/* Status */}
                  <button
                    onClick={() => setActiveFilterSubmenu(activeFilterSubmenu === "Status" ? null : "Status")}
                    className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <Circle className="w-3.5 h-3.5 text-gray-400" />
                      <span>Status</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Priority with Submenu */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveFilterSubmenu(activeFilterSubmenu === "Priority" ? null : "Priority")}
                      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
                        <span>Priority</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    {/* Priority Submenu Popover */}
                    {activeFilterSubmenu === "Priority" && (
                      <div className="absolute right-full top-0 mr-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-1.5 z-50 space-y-0.5">
                        {["No Priority", "Urgent", "High", "Medium", "Low"].map((p) => {
                          const isSelected = selectedPriorityFilter?.toLowerCase() === p.toLowerCase();
                          return (
                            <button
                              key={p}
                              onClick={() => {
                                setSelectedPriorityFilter(isSelected ? null : p);
                                setIsFilterOpen(false);
                              }}
                              className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-xs text-left"
                            >
                              <span
                                className={
                                  p === "Urgent"
                                    ? "text-red-500 font-medium"
                                    : p === "High"
                                    ? "text-orange-500 font-medium"
                                    : p === "Medium"
                                    ? "text-yellow-600 font-medium"
                                    : p === "Low"
                                    ? "text-blue-500 font-medium"
                                    : "text-gray-500"
                                }
                              >
                                {p === "No Priority" ? "• " + p : "📶 " + p}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-black dark:text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Members */}
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>Members</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Due Date */}
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>Due Date</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Teams */}
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>Teams</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Labels */}
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-gray-400" />
                      <span>Labels</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Reporter */}
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                      <span>Reporter</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              )}
            </div>

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-medium hover:opacity-90">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Dynamic View Toggle */}
        {viewMode === "board" ? (
          /* Board View */
          <div className="grid grid-cols-3 gap-4 min-w-[900px]">
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
          /* List View Categorized Mode */
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
                    <div className="p-2 bg-gray-50/30 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800">
                      <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 hover:text-black dark:hover:text-white font-medium">
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Task</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}