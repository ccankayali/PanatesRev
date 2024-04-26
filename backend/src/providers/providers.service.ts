import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
<<<<<<< HEAD
//import { CreateServicesDTO } from '../services/dtos/create.service.dto';
//import { ServicesService } from '../services/services.service';
//import { Service, ServiceDocument } from '../services/schemas/services.schema';
import {IdService} from '../auth/id/id_components';
import { Service } from '../services/schemas/services.schema';
=======
import { IdService } from '../auth/id/id_components';
import { Service } from 'src/services/schemas/services.schema';
>>>>>>> 9d526d4cd0be76e7f4bbb4c89937ada6a31c74a2
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
    return { id: createdCompany._id, name: createdCompany.name, email: createdCompany.email, password: createdCompany.password, comment: createdCompany.comment };
  }
  async getAllProviders(): Promise<Company[]> {
    return await this.providersModel.find().exec();
  }
  async getComment(): Promise<Company[]> {
    return await this.providersModel.find().populate('comment').exec()
  }
  async deleteServiceForCompany(service_id: string, companyId: string): Promise<any> {
    const company = await this.providersModel.findById(companyId);
    if (!company) {
        throw new Error('Company not found');
    }
    // Hizmeti silmek için önce hizmetin varlığını kontrol etmek
    const service = await this.serviceModel.findById(service_id);
    if (!service) {
        throw new Error('Service not found');
    }

    // Company belgesinden service_id'yi kaldırma
    const index = company.services.indexOf(service_id);
    if (index !== -1) {
        company.services.splice(index, 1);
    } else {
        throw new Error('Service not associated with this company');
    }

    // Company belgesini kaydet
    await company.save();

    // Hizmeti sil ve sonucu döndür
    return await this.serviceModel.findByIdAndDelete(service_id);
  }
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
