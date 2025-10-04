import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/users.model';

import { SuccessResponse, ErrorResponse } from 'src/response/response';

@Injectable()
export class AuthorizationService {
  constructor(
    private usersService: UsersService
  ) {}

  async loginUser(dto: LoginUserDto): Promise<SuccessResponse<User> | ErrorResponse> {
    try {
      let user = await this.usersService.getUser(dto.userId);
  
      if (!user) {
        user = await this.usersService.createUser(dto);
      }
  
      return {
        success: true,
        data: user,
      }
    }
    catch (error) {
      return {
        success: false,
        errorText: `LOGIN ERROR: ${error}`,
      }
    }
  }
}
