import { create } from "zustand";
import { Task, TaskFilter, TaskStatus } from "./model/task";
import { getTasksByFilter } from "./api/getTasksByFilter";
import { updateTask } from "./api/updateTask";

type State = {
  tasks: Task[];
};

type Actions = {
  loadTasks: (filter: TaskFilter) => void;
  changeStatus: (taskId: number, newStatus: TaskStatus) => void;
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
    console.log(tasks);
  },
  async changeStatus(taskId, newStatus) {
    const taskData = {
      status: newStatus,
    };
    const updatedTask = await updateTask(taskId, taskData);
    const newTasks = [
      ...get().tasks.filter((item) => item.id !== taskId),
      updatedTask,
    ];
    set({
      tasks: newTasks,
    });
  },
  createTask(data) {
    console.log(data);
  },
}));
