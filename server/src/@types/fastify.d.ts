import { JwtPayloadType } from '@/auth/types';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayloadType;
  }
}
