import { Role } from '@prisma/client';

export interface JwtPayloadType {
  sub: number;
  login: string;
  role: Role;
}
