import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDTO } from './dtos/company.dto';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
//import { CreateServicesDTO } from '../services/dtos/create.service.dto';
//import { ServicesService } from '../services/services.service';
//import { Service, ServiceDocument } from '../services/schemas/services.schema';
import {IdService} from '../id/id_component'
import { Service } from 'src/services/schemas/services.schema';
@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Company.name)
    private readonly providersModel: Model<Company>,
    private readonly idService: IdService,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>
    
  ) { }
  async createcompany(companyDto: Company): Promise<any> {
    const createdCompany = new this.providersModel({
      ...companyDto,
      _id: this.idService.generateId(),
    });
    await createdCompany.save();

    // Return a user DTO without password for security
    return { id: createdCompany._id, name: createdCompany.name, email: createdCompany.email,password:createdCompany.password,comment:createdCompany.comment };
  }
  async getAllProviders(): Promise<Company[]> {
    return await this.providersModel.find().exec();
  }


  async getComment(): Promise<Company[]> {
    
    return await this.providersModel.find().populate('comment').exec()
  }
  
  // providers.service.ts
  /*async addServiceForCompany(
    companyId: string,
    createServicesServiceDTO: CreateServicesDTO,
  ): Promise<Service> {
    return await this.servicesService.addService(createServicesServiceDTO);
  }
  async deleteServiceForCompany(service_id: string): Promise<any> {
    return await this.ServicesModel.findByIdAndDelete(service_id);
  }

  async updateServiceForCompany(
    service_id: string,
    createServicesServiceDTO: CreateServicesDTO,
  ): Promise<Service> {
    return await this.ServicesModel.findByIdAndUpdate(
      service_id,
      createServicesServiceDTO,
      { new: true },
    );
    //findByIdAndUpdate ilk parametresi güncellenecek verilerin id si , ikinci parametre güncellenecek verilerin nesnesini alır, üçüncü parametre güncel veriyi alır.
  }*/
  async addServiceToCompany(companyId: string, serviceId: string): Promise<Company> {
    const company = await this.providersModel.findById(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    
    const service = await this.serviceModel.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    company.services.push(service._id);
    return company.save();
  }
  async getAllServices(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }
  async getServicesOfCompany(companyId: string): Promise<Service[]> {
    const company = await this.providersModel.findById(companyId).populate('services').exec();
    if (!company) {
      throw new Error('Company not found');
    }
    // Servislerin _id'lerini alıp bu _id'lerle gerçek servis nesnelerini çekiyoruz
    const serviceIds = company.services;
    const services = await this.serviceModel.find({ _id: { $in: serviceIds } }).exec();
    return services;
}
  
}
