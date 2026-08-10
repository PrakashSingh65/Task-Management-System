"use client";

import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Tasks",
    "Calendar",
    "Settings",
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-4">
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-gray-900">
          Task Manager
        </h1>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              active === item
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}