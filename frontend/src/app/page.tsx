"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TaskCard from "@/components/TaskCard";

type Task = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  member: string;
  dueDate: string;
  label: string;
};

type Status = "To Do" | "Doing" | "Completed" | "On Hold";

const initialTasks: Record<Status, Task[]> = {
  "To Do": [
    {
      id: 1,
      title: "Design Homepage",
      priority: "High",
      member: "CN",
      dueDate: "12 Sep 2026",
      label: "Design",
    },
    {
      id: 2,
      title: "Develop Login Feature",
      priority: "Low",
      member: "CN",
      dueDate: "15 Sep 2026",
      label: "Development",
    },
    {
      id: 3,
      title: "Test Payment Gateway",
      priority: "Medium",
      member: "+",
      dueDate: "18 Sep 2026",
      label: "Testing",
    },
  ],

  Doing: [
    {
      id: 4,
      title: "Design Homepage",
      priority: "High",
      member: "CN",
      dueDate: "12 Sep 2026",
      label: "Design",
    },
    {
      id: 5,
      title: "Develop Login Feature",
      priority: "Low",
      member: "CN",
      dueDate: "15 Sep 2026",
      label: "Development",
    },
    {
      id: 6,
      title: "Test Payment Gateway",
      priority: "Medium",
      member: "+",
      dueDate: "18 Sep 2026",
      label: "Testing",
    },
  ],

  Completed: [
    {
      id: 7,
      title: "Design Homepage",
      priority: "High",
      member: "CN",
      dueDate: "12 Sep 2026",
      label: "Design",
    },
    {
      id: 8,
      title: "Develop Login Feature",
      priority: "Low",
      member: "CN",
      dueDate: "15 Sep 2026",
      label: "Development",
    },
    {
      id: 9,
      title: "Test Payment Gateway",
      priority: "Medium",
      member: "+",
      dueDate: "18 Sep 2026",
      label: "Testing",
    },
  ],

  "On Hold": [
    {
      id: 10,
      title: "UI Review",
      priority: "Low",
      member: "CN",
      dueDate: "20 Sep 2026",
      label: "Review",
    },
  ],
};

const statuses: Status[] = [
  "To Do",
  "Doing",
  "Completed",
  "On Hold",
];

