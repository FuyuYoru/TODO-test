import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UsersService } from './users.service';
import { AdminGuard } from '@/auth/guard/admin.guard';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from '@/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('createInvite')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  async createInvite(@Body() dto: CreateInviteDto) {
    return await this.UsersService.createInvite(dto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Request() req: ExpressRequest) {
    const userId = Number(req.user?.sub);
    const user = this.UsersService.findById(userId);
    return user;
  }
}
