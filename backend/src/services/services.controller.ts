import { Body, Controller, Post, Delete, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesDTO } from './dtos/create.service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post('/add')
  add(@Body() dto: CreateServicesDTO) {
    return this.servicesService.addService(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
