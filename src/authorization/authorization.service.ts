import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    private usersService: UsersService
  ) {}

  async loginUser(dto: LoginUserDto) {
    let user = await this.usersService.getUser(dto.userId);
    
    if (!user) {
      user = await this.usersService.createUser(dto)
    }

    return user;
  }

}
