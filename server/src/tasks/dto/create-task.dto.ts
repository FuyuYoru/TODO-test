import { TaskPriority, TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  header: string;
  description: string;
  expiresAt?: Date;
  priority?: TaskPriority;
  status: TaskStatus;
  creatorId: number;
  executorId?: number;
}
