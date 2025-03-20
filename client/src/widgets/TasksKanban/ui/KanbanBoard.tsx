import { Task, TaskStatus } from "@/entities/tasks/model/task";
import { useAuth } from "@/app/providers/AuthProvider";
import { useTasksStore } from "@/entities/tasks/store";
import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import { TaskCard } from "@/entities/tasks/ui/TaskCard";
import { Button } from "@/shared/ui/Button";
import clsx from "clsx";

const columnStatuses = [
  { title: "Новые", value: TaskStatus.new, color: "#ffee95" },
  { title: "Выполняются", value: TaskStatus.inProgress, color: "#47d1e2" },
  { title: "Завершённые", value: TaskStatus.completed, color: "#75d900" },
  { title: "Отменённые", value: TaskStatus.canceled, color: "#ff5752" },
];

export const KanbanBoard: React.FC<{ filter: "my" | "team" }> = ({
  filter,
}) => {
  const { user } = useAuth();
  const { tasks, loadTasks, changeStatus } = useTasksStore();

  const draggedTaskIdRef = useRef<number | null>(null);
  const dragoverColumnRef = useRef<TaskStatus | null>(null);

  const onDragStart = (task: Task) => {
    draggedTaskIdRef.current = task.id;
  };

  const onDragOver = (status: TaskStatus) => {
    if (draggedTaskIdRef.current) {
      dragoverColumnRef.current = status;
    }
  };

  const onDragEnd = () => {
    if (draggedTaskIdRef.current && dragoverColumnRef.current) {
      changeStatus(draggedTaskIdRef.current, dragoverColumnRef.current);
      draggedTaskIdRef.current = null;
      dragoverColumnRef.current = null;
    }
  };

  const loadUserTasks = useCallback(() => {
    if (user?.id) loadTasks({ userId: user.id });
  }, [user?.id, loadTasks]);

  useEffect(() => {
    loadUserTasks();
  }, [loadUserTasks]);

  const columns = useMemo(
    () =>
      columnStatuses.map(({ title, value, color }, index) => {
        const filteredTasks = tasks.filter((task) => task.status === value);

        return (
          <div
            key={value}
            onDragOver={() => onDragOver(value)}
            className={clsx("flex h-full w-full flex-col")}
          >
            <div className="w-full">
              <div
                className="w-full rounded-l-sm rounded-r-xl 
                    border-0 p-1 text-center font-normal text-black"
                style={{ backgroundColor: color }}
              >
                {title}
              </div>
            </div>
            <div
              className={clsx(
                "flex h-full w-full flex-col gap-4 overflow-y-auto border-l border-dashed border-[#707070] p-2",
                index === columnStatuses.length - 1 ? "border-r" : ""
              )}
            >
              {filteredTasks.map((task) => (
                <TaskCard
                  item={task}
                  onDragStart={(task) => onDragStart(task)}
                  onDragEnd={onDragEnd}
                  key={task.id}
                />
              ))}
            </div>
          </div>
        );
      }),
    [tasks, columnStatuses]
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-row">
        {filter === "team" && (
          <Button classNames="bg-[#c20840] hover:bg-[#940740] transition px-4 py-2 rounded-xl">
            Новая задача
          </Button>
        )}
      </div>
      <div className="grid h-full grid-cols-4">{columns}</div>
    </div>
  );
};
