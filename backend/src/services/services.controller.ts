import { Controller, Post } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller()
export class ServicesController {
  constructor(private servicesService: ServicesService) {}
  @Post('add')
  add() {
    return 'service added';
  }
  @Post('delete')
  delete() {
    return 'service deleted';
  }
}
