import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:userId')
  get(@Param('userId') userId: number): Promise<User | null> {
    return this.usersService.getUser(userId);
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @Put()
  update(@Body() dto: UpdateUserDto): Promise<User>{
    return this.usersService.updateUser(dto);
  }

}
