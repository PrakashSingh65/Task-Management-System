"use client";

import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("Tasks");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white">
      {/* Profile */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-semibold text-white">
            D
          </div>

          <span className="text-sm font-semibold text-gray-800">
            Dexter
          </span>
        </div>

        <span className="text-gray-400">⌄</span>
      </div>

      {/* Workspace */}
      <div className="px-4 py-5">
        <div className="mb-3 flex items-center justify-between px-2">
          <span className="text-xs font-medium text-gray-500">
            Workspace
          </span>

          <span className="text-gray-400">⌄</span>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActive("Tasks")}
            className={`w-full rounded-md px-3 py-2 text-left text-sm ${
              active === "Tasks"
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            ◉ &nbsp; Tasks
          </button>

          <button
            onClick={() => setActive("Projects")}
            className={`w-full rounded-md px-3 py-2 text-left text-sm ${
              active === "Projects"
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            ◇ &nbsp; Projects
          </button>
        </nav>
      </div>
    </aside>
  );
}