import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { SignUpByAdminDto, SignUpByInviteDto } from '@/auth/dto/sign-up.dto';
import { User } from '@prisma/client';
import { JwtPayloadType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(
    login: string,
    pass: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: Omit<User, 'password'>;
  }> {
    const user = await this.usersService.findByLogin(login);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    const payload = { sub: user.id, login: user.login, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userData,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify<JwtPayloadType>(refreshToken);

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        login: user.login,
        role: user.role,
      }),
    };
  }

  async registerByInvite(data: SignUpByInviteDto) {
    const existingUser = await this.usersService.findByLogin(data.user.login);

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    const invitation = await this.prisma.invitation.findUnique({
      where: { code: data.invitationCode },
    });

    if (!invitation || invitation.used) {
      throw new BadRequestException(
        'Неверный или использованный код приглашения',
      );
    }

    const user = await this.usersService.createUser(data.user);

    await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { used: true },
    });

    return user;
  }

  async registerByAdmin(data: SignUpByAdminDto) {
    const existingUser = await this.usersService.findByLogin(data.user.login);

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    const user = await this.usersService.createUser(data.user);

    return user;
  }
}
