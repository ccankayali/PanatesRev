<<<<<<< HEAD
import { Body, Controller, Post, Delete, Param } from '@nestjs/common';
=======
import { Body, Controller, Post,Param } from '@nestjs/common';
>>>>>>> origin/main
import { ServicesService } from './services.service';
import { CreateServicesDTO } from './dtos/create.service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post('/add')
  add(@Body() dto: CreateServicesDTO) {
    return this.servicesService.addService(dto);
  }

<<<<<<< HEAD
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
=======
  @Post('/delete')
  delete(@Param('name') name: string) {
    return this.servicesService.deleteService(name);
>>>>>>> origin/main
  }
}
