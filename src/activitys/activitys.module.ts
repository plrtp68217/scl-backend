import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivitysController } from './activitys.controller';
import { ActivitysService } from './activitys.service';
import { Activity } from './activitys.model';
import { UsersModule } from 'src/users/users.module';
import { DateService } from 'src/common/date.service';

@Module({
  controllers: [ActivitysController],
  providers: [ActivitysService, DateService],
  imports: [
    SequelizeModule.forFeature([Activity]),
    UsersModule,
  ],
})
export class ActivitysModule {}
