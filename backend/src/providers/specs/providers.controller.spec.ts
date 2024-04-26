import { ProvidersController } from '../providers.controller';
import { ProvidersService } from '../providers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../../commit/comment.service';

describe('ProvidersController', () => {
  let controller: ProvidersController;
  let service: ProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [
        {
          provide: ProvidersService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findByUserId: jest.fn(),
            getCommentForCompany: jest.fn(),
            yorumYap: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProvidersController>(ProvidersController);
    service = module.get<ProvidersService>(ProvidersService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('addServiceToCompany', () => {
    it('should call ProvidersService.addServiceToCompany', async () => {
      const companyId = '1';
      const serviceId = '2';
      await controller.addServiceToCompany(companyId, serviceId);
      expect(service.addServiceToCompany).toHaveBeenCalledWith(
        companyId,
        serviceId,
      );
    });
  });
  describe('getServicesOfCompany', () => {
    it('should call ProvidersService.getServicesOfCompany', async () => {
      const companyId = '1';
      await controller.getServicesOfCompany(companyId);
      expect(service.getServicesOfCompany).toHaveBeenCalledWith(companyId);
    });
  });
});
