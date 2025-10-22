import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from './activitys.model';
import { UsersService } from 'src/users/users.service';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DeleteActivityDto } from './dto/delete-activity.dto';

@Injectable()
export class ActivitysService {
  constructor(
    @InjectModel(Activity)
    private activityModel: typeof Activity,
    private usersService: UsersService,
  ) {}
  
  async createActivity(dto: CreateActivityDto) {
    const activity = await this.activityModel.create(dto);
    return activity;
  }

  async getActivity(userId: number) {
    const activity = await this.activityModel.findOne({
      where: {
        userId
      }
    });
    return activity;
  }

  async updateActivity(dto: UpdateActivityDto) {
    const activity = await this.getActivity(dto.userId);
    await activity?.update(dto);
    return activity;
  }

  async deleteActivity(dto: DeleteActivityDto) {
    const activity = await this.getActivity(dto.userId);
    await activity?.destroy();
    return true;
  }

}
