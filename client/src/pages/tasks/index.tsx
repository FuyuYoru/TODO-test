import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/shared/ui/Button";
import { KanbanBoard } from "@/widgets/TasksKanban/ui/KanbanBoard";
import { useState } from "react";

export const TaskPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"my" | "team">("my");

  return (
    <div className="flex h-full w-full flex-col gap-4 px-8 py-4">
      <p className="mb-4 text-3xl text-white">Задачи</p>

      <div className="flex border-b border-gray-700 gap-4">
        <button
          className={`px-4 py-2 transition w-full ${
            activeTab === "my"
              ? "border-b-2 border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("my")}
        >
          Мои задачи
        </button>
        <button
          className={`px-4 py-2 transition w-full ${
            activeTab === "team"
              ? "border-b-2 border-white text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("team")}
        >
          Задачи команды
        </button>
      </div>

      <div className="mt-4 h-full">
        {activeTab === "my" && <KanbanBoard filter="my" />}
        {activeTab === "team" && <KanbanBoard filter="team" />}
      </div>
    </div>
  );
};
