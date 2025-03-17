import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user || user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Доступ запрещён. Необходимы права администратора.',
      );
    }

    return true;
  }
}
