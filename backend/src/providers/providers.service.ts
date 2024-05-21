import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
//import { CreateServicesDTO } from '../services/dtos/create.service.dto';
//import { ServicesService } from '../services/services.service';
//import { Service, ServiceDocument } from '../services/schemas/services.schema';
import { IdService } from '../auth/id/id_components';
import { Service } from '../services/schemas/services.schema';
@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Company.name)
    private readonly providersModel: Model<Company>,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
  ) {}
  //
  async getAllProviders(): Promise<Company[]> {
    return await this.providersModel.find().exec();
  }
  //
  async getComment(): Promise<Company[]> {
    return await this.providersModel.find().populate('comment').exec();
  }
  //
  async getUserComments(companyId: string) {
    try {
      const company = await this.providersModel.findById(companyId).exec();
      if (!company) {
        throw new Error('Company not found');
      }
      return company.comment;
    } catch (error) {
      throw new Error('Error while getting user comments');
    }
  }
  //
  async deleteServiceForCompany(
    service_id: string,
    companyId: string,
  ): Promise<any> {
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
  //
  async addServiceToCompany(
    companyId: string,
    serviceId: string,
  ): Promise<Company> {
    const company = await this.providersModel.findById(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    const service = await this.serviceModel.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }
    const existingService = company.services.find(id => id === service._id);
  if (existingService) {
    throw new Error('Bu hizmet zaten mevcut.');
  }
    company.services.push(service._id);
    company.shopCart = company.shopCart.filter(id => id !== service._id);
    return company.save();
  }
  //
  async removeService(companyId: string,
    serviceId: string,): Promise<Company> {
      const company = await this.providersModel.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }
      const service = await this.serviceModel.findById(serviceId);
      if (!service) {
        throw new Error('Service not found');
      }
      company.shopCart = company.shopCart.filter(id => id !== service._id);
      return company.save();
  }
  //
  async addToCart(userId: string, productId: string): Promise<Company> {
    const company = await this.providersModel.findById(userId);
    const existingProductIndex = company.shopCart.findIndex(item => item === productId);
    // If the productId already exists, do not perform the addition
    if (existingProductIndex !== -1) {
      alert('Ürün zaten sepete eklenmiş.');
      return company;
    }
  

    company.shopCart.push(productId);
  
    // Save the updated company object
    return await company.save();
  }
  //
  async getCartItems(userId: string): Promise<string[]> {
    const company = await this.providersModel.findById(userId);
    return company.shopCart;
  }
  //
  async getServicesOfCompany(companyId: string): Promise<Service[]> {
    const company = await this.providersModel
      .findById(companyId)
      .populate('services')
      .exec();
    if (!company) {
      throw new Error('Company not found');
    }
    // Servislerin _id'lerini alıp bu _id'lerle gerçek servis nesnelerini çekiyoruz
    const serviceIds = company.services;
    const services = await this.serviceModel
      .find({ _id: { $in: serviceIds } })
      .exec();
    return services;
  }
}
