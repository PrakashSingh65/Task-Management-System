type TaskCardProps = {
  title: string;
  date: string;
  label: string;
  user?: string;
};

export default function TaskCard({
  title,
  date,
  label,
  user = "Admin",
}: TaskCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      
      {/* Task title */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-900">
          {title}
        </h3>

        <button className="text-gray-400 hover:text-gray-700">
          •••
        </button>
      </div>

      {/* User and date */}
      <div className="mt-3 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[9px] font-semibold text-white">
            A
          </div>

          <span className="text-xs text-gray-600">
            {user}
          </span>
        </div>

        <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] text-red-500">
          {date}
        </span>
      </div>

      {/* Label */}
      <div className="mt-3 flex flex-wrap gap-1">
        <span className="rounded-full border border-gray-200 px-2 py-1 text-[10px] text-gray-500">
          {label}
        </span>
      </div>

    </div>
  );
}