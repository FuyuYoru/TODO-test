import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpByAdminDto, SignUpByInviteDto } from '@/auth/dto/sign-up.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { AdminGuard } from '@/auth/guard/admin.guard';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Response() res: ExpressResponse) {
    const { access_token, refresh_token, user } = await this.authService.signIn(
      signInDto.login,
      signInDto.password,
    );
    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ access_token, user });
  }

  @Post('register/byInvite')
  @HttpCode(HttpStatus.CREATED)
  async registerWithInvitation(@Body() dto: SignUpByInviteDto) {
    return this.authService.registerByInvite(dto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post('register/byAdmin')
  @HttpCode(HttpStatus.CREATED)
  async registerByAdmin(@Body() dto: SignUpByAdminDto) {
    return this.authService.registerByAdmin(dto);
  }
}
