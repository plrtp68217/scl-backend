import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Channel } from './channels.model';
import { UserChannel } from './users-channels.model';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateUserChannelDto } from './dto/create-user-channel.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel)
    private channelModel: typeof Channel,
    @InjectModel(UserChannel)
    private userChannelModel: typeof UserChannel,
    private usersService: UsersService,
  ) {}

  async createChannel(dto: CreateChannelDto) {
    const channel = await this.channelModel.create(dto);
    return channel;
  }

  async getAllChannels() {
    const channels = await this.channelModel.findAll();
    return channels;
  }

  async getChannel(channelId: string) {
    const channel = await this.channelModel.findOne({
      where: {
        channelId,
      }
    })

    if (!channel) {
      throw new Error('channel not found'); 
    }

    return channel;
  }

  async updateChannel(dto: UpdateChannelDto) {
    const channel = await this.getChannel(dto.channelId);
    await channel?.update(dto);
    return channel;
  }

  async createUserChannel(dto: CreateUserChannelDto) {
    const user = this.usersService.getUser(dto.userId);

    if (!user) {
      throw new Error('user_channel: user not found'); 
    }

    const channel = await this.getChannel(dto.channelId);

    if (!channel) {
      throw new Error('user_channel: channel not found'); 
    }

    const userChannel = await this.userChannelModel.create(dto);

    return userChannel;
  }

  async getChannelsWithoutUser(userId: number) {
    const channelsWithUser = await this.userChannelModel.findAll({
      where: { userId },
      attributes: ['channelId']
    });

    const channelsIdWithUser = channelsWithUser.map(channel => channel.channelId);

    const channlesWithoutUser = await this.channelModel.findAll({
      where: {
        channelId: {
          [Op.notIn]: channelsIdWithUser
        }
      }
    });

    return channlesWithoutUser;
  }

}
