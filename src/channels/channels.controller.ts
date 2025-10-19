import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateUserChannelDto } from './dto/create-user-channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { DeleteChannelDto } from './dto/delete-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get(':userId')
  getChannels(@Param('userId') userId: number) {
      return this.channelsService.getUserChannelsWithoutSubscribe(userId);
  }

  @Post('subscribe')
  createSubscribe(@Body() dto: CreateUserChannelDto)  {
    return this.channelsService.createUserChannel(dto);
  }

  @Post('create')
  createChannel(@Body() dto: CreateChannelDto)  {
    return this.channelsService.createChannel(dto);
  }
  
  @Post('update')
  updateChannel(@Body() dto: UpdateChannelDto)  {
    return this.channelsService.updateChannel(dto);
  }

  @Post('delete')
  deleteChannel(@Body() dto: DeleteChannelDto)  {
    return this.channelsService.deleteChannel(dto);
  }
}