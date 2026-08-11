"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  User,
  Sun,
  Pencil,
  Moon,
  Check,
} from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/lib/api";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "theme" | "color">("profile");

  // User State
  const [userId, setUserId] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [colorMode, setColorMode] = useState("Blue");
  const [loading, setLoading] = useState(true);

  const colorOptions = [
    { name: "Amber", class: "bg-amber-500" },
    { name: "Blue", class: "bg-blue-600" },
    { name: "Pink", class: "bg-pink-500" },
    { name: "Rose", class: "bg-rose-500" },
    { name: "Emerald", class: "bg-emerald-500" },
    { name: "Black", class: "bg-black" },
  ];

  // 1. Page load hone par backend se profile fetch karein
  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUserId(data.id);
        setFullName(data.fullName || "Dexter");
        setTitle(data.title || "Designer");
        setUsername(data.username || "Dexuser");
        setEmail(data.email || "dexter@gmail.com");
        setTheme(data.theme || "light");
        setColorMode(data.colorMode || "Blue");
      })
      .catch((err) => console.error("Error loading user profile:", err))
      .finally(() => setLoading(false));
  }, []);

  // 2. Profile changes backend me save karein
  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(userId, { fullName, title, username });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  // 3. Theme switch update karein
  const handleThemeChange = async (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      await updateUserProfile(userId, { theme: selectedTheme });
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Color mode change backend me save karein
  const handleColorChange = async (selectedColor: string) => {
    setColorMode(selectedColor);
    try {
      await updateUserProfile(userId, { colorMode: selectedColor });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs text-gray-500">
        Loading settings from server...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex text-gray-900 dark:text-gray-100 font-sans">
      {/* Settings Left Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-col gap-4 min-h-screen">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors py-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to app</span>
        </Link>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none"
          />
        </div>

        <nav className="flex flex-col gap-1 pt-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
              activeTab === "profile"
                ? "bg-gray-100 dark:bg-gray-800 font-semibold text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <User className="w-4 h-4 text-gray-500" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("theme")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
              activeTab === "theme"
                ? "bg-gray-100 dark:bg-gray-800 font-semibold text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <Sun className="w-4 h-4 text-gray-500" />
            <span>Theme</span>
          </button>

          <button
            onClick={() => setActiveTab("color")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
              activeTab === "color"
                ? "bg-gray-100 dark:bg-gray-800 font-semibold text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-sm ${
                colorOptions.find((c) => c.name === colorMode)?.class || "bg-black"
              }`}
            />
            <span>Color</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl p-10 space-y-8">
        {/* TAB 1: PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h1>
              <button
                onClick={handleSaveProfile}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-xl text-xs font-semibold shadow hover:opacity-90"
              >
                Save Changes
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Profile picture</span>
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  {fullName.charAt(0) || "D"}
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{email}</span>
                  <Pencil className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Full name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-64 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Title</div>
                  <div className="text-[11px] text-gray-400">Your job title or role</div>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-64 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Username</div>
                  <div className="text-[11px] text-gray-400">One word, like a nickname or first name</div>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-64 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-xl outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THEME */}
        {activeTab === "theme" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Theme</h1>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-3">
              <div
                onClick={() => handleThemeChange("light")}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium">Light</span>
                </div>
                {theme === "light" && <Check className="w-4 h-4 text-black dark:text-white" />}
              </div>
              <div
                onClick={() => handleThemeChange("dark")}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium">Dark</span>
                </div>
                {theme === "dark" && <Check className="w-4 h-4 text-black dark:text-white" />}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COLOR */}
        {activeTab === "color" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Color Mode</h1>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-2">
              {colorOptions.map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleColorChange(c.name)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer text-xs font-medium"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3.5 h-3.5 rounded-sm ${c.class}`} />
                    <span>{c.name}</span>
                  </div>
                  {colorMode === c.name && <Check className="w-4 h-4 text-black dark:text-white" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}