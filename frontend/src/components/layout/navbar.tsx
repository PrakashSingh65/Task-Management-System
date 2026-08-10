"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Search, UserCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200 dark:border-blue-800">
          <UserCheck className="h-4 w-4" />
          <span>Guest User</span>
        </div>
      </div>
    </header>
  );
}