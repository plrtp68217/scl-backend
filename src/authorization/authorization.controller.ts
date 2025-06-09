import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private authorizationService: AuthorizationService
  ) {}

  @Post()
  login(@Body() dto: LoginUserDto) {
    return this.authorizationService.loginUser(dto);
  }
}
