import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateUserChannelDto } from './dto/create-user-channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { DeleteChannelDto } from './dto/delete-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './channels.model';
import { UserChannel } from './users-channels.model';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get('all')
  getAllChannels(): Promise<Channel[]> {
      return this.channelsService.getAllChannels();
  }

  @Get(':userId')
  getChannels(@Param('userId') userId: number): Promise<Channel[]> {
      return this.channelsService.getUserChannelsWithoutSubscribe(userId);
  }

  @Post('subscribe')
  createSubscribe(@Body() dto: CreateUserChannelDto): Promise<UserChannel>  {
    return this.channelsService.createUserChannel(dto);
  }

  @Post('create')
  createChannel(@Body() dto: CreateChannelDto): Promise<Channel>  {
    return this.channelsService.createChannel(dto);
  }
  
  @Post('update')
  updateChannel(@Body() dto: UpdateChannelDto): Promise<Channel>  {
    return this.channelsService.updateChannel(dto);
  }

  @Post('delete')
  deleteChannel(@Body() dto: DeleteChannelDto): Promise<boolean>  {
    return this.channelsService.deleteChannel(dto);
  }
}