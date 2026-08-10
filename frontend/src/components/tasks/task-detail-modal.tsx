"use client";

import { useState } from "react";
import {
  X,
  Plus,
  Paperclip,
  Send,
  MoreHorizontal,
  ChevronDown,
  Eye,
  Share2,
  Lock,
  Smile,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";

interface Subtask {
  id: string;
  title: string;
  priority: string;
  members: string;
  dueDate: string;
}

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  const [priority, setPriority] = useState("High");
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Jan 10");

  const [comments, setComments] = useState([
    { id: "1", user: "Ankit Dutta", time: "just now", text: "dsds" },
  ]);
  const [newComment, setNewComment] = useState("");

  const subtasks: Subtask[] = [
    { id: "1", title: "Subtask 1", priority: "High", members: "A", dueDate: "12 Sep 2026" },
    { id: "2", title: "Subtask 2", priority: "Low", members: "CN", dueDate: "15 Sep 2026" },
    { id: "3", title: "Subtask 3", priority: "Medium", members: "+", dueDate: "18 Sep 2026" },
  ];

  if (!isOpen || !task) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now().toString(), user: "You", time: "just now", text: newComment },
    ]);
    setNewComment("");
  };

  // Static Calendar Days (January 2026)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Workspace / Tasks</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
              <Lock className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg flex items-center gap-1 text-xs">
              <Eye className="w-4 h-4" />
              <span>1</span>
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Left Pane */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {task.title || "Write API Documentation"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively.
              </p>
            </div>

            {/* Properties */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="w-20 text-gray-400 font-medium">Properties</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-medium">Designer</span>
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-500 font-medium">📅 31 Jul</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 text-gray-400 font-medium">Labels</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Research", "Design", "Development", "Testing", "Deployment"].map((l) => (
                    <span key={l} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                      🏷️ {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 text-gray-400 font-medium">Resources</span>
                <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Add document or link...</span>
                </button>
              </div>
            </div>

            {/* Subtasks Section */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Subtasks</span>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400">
                    <tr>
                      <th className="py-2.5 px-4 font-normal">Task</th>
                      <th className="py-2.5 px-4 font-normal">Priority</th>
                      <th className="py-2.5 px-4 font-normal">Members</th>
                      <th className="py-2.5 px-4 font-normal">Due Date</th>
                      <th className="py-2.5 px-4 font-normal text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {subtasks.map((s) => (
                      <tr key={s.id}>
                        <td className="py-2.5 px-4 font-medium text-gray-800 dark:text-gray-200">{s.title}</td>
                        <td className="py-2.5 px-4 text-red-500 font-medium">📶 {s.priority}</td>
                        <td className="py-2.5 px-4">
                          <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                            {s.members}
                          </div>
                        </td>
                        <td className="py-2.5 px-4 text-gray-500">{s.dueDate}</td>
                        <td className="py-2.5 px-4 text-right">
                          <MoreHorizontal className="w-3.5 h-3.5 text-gray-400 inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="flex items-center gap-1 px-4 py-2 text-gray-500 hover:text-gray-800 font-medium text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subtasks</span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="pt-4 space-y-4">
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300">Subtasks</h3>

              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{c.user}</span>
                    <span>{c.time}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
                </div>
              ))}

              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex flex-col gap-2 bg-white dark:bg-gray-900">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  className="w-full text-xs bg-transparent outline-none text-gray-800 dark:text-gray-200"
                />
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Paperclip className="w-3.5 h-3.5 cursor-pointer" />
                    <Smile className="w-3.5 h-3.5 cursor-pointer" />
                  </div>
                  <button onClick={handleAddComment} className="p-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Meta Sidebar */}
          <div className="w-80 border-l border-gray-100 dark:border-gray-800 p-6 space-y-5 text-xs bg-gray-50/50 dark:bg-gray-900/50 relative overflow-y-auto">
            <div className="flex items-center justify-between text-gray-400 font-semibold">
              <span>Details</span>
              <div className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 cursor-pointer" />
                <MoreHorizontal className="w-3.5 h-3.5 cursor-pointer" />
              </div>
            </div>

            <div className="space-y-3">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-600 font-medium">● Backlog</span>
              </div>

              {/* Priority Dropdown */}
              <div className="flex items-center justify-between relative">
                <span className="text-gray-400">Priority</span>
                <button
                  onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                  className="flex items-center gap-1 font-medium text-red-500"
                >
                  <span>📶 {priority}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {isPriorityOpen && (
                  <div className="absolute right-0 top-6 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2 z-50 space-y-1">
                    {["No Priority", "Urgent", "High", "Medium", "Low"].map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPriority(p);
                          setIsPriorityOpen(false);
                        }}
                        className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-xs flex items-center justify-between"
                      >
                        <span>{p}</span>
                        {priority === p && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Members */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Members</span>
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-black">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add members</span>
                </button>
              </div>

              {/* Dates Feature with Popover */}
              <div className="flex items-center justify-between relative">
                <span className="text-gray-400">Dates</span>
                <button
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200"
                >
                  <CalendarIcon className="w-3 h-3 text-gray-400" />
                  <span>{selectedDate}</span>
                  <span>→</span>
                  <span className="text-gray-400">End</span>
                </button>

                {/* Calendar Popover */}
                {isDatePickerOpen && (
                  <div className="absolute right-0 top-8 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4 z-50 text-xs">
                    <div className="flex items-center justify-between mb-3 font-semibold text-gray-800 dark:text-gray-200">
                      <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-gray-500" />
                      <span>January 2026</span>
                      <ChevronRight className="w-4 h-4 cursor-pointer hover:text-gray-500" />
                    </div>

                    <div className="grid grid-cols-7 text-center text-[10px] text-gray-400 mb-2 font-medium">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>

                    <div className="grid grid-cols-7 text-center gap-y-1">
                      {calendarDays.map((d) => (
                        <button
                          key={d}
                          onClick={() => {
                            setSelectedDate(`Jan ${d}`);
                            setIsDatePickerOpen(false);
                          }}
                          className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors mx-auto text-xs ${
                            d === 10
                              ? "bg-black text-white font-bold dark:bg-white dark:text-black"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Labels & Teams */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Labels</span>
                <span className="text-gray-400 font-medium cursor-pointer">+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Teams</span>
                <span className="text-gray-400 font-medium cursor-pointer">+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Reporter</span>
                <span className="text-gray-400 font-medium cursor-pointer">+</span>
              </div>
            </div>

            {/* Updates Log */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <span className="text-gray-400 font-semibold">Updates</span>
              <div className="text-[11px] text-gray-500 space-y-2">
                <p><span className="font-medium text-gray-800 dark:text-gray-200">You</span> changed priority to Urgent</p>
                <p><span className="font-medium text-gray-800 dark:text-gray-200">You</span> posted an update - Aug 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}