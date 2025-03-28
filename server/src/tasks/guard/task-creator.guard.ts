import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TaskCreatorGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const taskId = Number(request.params.id);

    if (!user) {
      throw new ForbiddenException('Не авторизован');
    }

    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      select: { creatorId: true },
    });

    if (!task) {
      throw new ForbiddenException('Задача не найдена');
    }

    if (user.role === 'ADMIN') {
      return true;
    }

    if (task.creatorId !== user.sub) {
      throw new ForbiddenException('Недостаточно прав');
    }

    return true;
  }
}
