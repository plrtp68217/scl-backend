import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Action } from './actions.model';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService],
  imports: [
    SequelizeModule.forFeature([Action])
  ]
})
export class ActionsModule {}
