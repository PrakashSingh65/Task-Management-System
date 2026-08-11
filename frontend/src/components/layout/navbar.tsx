"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Search, UserCheck, LogOut, LogIn } from "lucide-react";
import { logoutUser } from "@/lib/api";

export function Navbar() {
  const router = useRouter();
  const [userMode, setUserMode] = useState<string | null>(null);

  useEffect(() => {
    const mode = localStorage.getItem("user_mode");
    setUserMode(mode || "guest");
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_mode");
    localStorage.removeItem("user_email");
    setUserMode(null);
    router.push("/login");
  };

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
          <span>{userMode === "user" ? "Logged In User" : "Guest User"}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900 transition-colors"
          title="Log Out"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </header>
  );
}