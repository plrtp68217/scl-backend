import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUser(userId: number): Promise<User> {
    let user = await this.userModel.findOne({
      where: {
        userId
      }
    });

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    let user = await this.userModel.create(dto);

    return user;
  }

  async updateUser(dto: UpdateUserDto): Promise<User> {
    let user = await this.getUser(dto.userId);

    user?.update(dto);

    return user;
  }
}
