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
    @InjectModel('Service') private readonly serviceModel: Model<Service>
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

  async getProviders(companyId: string): Promise<Company> {
    return await this.providersModel.findById(companyId).exec();
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
  
}
