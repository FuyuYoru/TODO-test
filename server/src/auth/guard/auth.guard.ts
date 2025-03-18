import { JwtPayloadType } from '@/auth/types';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const cookies: Record<string, string> = request.cookies;
    const token = cookies?.refreshToken;

    if (!token) {
      throw new UnauthorizedException('Вы не авторизованы');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayloadType>(token);

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Вы не авторизованы');
    }
    return true;
  }
}
