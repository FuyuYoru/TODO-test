import { Task } from "../model/task";

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

  return (
    <div
      className="flex min-h-[100px] w-full cursor-pointer 
    select-none flex-col gap-1 rounded-lg
     bg-[#282828] p-2 transition-colors hover:bg-[#444343]"
      draggable
      onDragStart={() => onDragStart(item)}
      onDragEnd={onDragEnd}
    >
      <p className="text-sm">{item.header}</p>
      <p className="text-xs text-[#cccccc]">{item.description}</p>
      <p className={`text-xs ${isExpired ? "text-red-500" : "text-[#5cd5fb]"}`}>
        {expiresAtDate ? expiresAtDate.toLocaleDateString() : "Без дедлайна"}
      </p>
      <p
        className={"text-xs text-[#5cd5fb]"}
      >{`${item.executor.firstname} ${item.executor.lastname}`}</p>
    </div>
  );
};
