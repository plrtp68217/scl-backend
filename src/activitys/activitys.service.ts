import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from './activitys.model';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DeleteActivityDto } from './dto/delete-activity.dto';
import { DateService } from 'src/common/date.service';

@Injectable()
export class ActivitysService {
  private readonly MAX_STREAK_VALUE = 7;

  constructor(
    @InjectModel(Activity)
    private activityModel: typeof Activity,
    private usersService: UsersService,
    private dateService: DateService
  ) {}
  
  // CRUD
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

    if (!activity) {
      throw new Error('activity not found'); 
    }

    return activity
  }

  async updateActivity(dto: UpdateActivityDto) {
    const activity = await this.getActivity(dto.userId);
    await activity.update(dto);
    return activity;
  }

  async deleteActivity(dto: DeleteActivityDto) {
    const activity = await this.getActivity(dto.userId);
    await activity?.destroy();
    return true;
  }


  // ИСПОЛЬЗУЕТСЯ ДЛЯ ПОЛУЧЕНИЯ АКТИВНОСТИ ПРИ ВХОДЕ В EARN
  async getActivityWithUpdatedStreak(userId: number): Promise<Activity> {
    let activity = await this.activityModel.findOne({
      where: {
        userId
      }
    });

    if(!activity) {
      const createActivityDto = {userId};
      activity = await this.createActivity(createActivityDto)
    }

    if (this.dateService.isToday(activity.lastEntry)) {
      return activity;
    }

    this.updateActivityStreak(activity);
    await activity.save();

    return activity;
  }

  // ВЫДАЕМ НАГРАДУ ПОЛЬЗОВАТЕЛЮ
  async getReward(userId: number): Promise<User | null> {
    const activity = await this.getActivity(userId);

    if (!activity) {
      return null;
    }

    if (activity.isRewarded == true) {
      return null;
    }

    const user = await this.usersService.getUser(userId);

    if (!user) {
      return null;
    }

    activity.isRewarded = true;
    await activity.save();

    user.balance += activity.reward * activity.streak
    await this.usersService.updateUser(user);

    return user;
  }

  private updateActivityStreak(activity: Activity): void {
    const isNextDayToday = this.dateService.isNextDayToday(activity.lastEntry);
    
    activity.streak = isNextDayToday ? activity.streak + 1 : 1;
    
    if (activity.streak > this.MAX_STREAK_VALUE) {
      activity.streak = 1;
    }

    activity.lastEntry = new Date();
    activity.isRewarded = false;
  }

}
