import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTaskById(taskId: number) {
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

  async createTask(taskData: CreateTaskDto) {
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
    });
  }

  async updateTask(taskId: number, taskData: CreateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id: taskId },
        data: taskData,
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
