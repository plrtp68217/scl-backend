import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Action } from './actions.model';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action)
    private actionModel: typeof Action
  ) {}

}
