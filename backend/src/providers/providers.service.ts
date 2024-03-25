import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDTO } from "./dtos/company.dto";
import { Model } from "mongoose";
import { ServiceCompany, CompanyDocument } from "./schemas/company.schema"
import { CreateServicesDTO } from "../services/dtos/create.service.dto"
import { ServicesService } from "../services/services.service"
import { Service, ServiceDocument } from "../services/schemas/services.schema"
@Injectable()
export class ProvidersService {
    constructor(@InjectModel(CompanyDTO.name) private readonly providersModel: Model<ServiceCompany>, private readonly servicesService: ServicesService, private readonly ServicesModel: Model<ServiceDocument>) { }

    async getAllProviders(): Promise<ServiceCompany[]> {
        return await this.providersModel.find().exec()
    }

    async getProviders(companyId: string): Promise<ServiceCompany> {
        return await this.providersModel.findById(companyId).exec()
    }
    
    async addServiceForCompany( createServicesServiceDTO: CreateServicesDTO): Promise<Service> {
        return await this.servicesService.addService(createServicesServiceDTO);
    }
    async deleteServiceForCompany(service_id: string): Promise<any> {
        return await this.ServicesModel.findByIdAndDelete(service_id)
    }

    async updateServiceForCompany(service_id: string, createServicesServiceDTO: CreateServicesDTO): Promise<Service> {
        return await this.ServicesModel.findByIdAndUpdate(service_id, createServicesServiceDTO, { new: true })
        //findByIdAndUpdate ilk parametresi güncellenecek verilerin id si , ikinci parametre güncellenecek verilerin nesnesini alır, üçüncü parametre güncel veriyi alır.
    }


}