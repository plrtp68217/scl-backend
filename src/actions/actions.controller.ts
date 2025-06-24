import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { Action } from './actions.model';
import { ISummary } from './interfaces/ISummary';
import { ISummaryInterval } from './interfaces/ISummaryInterval';
import { IGameActivity } from './interfaces/IGameActivity';
import { IGameActivityInterval } from './interfaces/IGameActivityInterval';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService){}

  @Get('/summary')
  getSummary(): Promise<ISummary> {
    return this.actionsService.getSummary();
  }

  @Get('/summary/:date_start/:date_end')
  getSummaryInterval(
    @Param('date_start') date_start: Date,
    @Param('date_end') date_end: Date): Promise<ISummaryInterval>
  {
    return this.actionsService.getSummaryInterval(date_start, date_end);
  }

  @Get('/game/:action')
  getGameActivity(@Param('action') action: string): Promise<IGameActivity> {
    return this.actionsService.getGameActivity(action);
  }

  @Get('/game/:action/:date_start/:date_end')
  getGameActivityInterval(
    @Param('action') action: string,
    @Param('date_start') date_start: Date,
    @Param('date_end') date_end: Date): Promise<IGameActivityInterval>
  {
    return this.actionsService.getGameActivityInterval(action, date_start, date_end);
  }

  @Post()
  createAction(@Body() dto: CreateActionDto): Promise<Action> {
    return this.actionsService.createAction(dto);
  }
}
