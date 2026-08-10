"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Sun,
  Moon,
  Palette,
  Settings,
  ChevronsUpDown,
  CheckSquare,
  FolderKanban,
} from "lucide-react";

export function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<"theme" | "color" | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [colorMode, setColorMode] = useState("Blue");

  const colorOptions = [
    { name: "Amber", class: "bg-amber-500" },
    { name: "Blue", class: "bg-blue-600" },
    { name: "Pink", class: "bg-pink-500" },
    { name: "Rose", class: "bg-rose-500" },
    { name: "Emerald", class: "bg-emerald-500" },
    { name: "Black", class: "bg-black" },
  ];

  const handleThemeChange = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between h-screen p-4 select-none relative">
      <div className="space-y-6">
        {/* User Profile Header Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setActiveSubmenu(null);
            }}
            className="flex items-center justify-between w-full p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                D
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Dexter
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute top-12 left-0 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl z-50 p-2 text-xs space-y-1">
              {/* User Meta info */}
              <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg mb-2">
                  D
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                  Dexter
                </span>
                <span className="text-gray-400 text-[11px]">
                  Dexter@gmail.com
                </span>
              </div>

              {/* Menu Items */}
              <div className="pt-1">
                {/* Change Theme */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveSubmenu(
                        activeSubmenu === "theme" ? null : "theme"
                      )
                    }
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-gray-500" />
                      <span>Change Theme</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Theme Submenu Popover */}
                  {activeSubmenu === "theme" && (
                    <div className="absolute left-full top-0 ml-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-1.5 z-50 space-y-0.5">
                      <button
                        onClick={() => handleThemeChange("light")}
                        className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center gap-2">
                          <Sun className="w-3.5 h-3.5" />
                          <span>Light</span>
                        </div>
                        {theme === "light" && (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleThemeChange("dark")}
                        className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center gap-2">
                          <Moon className="w-3.5 h-3.5" />
                          <span>Dark</span>
                        </div>
                        {theme === "dark" && (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Color Mode */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveSubmenu(
                        activeSubmenu === "color" ? null : "color"
                      )
                    }
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-sm ${
                          colorOptions.find((c) => c.name === colorMode)
                            ?.class || "bg-blue-600"
                        }`}
                      />
                      <span>Color Mode</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Color Mode Submenu Popover */}
                  {activeSubmenu === "color" && (
                    <div className="absolute left-full top-0 ml-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-1.5 z-50 space-y-0.5">
                      {colorOptions.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setColorMode(item.name)}
                          className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-sm ${item.class}`} />
                            <span>{item.name}</span>
                          </div>
                          {colorMode === item.name && (
                            <Check className="w-3.5 h-3.5" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Settings Link */}
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-500" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Workspace Items */}
        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-gray-400 px-2 uppercase tracking-wider mb-2">
            Workspace
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium text-xs"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Tasks</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}