import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';

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

  @Get('/game/:action')
  getGameActivity(@Param('action') action: string) {
    return this.actionsService.getGameActivity(action);
  }

  @Get('/game/:action/:date_start/:date_end')
  getGameActivityInterval(
    @Param('action') action: string,
    @Param('date_start') date_start: Date,
    @Param('date_end') date_end: Date) 
  {
    return this.actionsService.getGameActivityInterval(action, date_start, date_end);
  }

  @Post()
  createAction(@Body() dto: CreateActionDto) {
    return this.actionsService.createAction(dto);
  }
}
