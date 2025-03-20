export interface Task {
  id: number,
  header: string,
  description: string,
  createdAt: string
  updatedAt: string
  expiresAt?: string
  priority: TaskPriority
  status: TaskStatus
  creatorId: number,
  executorId?: number
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
  new = 'new',
  inProgress = 'inProgress',
  completed = 'completed',
  canceled = 'canceled'
}

export enum TaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum TaskFilterType {
  ASSIGNED_TO_ME = 'ASSIGNED_TO_ME',
  CREATED_BY_ME = 'CREATED_BY_ME',
}