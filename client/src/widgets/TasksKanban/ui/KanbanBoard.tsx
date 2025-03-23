import {
  columnStatuses,
  Task,
  TaskFilterType,
  TaskStatus,
} from "@/entities/tasks/model/task";
import { useAuth } from "@/app/providers/AuthProvider";
import { useTasksStore } from "@/entities/tasks/store";
import { useEffect, useMemo, useCallback, useRef, useState } from "react";
import { TaskCard } from "@/entities/tasks/ui/TaskCard";
import { Button } from "@/shared/ui/Button";
import clsx from "clsx";
import { useModal } from "@/features/modal/store";
import { KanbanDateFilter } from "./KanbanDateFilter";

export const KanbanBoard: React.FC<{ filter: "my" | "team" }> = ({
  filter,
}) => {
  const { user } = useAuth();
  const { tasks, loadTasks, changeTask } = useTasksStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { onOpen } = useModal();

  const draggedTaskIdRef = useRef<number | null>(null);
  const dragoverColumnRef = useRef<TaskStatus | null>(null);
  const [highlightedColumn, setHighlightedColumn] = useState<TaskStatus | null>(
    null
  );

  const openModal = useCallback(() => {
    onOpen("taskDetail", { actionType: "create" });
  }, []);

  const onDragStart = (task: Task) => {
    draggedTaskIdRef.current = task.id;
  };

  const onDragOver = (status: TaskStatus) => {
    if (draggedTaskIdRef.current) {
      dragoverColumnRef.current = status;
      setHighlightedColumn(status);
    }
  };

  const onDragEnd = async () => {
    if (draggedTaskIdRef.current && dragoverColumnRef.current) {
      await changeTask(draggedTaskIdRef.current, {
        status: dragoverColumnRef.current,
      });
    }
    draggedTaskIdRef.current = null;
    dragoverColumnRef.current = null;
    setHighlightedColumn(null);
  };

  const loadUserTasks = useCallback(() => {
    if (user?.id) {
      const filterType =
        filter === "my"
          ? TaskFilterType.ASSIGNED_TO_ME
          : TaskFilterType.CREATED_BY_ME;
      loadTasks({
        userId: user.id,
        filterType: filterType,
        completedBefore: selectedDate,
      });
    }
  }, [user?.id, loadTasks, selectedDate]);

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
            className={clsx(
              "flex h-full w-full flex-col",
              highlightedColumn === value && "bg-[#444343] transition-colors"
            )}
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
    [tasks, highlightedColumn]
  );

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between">
        <KanbanDateFilter onChange={(value) => setSelectedDate(value)} />
        {filter === "team" && (
          <Button
            classNames="bg-[#c20840] hover:bg-[#940740] transition px-4 py-2 rounded-xl"
            onClick={openModal}
          >
            Новая задача
          </Button>
        )}
      </div>
      <div className="grid h-full grid-cols-4">{columns}</div>
    </div>
  );
};
