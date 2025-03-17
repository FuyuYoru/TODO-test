import { CreateUserDto } from '@/users/dto/create-user.dto';

export class SignUpByAdminDto {
  user: CreateUserDto;
}

export class SignUpByInviteDto {
  user: CreateUserDto;
  invitationCode: string;
}
