import { Controller, Get, Param } from '@nestjs/common';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService){}

  @Get('/summary')
  getSummary() {
    return this.actionsService.getSummary();
  }

  @Get('/summary/:date_start/:date_end')
  getSummaryInterval(
    @Param('date_start') date_start: Date,
    @Param('date_end') date_end: Date) 
  {
    return this.actionsService.getSummaryInterval(date_start, date_end);
  }

  @Get('/game/:gameId')
  getGameActivity(@Param('gameId') gameId: string) {
  }

  @Get('/game/:gameId/:date_start/:date_end')
  getGameActivityInterval(
    @Param('gameId') gameId: string,
    @Param('date_start') date_start: Date,
    @Param('date_end') date_end: Date) 
  {

  }
}
