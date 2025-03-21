import { useModal } from "@/features/modal/store";
import { Task } from "../model/task";
import { useCallback } from "react";

interface TaskCardProps {
  item: Task;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  item,
  onDragStart,
  onDragEnd,
}) => {
  const expiresAtDate = item.expiresAt ? new Date(item.expiresAt) : null;
  const isExpired = expiresAtDate && expiresAtDate < new Date();

  const {onOpen} = useModal();

  const openModal = useCallback(() => {
    onOpen('taskDetail', {taskId: item.id, actionType: 'view'})
  }, [])

  return (
    <div
      className="flex min-h-[100px] w-full cursor-pointer 
    select-none flex-col gap-1 rounded-lg
     bg-[#282828] p-2 transition-colors hover:bg-[#444343]"
      draggable
      onDragStart={() => onDragStart(item)}
      onDragEnd={onDragEnd}
      onClick={openModal}
    >
      <p className="text-sm">{item.header}</p>
      <p className="text-xs text-[#cccccc]">{item.description}</p>
      <p className={`text-xs ${isExpired ? "text-red-500" : "text-[#5cd5fb]"}`}>
        {expiresAtDate ? expiresAtDate.toLocaleDateString() : "Без дедлайна"}
      </p>
      <p
        className={"text-xs text-[#5cd5fb]"}
      >Исполнитель: {item.executor ? `${item.executor.firstname} ${item.executor.lastname}` : 'Не назначен'}</p>
    </div>
  );
};
