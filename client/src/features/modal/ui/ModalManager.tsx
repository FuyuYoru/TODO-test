import { TaskModal } from "@/entities/tasks/ui/TaskModal";
import { useModal } from "@/features/modal/store";
import clsx from "clsx";

export const ModalManager: React.FC = () => {
  const { isOpen, type, data, onClose } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
    >
      <div
        className="relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {
          type === "taskDetail" && data && <TaskModal taskId={data.taskId} actionType={data.actionType || 'create'} onClose={onClose} />}
      </div>
    </div>
  );
};
