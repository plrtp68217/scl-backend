import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ActivitysService } from './activitys.service';
import { Activity } from './activitys.model';
import { User } from 'src/users/users.model';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DeleteActivityDto } from './dto/delete-activity.dto';

@Controller('activitys')
export class ActivitysController {
  constructor(private activitysService: ActivitysService) {}

  @Post('create')
  createActivity(@Body() dto: CreateActivityDto): Promise<Activity>  {
    return this.activitysService.createActivity(dto);
  }
  
  @Post('update')
  updateActivity(@Body() dto: UpdateActivityDto): Promise<Activity>  {
    return this.activitysService.updateActivity(dto);
  }

  @Post('delete')
  deleteActivity(@Body() dto: DeleteActivityDto): Promise<boolean>  {
    return this.activitysService.deleteActivity(dto);
  }

  @Get(':userId')
  getActivityWithUpdatedStreak(@Param('userId') userId: number): Promise<Activity> {
    return this.activitysService.getActivityWithUpdatedStreak(userId);
  }

  @Get('reward/:userId')
  getReward(@Param('userId') userId: number): Promise<User | null> {
    return this.activitysService.getReward(userId);
  }
}
