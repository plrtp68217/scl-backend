import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { UserChannel } from './users-channels.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ChannelsService],
  controllers: [ChannelsController],
  imports: [
      SequelizeModule.forFeature([Channel, UserChannel]),
      UsersModule,
    ],
})
export class ChannelsModule {}