import { ProvidersService } from '../providers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Company } from '../schemas/company.schema';
import { Model, Query } from 'mongoose';
import { Service } from '../../services/schemas/services.schema';
import { IdService } from '../../auth/id/id_components';

describe('ProvidersService', () => {
  let service: ProvidersService;
  let companyModel: Model<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: getModelToken(Company.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Service.name),
          useValue: Model,
        },
        {
          provide: IdService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
    companyModel = module.get<Model<Company>>(getModelToken(Company.name));
  });

  it('should get all providers', async () => {
    const mockCompany1 = {
      _id: 'id_1',
      name: 'Company_1',
      email: 'testcompany@example.com',
      password: 'password_1',
      comment: 'comment 1',
    } as Company;

    const result: Company[] = [mockCompany1,]

    jest.spyOn(companyModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(result),
    } as any as Query<Company[], Company, {}>);
  });
});
