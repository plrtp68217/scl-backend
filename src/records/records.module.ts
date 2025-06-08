import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Record } from './records.model';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [
    SequelizeModule.forFeature([Record])
  ]
})
export class RecordsModule {}
