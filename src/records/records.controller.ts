import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordResponseDto } from './dto/record-response.dto';
import { Record } from './records.model';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('test')
  getTest(): string {
    return  'test endpoint';
  }

  @Get('game/:gameId')
  getBestRecords(@Param('gameId') gameId: string): Promise<RecordResponseDto[] | null> {
    return this.recordsService.getBestRecords(gameId);
  }

  @Get('user/:userId/:gameId')
  get(@Param('userId') userId: number, @Param('gameId') gameId: string): Promise<Record | null> {
    return this.recordsService.getRecord(userId, gameId);
  }


  @Post()
  create(@Body() dto: CreateRecordDto): Promise<Record>  {
    return this.recordsService.createRecord(dto);
  }

  @Put()
  update(@Body() dto: UpdateRecordDto): Promise<Record> {
    return this.recordsService.updateRecord(dto);
  }
}
