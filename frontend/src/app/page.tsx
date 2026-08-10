import Sidebar from "@/components/Sidebar";

const columns = [
  {
    title: "To Do",
    tasks: [
      "Write API Documentation",
      "Implement Search Function",
      "Deploy to Production",
    ],
  },
  {
    title: "Doing",
    tasks: [
      "Code Review Completed",
      "Design Mockups Finalized",
    ],
  },
  {
    title: "Completed",
    tasks: [
      "Feature Testing Passed",
      "UI Design Updated",
      "Security Audit Scheduled",
    ],
  },
  {
    title: "On Hold",
    tasks: [
      "UI Review",
      "Backend Integration",
      "User Feedback",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 min-h-screen bg-white p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Tasks
          </h1>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              🔍
            </button>

            <button className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              ▦ Fields
            </button>

            <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              + Add Task
            </button>
          </div>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <div
              key={column.title}
              className="rounded-lg bg-gray-100 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">
                  {column.title}
                </h2>

                <span className="text-gray-400">•••</span>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <h3 className="text-sm font-medium text-gray-900">
                      {task}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Admin
                      </span>

                      <span className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-500">
                        29 Jul
                      </span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-500">
                        Deployment
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-3 w-full py-2 text-left text-xs text-gray-500 hover:text-gray-900">
                + Add Task
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}