import { JwtPayloadType } from '@/auth/types';

declare module 'express' {
  interface Request {
    user?: JwtPayloadType;
    cookies?: Record<string, string>;
  }
}
