import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesDTO } from './dtos/create.service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}
  @Get('/')
  async allService() {
    return this.servicesService.getAllServices();
  }
  @Get('/getService/:id')
  async getService(@Param('id') id: string) {
    return this.servicesService.getService(id);
  }
  @Post('/add')
  add(@Body() dto: CreateServicesDTO) {
    return this.servicesService.addService(dto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
