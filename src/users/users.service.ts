import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getUser(userId: number) {
    let user = await this.userModel.findOne({
      where: {
        userId
      }
    });

    return user;
  }

  async createUser(dto: CreateUserDto) {
    let user = await this.userModel.create(dto);

    return user;
  }

  async updateUser(dto: UpdateUserDto) {
    let user = await this.getUser(dto.userId);

    user?.update(dto);

    return user;
  }
}
