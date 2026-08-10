"use client";

import { Clock } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

export function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    LOW: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    MEDIUM: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-200",
    HIGH: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-200",
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{task.title}</h3>
      {task.description && <p className="text-xs text-gray-500 dark:text-gray-400">{task.description}</p>}
      {task.dueDate && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{task.dueDate}</span>
        </div>
      )}
    </div>
  );
}