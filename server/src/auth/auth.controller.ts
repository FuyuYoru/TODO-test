import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Response,
  UnauthorizedException,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpByAdminDto, SignUpByInviteDto } from '@/auth/dto/sign-up.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { AdminGuard } from '@/auth/guard/admin.guard';
import { Response as ExpressResponse, Request } from 'express';

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

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ access_token, user });
  }

  @UseGuards(AuthGuard)
  @Get('refreshToken')
  async refreshToken(@Req() req: Request, @Response() res: ExpressResponse) {
    const cookies: Record<string, string> = req.cookies;
    const refreshToken = cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token не найден');
    }

    const { access_token } = await this.authService.refreshToken(refreshToken);

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ access_token });
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
