import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Channel } from './channels.model';
import { UserChannel } from './users-channels.model';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateUserChannelDto } from './dto/create-user-channel.dto';
import { UsersService } from 'src/users/users.service';
import { DeleteChannelDto } from './dto/delete-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel)
    private channelModel: typeof Channel,
    @InjectModel(UserChannel)
    private userChannelModel: typeof UserChannel,
    private usersService: UsersService,
  ) {}

  async createChannel(dto: CreateChannelDto): Promise<Channel> {
    const channel = await this.channelModel.create(dto);
    return channel;
  }

  async getAllChannels(): Promise<Channel[]> {
    const channels = await this.channelModel.findAll();
    return channels;
  }

  async getChannel(channelId: number): Promise<Channel> {
    const channel = await this.channelModel.findByPk(channelId)

    if (!channel) {
      throw new Error('channel not found'); 
    }

    return channel;
  }

  async updateChannel(dto: UpdateChannelDto): Promise<Channel> {
    const channel = await this.getChannel(dto.id);
    await channel?.update(dto);
    return channel;
  }

  async deleteChannel(dto: DeleteChannelDto): Promise<boolean> {
    const channel = await this.getChannel(dto.id); 
    await channel?.destroy();
    return true;
  }

  // СОЗДАЕМ ПОДПИСКУ ИГРОКУ НА КАНАЛ
  async createUserChannel(dto: CreateUserChannelDto): Promise<UserChannel> {
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

  // ОТДАЕМ КАНАЛЫ, НА КОТОРЫЕ ИГРОК НЕ ПОДПИСАЛСЯ
  async getUserChannelsWithoutSubscribe(userId: number): Promise<Channel[]> {
    const userChannelsWithSubscribe = await this.userChannelModel.findAll({
      where: { userId },
      attributes: ['channelId']
    });

    const userChannelsIdsWithSubscribe = userChannelsWithSubscribe.map(channel => channel.channelId);

    const userChannelsWithoutSubscribe = await this.channelModel.findAll({
      where: {
        id: {
          [Op.notIn]: userChannelsIdsWithSubscribe
        }
      }
    });

    return userChannelsWithoutSubscribe;
  }

}
