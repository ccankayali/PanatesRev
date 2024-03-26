import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/services.schema';
import { CreateServicesDTO } from './dtos/create.service.dto';
import { FilterServicesDTO, } from './dtos/filter.service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service')
    private readonly ServicesModel: Model<ServiceDocument>,
  ) {}

  async getFilteredServices(
    filterServicesDTO: FilterServicesDTO,
  ): Promise<Service[]> {
    const { category, search } = filterServicesDTO;
    let services = await this.getAllServices();

    if (search) {
      services = services.filter(
        (service) =>
          service.name.includes(search) ||
          service.description.includes(search),
      );
    }

    if (category) {
      services = services.filter(
        (service) => service.category === category,
      );
    }

    return services;
  }

  async getAllServices(): Promise<Service[]> {
    const services = await this.ServicesModel.find().exec();
    return services;
  }

  async getService(id: string): Promise<Service> {
    const service = await this.ServicesModel.findById(id).exec();
    return service;
  }

  async addService(
    createServicesServiceDTO: CreateServicesDTO,
  ): Promise<Service> {
    const newService = await this.ServicesModel.create(
      createServicesServiceDTO,
    );
    return newService.save();
  }

  async updateService(
    id: string,
    createServicesServiceDTO: CreateServicesDTO,
  ): Promise<Service> {
    const updatedService = await this.ServicesModel.findByIdAndUpdate(
      id,
      createServicesServiceDTO,
      { new: true },
    );
    return updatedService;
  }

  async deleteService(service_id: string): Promise<any> {
    const deletedService = await this.ServicesModel.findByIdAndDelete(service_id);
    return deletedService;
  }
}
