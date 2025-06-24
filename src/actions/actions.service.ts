import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Action } from './actions.model';
import { CreateActionDto } from './dto/create-action.dto';
import { ISummary } from './interfaces/ISummary';
import { ISummaryInterval } from './interfaces/ISummaryInterval';
import { IGameActivity } from './interfaces/IGameActivity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action)
    private actionModel: typeof Action
  ) {}

  async getSummary(): Promise<ISummary> {
    const entrysCount = await this.actionModel.count({
      where: {
        action: 'entry',
      }
    });

    const actionsCount = await this.actionModel.count({
      where: {
        action: {
          [Op.ne]: 'entry',
        }
      }
    });

    const summary = {
      entrysCount: entrysCount || 'Not Found',
      actionsCount: actionsCount || 'Not Found',
    };

    return summary;
  }

  async getSummaryInterval(date_start: Date, date_end: Date): Promise<ISummaryInterval> {
    const entrysCountInterval = await this.actionModel.count({
      where: {
        action: 'entry',
        date: {
          [Op.gte]: date_start,
          [Op.lte]: date_end,
        }
      }
    });

    const actionsCountInterval = await this.actionModel.count({
      where: {
        action: {
          [Op.ne]: 'entry',
        },
        date: {
          [Op.gte]: date_start,
          [Op.lte]: date_end,
        }
      }
    });

    const summaryInterval = {
      entrysCountInterval: entrysCountInterval || 'Not Found',
      actionsCountInterval: actionsCountInterval || 'Not Found',
    };

    return summaryInterval;
  }

  async getGameActivity(action: string): Promise<IGameActivity> {
    const gameActivity = await this.actionModel.count({
      where: {
        action,
      }
    });

    return {gameActivity: gameActivity || 'Not Found'};
  }

  async getGameActivityInterval(action: string, date_start: Date, date_end: Date) {
    const gameActivityInterval = await this.actionModel.count({
      where: {
        action,
        date: {
          [Op.gte]: date_start,
          [Op.lte]: date_end,
        }
      }
    });

    return {gameActivityInterval: gameActivityInterval || 'Not Found'};
  }

  async createAction(dto: CreateActionDto): Promise<Action> {
    const action = await this.actionModel.create(dto);
    return action;
  }
}
