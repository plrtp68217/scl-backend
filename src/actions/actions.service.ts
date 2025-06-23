import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Action } from './actions.model';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action)
    private actionModel: typeof Action
  ) {}

  async getSummary() {
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

  async getSummaryInterval(date_start: Date, date_end: Date) {
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

  async getGameActivity(gameId: string) {
    const gameActivity = await this.actionModel.count({
      where: {
        action: gameId
      }
    });

    return {gameActivity: gameActivity || 'Not Found'};
  }

  async getGameActivityInterval(gameId: string, date_start: Date, date_end: Date) {
    const gameActivityInterval = await this.actionModel.count({
      where: {
        action: gameId,
        date: {
          [Op.gte]: date_start,
          [Op.lte]: date_end,
        }
      }
    });

    return {gameActivityInterval: gameActivityInterval || 'Not Found'};
  }
}
