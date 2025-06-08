import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateOptions } from 'sequelize';
import { UpdateRecordDto } from './dto/update-record.dto';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/:userId/:gameId')
  get(@Param('userId') userId: number, @Param('gameId') gameId: string) {
    return this.recordsService.getRecord(userId, gameId);
  }

  @Post()
  create(@Body() dto: CreateRecordDto) {
    return this.recordsService.createRecord(dto);
  }

  @Put()
  update(@Body() dto: UpdateRecordDto) {
    return this.recordsService.updateRecord(dto);
  }
}
