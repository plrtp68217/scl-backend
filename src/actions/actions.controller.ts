import { Controller, Get } from '@nestjs/common';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService){}

  @Get('/summary')
  getSummary() {
    return {'actions': 12, 'entrys': 80};
  }
}
