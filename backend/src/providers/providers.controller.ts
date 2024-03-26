import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateServicesDTO } from '../services/dtos/create.service.dto';

import { ServicesService } from '../services/services.service';
import { Service } from 'src/services/schemas/services.schema';
@Controller('providers')
export class ProvidersController {
  constructor(
    private readonly providerService: ProvidersService,
    private readonly servicesService: ServicesService,
  ) {}
  @Get()
  async getProvider(@Req() request) {
    const provId = request.company.id;
    return this.providerService.getProviders(provId);
  }

    //services add
    @Post('services-add')
    async addService(@Body() createServicesServiceDTO: CreateServicesDTO) {
        const companyId = createServicesServiceDTO.company_id
        return this.providerService.addServiceForCompany(companyId, createServicesServiceDTO);
    }
    @Delete('service-delete/:serviceId')
    async deleteService(@Param('serviceId') serviceId: string): Promise<Service> {

        return await this.providerService.deleteServiceForCompany(serviceId)
    }
    @Patch('service-update/:serviceId')
    async updateService(@Param('serviceId') serviceId: string, @Body() updateServiceDto: CreateServicesDTO): Promise<Service> {

        return await this.providerService.updateServiceForCompany(serviceId, updateServiceDto)
    }
    
}