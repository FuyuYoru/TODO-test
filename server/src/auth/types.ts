import { User } from '@prisma/client';

export type JwtPayloadType = Omit<User, 'password'>;
