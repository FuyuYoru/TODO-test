import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';
import { GetTasksDto, TaskFilterType } from '@/tasks/dto/get-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTaskById(taskId: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        creator: true,
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    return task;
  }

  async getTasks(dto: GetTasksDto) {
    const {
      filterType,
      completedAfter,
      completedBefore,
      executorId,
      executorIds,
    } = dto;

    console.log(dto);

    const userId = Number(dto.userId);

    if (!userId) {
      throw new Error('User ID is required for filtering tasks.');
    }

    const orConditions: Prisma.TaskWhereInput[] = [];

    if (filterType === TaskFilterType.ASSIGNED_TO_ME) {
      orConditions.push({ executorId: userId });
    } else if (filterType === TaskFilterType.CREATED_BY_ME) {
      orConditions.push({ creatorId: userId });
    }

    if (executorIds && executorIds.length > 0) {
      orConditions.push({ executorId: { in: executorIds } });
    } else if (executorId) {
      orConditions.push({ executorId });
    }

    if (
      !filterType &&
      !executorId &&
      !(executorIds && executorIds.length > 0)
    ) {
      orConditions.push({ executorId: userId }, { creatorId: userId });
    }

    const where: Prisma.TaskWhereInput = {
      OR: orConditions,
      expiresAt: {
        gte: completedAfter ? new Date(completedAfter) : undefined,
        lte: completedBefore ? new Date(completedBefore) : undefined,
      },
    };

    const tasks = await this.prisma.task.findMany({
      where,
      include: {
        executor: {
          select: {
            id: true,
            login: true,
            firstname: true,
            lastname: true,
            middlename: true,
          },
        },
      },
    });

    return tasks;
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const { executorId, ...rest } = taskData;

    if (executorId) {
      const userExists = await this.prisma.user.findUnique({
        where: { id: executorId },
      });

      if (!userExists) {
        throw new NotFoundException('Исполнитель не найден');
      }
    }

    return await this.prisma.task.create({
      data: {
        ...rest,
        createdAt: new Date(),
      },
      include: {
        executor: {
          select: {
            id: true,
            login: true,
            firstname: true,
            lastname: true,
            middlename: true,
          },
        },
      },
    });
  }

  async updateTask(taskId: number, taskData: CreateTaskDto): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: { id: taskId },
        data: taskData,
        include: {
          executor: {
            select: {
              id: true,
              login: true,
              firstname: true,
              lastname: true,
              middlename: true,
            },
          },
        },
      });
    } catch {
      throw new NotFoundException('Задача не найдена');
    }
  }

  async deleteTask(taskId: number) {
    try {
      return await this.prisma.task.delete({ where: { id: taskId } });
    } catch {
      throw new NotFoundException('Задача не найдена');
    }
  }
}
