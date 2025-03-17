import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UsersService } from './users.service';
import { AdminGuard } from '@/auth/guard/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('createInvite')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  async createInvite(@Body() dto: CreateInviteDto) {
    return await this.UsersService.createInvite(dto);
  }
}
