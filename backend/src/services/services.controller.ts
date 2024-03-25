import { Body, Controller, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesDTO } from './dtos/create.service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post('add')
  add(@Body() dto: CreateServicesDTO) {
    return this.servicesService.addService(dto);
  }

  @Post('delete')
  delete() {
    return 'service deleted';
  }
}
