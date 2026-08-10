"use client";

import { Calendar, MoreHorizontal } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  status: "TODO" | "DOING" | "COMPLETED" | "ON_HOLD";
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200/70 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">
          {task.title}
        </h3>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Assignee & Date */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-medium">
            {(task.assignee || "A")[0]}
          </div>
          <span>{task.assignee || "Admin"}</span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1 text-red-500 font-medium bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md text-[11px]">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1"
            >
              <span className="text-gray-400">🏷️</span> {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}