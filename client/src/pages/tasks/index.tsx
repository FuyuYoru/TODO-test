import { useAuth } from "@/app/providers/AuthProvider";
import { getTasksByFilter } from "@/entities/tasks/api/getTasksByFilter";
import { Task } from "@/entities/tasks/model/task";
import { Button } from "@/shared/ui/Button";
import { useEffect, useState } from "react";

export const TaskPage: React.FC = () => {

  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) {
        console.error('Нет данных пользователя')
        return;
      }
      const tasks = await getTasksByFilter(
        { userId: user?.id }
      )
      console.log(tasks);
      setTasks(tasks);
    }
    fetchTasks()
  }, [])

  return (
    <div className="w-full h-full flex flex-col px-8 py-4">
      <p className="text-3xl text-white mb-4">Задачи</p>
      <div className="flex flex-row">
        <Button classNames="bg-[#c20840] hover:bg-[#940740] transition px-4 py-2 rounded-xl">
          Новая задача
        </Button>

      </div>
    </div>
  );
};
