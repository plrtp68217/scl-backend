import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Record } from './records.model';

import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordResponseDto } from './dto/record-response.dto';

import { User } from 'src/users/users.model';

@Injectable()
export class RecordsService {
  constructor(
      @InjectModel(Record)
      private recordModel: typeof Record,
  ) {}

  async getRecord(userId: number, gameId: string): Promise<Record | null> {
    let record = await this.recordModel.findOne({
      where: {
        userId,
        gameId,
      }
    });

    return record;
  }

  async getBestRecords(gameId: string): Promise<RecordResponseDto[] | null> {
    let records = await this.recordModel.findAll({
      where: {
        gameId
      },
      order: [
        ['score', 'DESC']
      ],
      limit: 100,
      include: [{
        model: User,
        attributes: ['name'],
        required: false,
      }],
    })

    return records.map(record => new RecordResponseDto(record));
  }

  async createRecord(dto: CreateRecordDto): Promise<Record> {
    let record = await this.recordModel.create(dto);

    return record;
  }

  async updateRecord(dto: UpdateRecordDto): Promise<Record> {
    let record = await this.getRecord(dto.userId, dto.gameId);
    await record!.update(dto);

    return record!;
  }
}
