import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(data.password);

    const newUser = {
      ...data,
      password: hashedPassword,
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
