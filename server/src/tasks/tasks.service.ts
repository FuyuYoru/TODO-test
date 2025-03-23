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
    const userId = Number(dto.userId);

    if (!userId) {
      throw new Error('User ID is required for filtering tasks.');
    }
    const andConditions: Prisma.TaskWhereInput[] = [];

    // Фильтр по типу задачи (кем или кому)
    if (filterType === TaskFilterType.ASSIGNED_TO_ME) {
      andConditions.push({ executorId: userId });
    } else if (filterType === TaskFilterType.CREATED_BY_ME) {
      andConditions.push({ creatorId: userId });
    }

    // Фильтр по исполнителям
    if (executorIds?.length) {
      andConditions.push({ executorId: { in: executorIds } });
    } else if (executorId) {
      andConditions.push({ executorId });
    }

    // Фильтр по дате
    if (completedAfter || completedBefore) {
      andConditions.push({
        expiresAt: {
          gte: completedAfter ? new Date(completedAfter) : undefined,
          lte: completedBefore ? new Date(completedBefore) : undefined,
        },
      });
    }

    const where: Prisma.TaskWhereInput = {
      AND: andConditions,
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
    console.log(rest);
    return await this.prisma.task.create({
      data: {
        executorId,
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
