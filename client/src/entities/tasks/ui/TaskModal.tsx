import { useAuth } from "@/app/providers/AuthProvider";
import { TaskPriority, TaskStatus } from "@/entities/tasks/model/task";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { Loader2, X } from "lucide-react";
import { StatusSelector } from "@/entities/tasks/ui/StatusSelector";
import { PrioritySelector } from "@/entities/tasks/ui/PrioritySelector";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTasksStore } from "@/entities/tasks/store";

const taskSchema = z.object({
  header: z.string().min(3, "Заголовок слишком короткий"),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export const TaskModal: React.FC<{ taskId?: number; actionType: 'view' | 'create', onClose: () => void }> = ({
  taskId,
  actionType,
  onClose,
}) => {
  const { user } = useAuth();

  const task = useTasksStore((state) => state.tasks.find((t) => t.id === taskId));

  const canEdit = useMemo(() => {
    if (actionType === 'create') {
      return true;
    }
    return user?.id === task?.creatorId;
  }, [actionType, user, task]);

  const [isEditing, setIsEditing] = useState(actionType === 'create');
  const [isLoading, setIsLoading] = useState(false);
  const { changeTask, createTask } = useTasksStore();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      header: task?.header || "Новая задача",
      description: task?.description || "Описание задачи",
      status: task?.status || TaskStatus.new,
      priority: task?.priority || TaskPriority.medium,
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    setIsLoading(true);

    try {
      if (actionType === 'view') {
        if (!task) return;
        await changeTask(task.id, data);
      }
      if (actionType === 'create') {
        console.log(actionType);
        await createTask({ ...data, creatorId: user.id });
      }
      setIsEditing(false);
    } finally {
      setIsLoading(false);
      onClose()
    }
  };

  useEffect(() => {
    if (task) {
      setValue("header", task.header);
      setValue("description", task.description || "");
      setValue("status", task.status);
      setValue("priority", task.priority);
    }
  }, [task, setValue]);

  return (
    <div className="flex flex-col p-4 bg-[#181818] rounded-lg shadow-lg w-[500px]">
      <div className="flex justify-between items-center border-b border-[#2b2b2b] pb-2 mb-4">
        {isEditing ? (
          <input
            {...register("header")}
            className="bg-transparent border-b border-gray-500 text-xl font-bold w-full outline-none focus:border-white"
          />
        ) : (
          <p className="text-xl font-bold select-none">{task?.header}</p>
        )}
        <div onClick={onClose} className="hover:bg-[#444343] rounded-full flex justify-center items-center">
          <X size={30} color="#c20840" strokeWidth={0.75} />
        </div>
      </div>

      {isEditing ? (
        <>
          <textarea
            {...register("description")}
            className="bg-transparent border border-gray-500 w-full h-24 rounded p-2 outline-none focus:border-white resize-none"
          />
          {errors.header && <p className="text-red-500 text-sm">{errors.header.message}</p>}
        </>
      ) : (
        <p className="text-gray-300 mb-2">{task?.description}</p>
      )}

      {task && (<div className="text-xs text-[#5cd5fb]">
        <p>Создано: {new Date(task?.createdAt).toLocaleDateString()}</p>
        {task.expiresAt && (
          <p>Дедлайн: {new Date(task?.expiresAt).toLocaleDateString()}</p>
        )}
      </div>)}

      <div className="flex gap-2 text-sm mb-4">
        {isEditing ? (
          <>
            <PrioritySelector
              selectedPriority={getValues('priority')}
              onChange={(value) => setValue("priority", value)}
            />
            <StatusSelector
              selectedStatus={getValues('status')}
              onChange={(value) => {
                setValue("status", value)
              }}
            />
          </>
        ) : (
          <>
            <span className="px-2 py-1 bg-gray-700 rounded">Приоритет: {task?.priority}</span>
            <span className="px-2 py-1 bg-gray-700 rounded">Статус: {task?.status}</span>
          </>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Исполнитель: {task?.executor ? `${task.executor.firstname} ${task.executor.lastname}` : 'Не назначен'}
        </div>
        {canEdit && (
          isEditing ? (
            <Button
              classNames="border-[1px] border-[#c20840] min-w-[6rem] flex items-center justify-center hover:bg-[#c20840] rounded-xl py-1 px-2"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Сохранить"}
            </Button>
          ) : (
            <Button
              classNames="border-[1px] border-[#c20840] hover:bg-[#c20840] rounded-xl py-1 px-2"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </Button>
          )
        )}
      </div>
    </div>
  );
};
