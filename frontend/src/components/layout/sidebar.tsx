"use client";

import { LayoutGrid, FolderKanban, ChevronDown, Sidebar as SidebarIcon } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 min-h-screen p-4 flex flex-col gap-6">
      {/* Profile / Workspace Dropdown */}
      <div className="flex items-center justify-between p-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
            D
          </div>
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
            Dexter
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      {/* Workspace Menu */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          <span>Workspace</span>
          <ChevronDown className="w-3 h-3" />
        </div>

        <button className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium">
          <LayoutGrid className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span>Tasks</span>
        </button>

        <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-sm font-medium transition-colors">
          <FolderKanban className="w-4 h-4" />
          <span>Projects</span>
        </button>
      </div>
    </aside>
  );
}