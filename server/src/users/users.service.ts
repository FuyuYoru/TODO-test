import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { CreateInviteDto } from './dto/create-invite.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const validRoles = ['USER', 'ADMIN'];

    if (data.role && !validRoles.includes(data.role)) {
      throw new BadRequestException(`Invalid role: ${data.role}`);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

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

  async findById(id: number): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        login: true,
        firstname: true,
        lastname: true,
        middlename: true,
        role: true,
        managerId: true,
        createdAt: true,
        updatedAt: true,
        managedUsers: {
          select: {
            id: true,
            login: true,
            firstname: true,
            lastname: true,
            middlename: true,
            role: true,
            managerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async createInvite(@Body() dto: CreateInviteDto) {
    const invite = await this.prisma.invitation.create({
      data: {
        code: uuidv4(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        createdById: dto.adminId,
      },
    });

    return invite;
  }
}
