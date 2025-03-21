import { UserSummary } from "@/entities/user/model/user";

export interface Task {
  id: number;
  header: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: number;
  executorId?: number;
  executor: UserSummary;
}

export interface TaskFilter {
  userId: number;
  filterType?: TaskFilterType;
  completedAfter?: string;
  completedBefore?: string;
  executorId?: number;
  executorIds?: number[];
}

export enum TaskStatus {
  new = "New",
  inProgress = "InProgress",
  completed = "Completed",
  canceled = "Canceled",
}

export enum TaskPriority {
  low = "Low",
  medium = "Medium",
  high = "High",
}

export enum TaskFilterType {
  ASSIGNED_TO_ME = "ASSIGNED_TO_ME",
  CREATED_BY_ME = "CREATED_BY_ME",
}

export const columnStatuses = [
  { title: "Новые", value: TaskStatus.new, color: "#ffee95" },
  { title: "Выполняются", value: TaskStatus.inProgress, color: "#47d1e2" },
  { title: "Завершённые", value: TaskStatus.completed, color: "#75d900" },
  { title: "Отменённые", value: TaskStatus.canceled, color: "#ff5752" },
];

export const priorityArray = [
  { title: "Низкий", value: TaskPriority.low, color: "#ffee95" },
  { title: "Обычный", value: TaskPriority.medium, color: "#47d1e2" },
  { title: "Высокий", value: TaskPriority.high, color: "#75d900" },
];