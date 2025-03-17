import { Role } from '@prisma/client';

export class CreateUserDto {
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  managerId?: string;
  role?: Role;
}
