import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const validRoles = ['USER', 'ADMIN'];

    if (data.role && !validRoles.includes(data.role)) {
      throw new BadRequestException(`Invalid role: ${data.role}`);
    }
    const hashedPassword = await this.hashPassword(data.password);

    const newUser = {
      ...data,
      password: hashedPassword,
      managerId: data.managerId || null,
      role: (data.role as Role) || 'USER',
    };
    return this.prisma.user.create({ data: newUser });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { login: login },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
