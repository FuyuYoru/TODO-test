import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpByAdminDto, SignUpByInviteDto } from '@/auth/dto/sign-up.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { AdminGuard } from '@/auth/guard/admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
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
