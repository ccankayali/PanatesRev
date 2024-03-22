import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider, ProviderDocument } from './schemas/provider.schema';
import { CreateProvidersDTO } from '../providers/dtos/create.provider.dto';
import { FilterProvidersDTO } from '../providers/dtos/filter.provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel('ProvidersService')
    private readonly providersModel: Model<ProviderDocument>,
  ) {}

  async getFilteredProviders(
    filterProvidersDTO: FilterProvidersDTO,
  ): Promise<Provider[]> {
    const { category, search } = filterProvidersDTO;
    let providers = await this.getAllProviders();

    if (search) {
      providers = providers.filter(
        (provider) =>
          provider.name.includes(search) ||
          provider.description.includes(search),
      );
    }

    if (category) {
      providers = providers.filter(
        (provider) => provider.category === category,
      );
    }

    return providers;
  }

  async getAllProviders(): Promise<Provider[]> {
    const providers = await this.providersModel.find().exec();
    return providers;
  }

  async getProvider(id: string): Promise<Provider> {
    const provider = await this.providersModel.findById(id).exec();
    return provider;
  }

  async addProvider(
    createProvidersServiceDTO: CreateProvidersDTO,
  ): Promise<Provider> {
    const newprovider = await this.providersModel.create(
      createProvidersServiceDTO,
    );
    return newprovider.save();
  }

  async updateProvider(
    id: string,
    createProvidersServiceDTO: CreateProvidersDTO,
  ): Promise<Provider> {
    const updatedprovider = await this.providersModel.findByIdAndUpdate(
      id,
      createProvidersServiceDTO,
      { new: true },
    );
    return updatedprovider;
  }

  async deleteProvider(id: string): Promise<any> {
    const deletedprovider = await this.providersModel.findByIdAndDelete(id);
    return deletedprovider;
  }
}