export default function Home() {
  const [view, setView] = useState<"board" | "list">("board");

  const [tasks, setTasks] =
    useState<Record<Status, Task[]>>(initialTasks);

  const [search, setSearch] = useState("");

  const [showFields, setShowFields] = useState(false);

  const [showFilter, setShowFilter] = useState(false);

  const [showAddTask, setShowAddTask] = useState(false);

  const [newTask, setNewTask] = useState("");

  const filteredTasks = useMemo(() => {
    const result: Record<Status, Task[]> = {
      "To Do": [],
      Doing: [],
      Completed: [],
      "On Hold": [],
    };

    statuses.forEach((status) => {
      result[status] = tasks[status].filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    });

    return result;
  }, [tasks, search]);

  function addTask() {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      priority: "Medium",
      member: "+",
      dueDate: "18 Sep 2026",
      label: "New Task",
    };

    setTasks((previous) => ({
      ...previous,
      "To Do": [...previous["To Do"], task],
    }));

    setNewTask("");
    setShowAddTask(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        {/* Top Header */}
        <header className="flex h-14 items-center justify-between border-b border-gray-200 px-5">
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-900">
              ◧
            </button>

            <span className="text-sm text-gray-400">
              |
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-[10px] font-semibold text-white">
                A
              </div>

              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-orange-500 text-[10px] font-semibold text-white">
                C
              </div>

              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[10px] font-semibold text-white">
                D
              </div>
            </div>

            <span className="text-xs text-gray-500">
              7
            </span>
          </div>
        </header>

        {/* Main Content */}
        <section className="p-5">
          {/* Page Header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-base font-semibold text-gray-900">
              Tasks
            </h1>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search"
                  className="h-8 w-32 rounded-md border border-gray-200 bg-white px-8 text-xs outline-none placeholder:text-gray-400 focus:border-gray-400"
                />

                <span className="absolute left-2.5 top-2 text-xs text-gray-400">
                  🔍
                </span>
              </div>

              {/* Fields */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowFields(!showFields)
                  }
                  className="flex h-8 items-center gap-1 rounded-md border border-gray-200 px-3 text-xs text-gray-600 hover:bg-gray-50"
                >
                  ▦ Fields
                </button>

                {showFields && (
                  <div className="absolute right-0 top-10 z-20 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <div className="mb-2 border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-700">
                      Fields
                    </div>

                    <div className="mb-2 flex rounded-md bg-gray-100 p-1">
                      <button
                        onClick={() => setView("list")}
                        className={`flex-1 rounded px-2 py-1 text-xs ${
                          view === "list"
                            ? "bg-white shadow-sm"
                            : "text-gray-500"
                        }`}
                      >
                        ☰ List
                      </button>

                      <button
                        onClick={() => setView("board")}
                        className={`flex-1 rounded px-2 py-1 text-xs ${
                          view === "board"
                            ? "bg-white shadow-sm"
                            : "text-gray-500"
                        }`}
                      >
                        ▦ Board
                      </button>
                    </div>

                    {[
                      "Priority",
                      "Members",
                      "Due Date",
                      "Labels",
                      "Status",
                      "Reporter",
                    ].map((field) => (
                      <label
                        key={field}
                        className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        {field}

                        <input
                          type="checkbox"
                          defaultChecked={
                            field === "Members" ||
                            field === "Due Date"
                          }
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowFilter(!showFilter)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  ▼
                </button>

                {showFilter && (
                  <div className="absolute right-0 top-10 z-20 w-48 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                    <p className="mb-2 text-xs font-semibold text-gray-700">
                      Filter Tasks
                    </p>

                    <button className="block w-full rounded px-2 py-2 text-left text-xs hover:bg-gray-50">
                      Priority
                    </button>

                    <button className="block w-full rounded px-2 py-2 text-left text-xs hover:bg-gray-50">
                      Members
                    </button>

                    <button className="block w-full rounded px-2 py-2 text-left text-xs hover:bg-gray-50">
                      Due Date
                    </button>

                    <button className="block w-full rounded px-2 py-2 text-left text-xs hover:bg-gray-50">
                      Status
                    </button>
                  </div>
                )}
              </div>

              {/* Add Task */}
              <button
                onClick={() => setShowAddTask(true)}
                className="h-8 rounded-md bg-gray-900 px-3 text-xs font-medium text-white hover:bg-gray-800"
              >
                + Add Task
              </button>
            </div>
          </div>

          {/* BOARD VIEW */}
          {view === "board" && (
            <div className="grid grid-cols-4 gap-3 overflow-x-auto">
              {statuses.map((status) => (
                <div
                  key={status}
                  className="min-w-[220px] rounded-lg bg-gray-100 p-3"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-gray-700">
                      {status}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-400">
                      <button>+</button>
                      <button>•••</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {filteredTasks[status].map((task) => (
                      <TaskCard
                        key={task.id}
                        title={task.title}
                        date={task.dueDate}
                        label={task.label}
                        user="Admin"
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setShowAddTask(true)}
                    className="mt-3 w-full py-1 text-left text-xs text-gray-500 hover:text-gray-900"
                  >
                    + Add Task
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {view === "list" && (
            <div className="space-y-4">
              {statuses.map((status) => (
                <div key={status}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      ⌄
                    </span>

                    <h2 className="text-xs font-semibold text-gray-700">
                      {status}
                    </h2>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    {/* Table Header */}
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_40px] bg-gray-50 px-3 py-2 text-[11px] font-medium text-gray-500">
                      <span>Task</span>
                      <span>Priority</span>
                      <span>Members</span>
                      <span>Due Date</span>
                      <span>Actions</span>
                    </div>

                    {filteredTasks[status].map((task) => (
                      <div
                        key={task.id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_40px] items-center border-t border-gray-100 px-3 py-3 text-xs"
                      >
                        <span className="text-gray-700">
                          {task.title}
                        </span>

                        <span
                          className={
                            task.priority === "High"
                              ? "text-red-400"
                              : task.priority === "Medium"
                              ? "text-orange-400"
                              : "text-gray-400"
                          }
                        >
                          ↗ {task.priority}
                        </span>

                        <div className="flex items-center gap-2">
                          {task.member === "+" ? (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                              +
                            </span>
                          ) : (
                            <>
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[8px] text-white">
                                A
                              </span>

                              <span className="text-[10px] text-gray-500">
                                {task.member}
                              </span>
                            </>
                          )}
                        </div>

                        <span className="text-gray-500">
                          {task.dueDate}
                        </span>

                        <button className="text-gray-400 hover:text-gray-800">
                          •••
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => setShowAddTask(true)}
                      className="border-t border-gray-100 px-3 py-2 text-xs text-gray-500 hover:text-gray-900"
                    >
                      + Add Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ADD TASK MODAL */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Task
              </h2>

              <button
                onClick={() => setShowAddTask(false)}
                className="text-gray-400 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <label className="mb-2 block text-xs font-medium text-gray-600">
              Task Name
            </label>

            <input
              value={newTask}
              onChange={(event) =>
                setNewTask(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addTask();
                }
              }}
              placeholder="Enter task name"
              autoFocus
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
            />

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAddTask(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={addTask}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}