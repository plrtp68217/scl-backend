import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/users.model';

import { SuccessResponse } from 'src/response/response';
import { ErrorResponse } from 'src/response/response';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private authorizationService: AuthorizationService
  ) {}

  @Post()
  login(@Body() dto: LoginUserDto): Promise<SuccessResponse<User> | ErrorResponse> {
    return this.authorizationService.loginUser(dto);
  }
}
