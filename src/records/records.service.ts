import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Record } from './records.model';

import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordsService {
  constructor(
      @InjectModel(Record)
      private recordModel: typeof Record,
  ) {}

  async getRecord(userId: number, gameId: string) {
    let record = await this.recordModel.findOne({
      where: {
        userId,
        gameId,
      }
    });

    return record;
  }

  async createRecord(dto: CreateRecordDto) {
    let record = await this.recordModel.create(dto);

    return record;
  }

  async updateRecord(dto: UpdateRecordDto) {
    let record = await this.getRecord(dto.userId, dto.gameId);

    record?.update(dto);

    return record;
  }
}
