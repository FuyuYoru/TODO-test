import { create } from "zustand";
import { Task, TaskFilter } from "./model/task";
import { getTasksByFilter } from "./api/getTasksByFilter";
import { updateTask } from "./api/updateTask";
import { createTask } from "@/entities/tasks/api/createTask";

type State = {
  tasks: Task[];
};

type Actions = {
  loadTasks: (filter: TaskFilter) => void;
  changeTask: (taskId: number, data: Partial<Task>) => void;
  createTask: (
    data: Required<
      Pick<Task, "header" | "description" | "creatorId" | "status">
    > &
      Partial<Pick<Task, "priority" | "executorId" | "expiresAt">>
  ) => void;
};

export const useTasksStore = create<State & Actions>((set, get) => ({
  tasks: [],
  async loadTasks(filter) {
    const tasks = await getTasksByFilter(filter);
    set({
      tasks: tasks,
    });
  },
  async changeTask(taskId, taskData) {
    const updatedTask = await updateTask(taskId, taskData);
    const newTasks = [
      ...get().tasks.filter((item) => item.id !== taskId),
      updatedTask,
    ];
    set({
      tasks: newTasks,
    });
  },
  async createTask(data) {
    const newTask = await createTask(data);
    console.log(newTask);
    if(newTask) {
      set({
        tasks: [...get().tasks, newTask],
      });
    }
  },
}));
