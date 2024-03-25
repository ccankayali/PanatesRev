import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDTO } from "./dtos/company.dto";
import { Model } from "mongoose";
import { ServiceCompany, CompanyDocument } from "./schemas/company.schema"
import { CreateServicesDTO } from "../services/dtos/create.service.dto"
import { ServicesService } from "../services/services.service"
import { Service } from "../services/schemas/services.schema"
@Injectable()
export class ProvidersService {
    constructor(@InjectModel(CompanyDTO.name) private readonly providersModel: Model<ServiceCompany>, private readonly servicesService: ServicesService) { }

    async getAllProviders(): Promise<ServiceCompany[]> {
        return this.providersModel.find().exec()
    }

    async getProviders(companyId: string): Promise<ServiceCompany> {
        return this.providersModel.findById(companyId).exec()
    }
    // providers.service.ts
    async addServiceForCompany(companyId: string, createServicesServiceDTO: CreateServicesDTO): Promise<Service> {
        return this.servicesService.addService(createServicesServiceDTO);
    }



}