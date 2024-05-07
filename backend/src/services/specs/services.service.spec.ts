// import { Test, TestingModule } from '@nestjs/testing';
// import { ServicesService } from '../services.service';
// import { CreateServicesDTO } from '../dtos/create.service.dto';
// import { FilterServicesDTO } from '../dtos/filter.service.dto';
// import { Service, ServiceDocument } from '../schemas/services.schema';
// import { Model } from 'mongoose';
// import { IdService } from 'src/auth/id/id_components';

// describe('ServicesService', () => {
//   let service: ServicesService;
//   let serviceModel: Model<ServiceDocument>;
//   let idService: IdService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ServicesService,
//         {
//           provide: 'ServiceModelToken',
//           useValue: Model,
//         },
//         IdService,
//       ],
//     })
//       .overrideProvider(ServicesService)
//       .useValue({
//         getFilteredServices: jest.fn(),
//         getAllServices: jest.fn(),
//         getService: jest.fn(),
//         findServicesByCompanyId: jest.fn(),
//         addService: jest.fn(),
//         updateService: jest.fn(),
//         deleteService: jest.fn(),
//       })
//       .compile();

//     service = module.get<ServicesService>(ServicesService);
//     serviceModel = module.get<Model<ServiceDocument>>(
//       'ServiceModelToken',
//     );
//     idService = module.get<IdService>(IdService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('getFilteredServices', () => {
//     it('should filter services by category', async () => {
//       const filterServicesDTO: FilterServicesDTO = {
//         category: 'Test Category',
//         search: '',
//       };

//       const services = [
//         {
//           _id: '1',
//           name: 'Test Service 1',
//           description: 'Test Service 1 Description',
//           category: 'Test Category',
//         },
//         {
//           _id: '2',
//           name: 'Test Service 2',
//           description: 'Test Service 2 Description',
//           category: 'Other Category',
//         },
//       ];

//       jest
//         .spyOn(service, 'getAllServices')
//         .mockResolvedValueOnce(services as Service[]);

//       const result = await service.getFilteredServices(filterServicesDTO);

//       expect(result).toBeDefined();
//       expect(result.length).toEqual(1);
//       expect(result[0].name).toEqual('Test Service 1');
//     });

//     it('should filter services by search', async () => {
//       const filterServicesDTO: FilterServicesDTO = {
//         category: '',
//         search: 'Test',
//       };

//       const services = [
//         {
//           _id: '1',
//           name: 'Test Service 1',
//           description: 'Test Service 1 Description',
//           category: 'Test Category',
//         },
//         {
//           _id: '2',
//           name: 'Other Service',
//           description: 'Test Service 2 Description',
//           category: 'Other Category',
//         },
//       ];

//       jest
//         .spyOn(service, 'getAllServices')
//         .mockResolvedValueOnce(services as Service[]);

//       const result = await service.getFilteredServices(filterServicesDTO);

//       expect(result).toBeDefined();
//       expect(result.length).toEqual(1);
//       expect(result[0].name).toEqual('Test Service 1');
//     });
//   });

//   describe('getAllServices', () => {
//     it('should return an array of services', async () => {
//       const services = [
//         {
//           _id: '1',
//           name: 'Test Service 1',
//           description: 'Test Service 1 Description',
//           category: 'Test Category',
//         },
//         {
//           _id: '2',
//           name: 'Test Service 2',
//           description: 'Test Service 2 Description',
//           category: 'Other Category',
//         },
//       ];

//       jest
//         .spyOn(serviceModel, 'find')
//         .mockResolvedValueOnce(services as ServiceDocument[]);

//       const result = await service.getAllServices();

//       expect(result).toBeDefined();
//       expect(Array.isArray(result)).toBeTruthy();
//       expect(result.length).toEqual(2);
//     });
//   });

//   describe('getService', () => {
//     it('should return a service by id', async () => {
//       const serviceId = '1';
//       const service = {
//         _id: serviceId,
//         name: 'Test Service',
//         description: 'Test Service Description',
//         category: 'Test Category',
//       };

//       jest
//         .spyOn(serviceModel, 'findById')
//         .mockResolvedValueOnce(service as ServiceDocument);

//       const result = await service.getService(serviceId);

//       expect(result).toBeDefined();
//       expect(result._id).toEqual(serviceId);
//       expect(result.name).toEqual('Test Service');
//     });
//   });

//   describe('findServicesByCompanyId', () => {
//     it('should return an array of services by company id', async () => {
//       const companyId = '1';
//       const services = [
//         {
//           _id: '1',
//           name: 'Test Service 1',
//           description: 'Test Service 1 Description',
//           category: 'Test Category',
//           company_id: companyId,
//         },
//         {
//           _id: '2',
//           name: 'Test Service 2',
//           description: 'Test Service 2 Description',
//           category: 'Other Category',
//           company_id: companyId,
//         },
//       ];

//       jest
//         .spyOn(serviceModel, 'find')
//         .mockResolvedValueOnce(services as ServiceDocument[]);

//       const result = await service.findServicesByCompanyId(companyId);

//       expect(result).toBeDefined();
//       expect(Array.isArray(result)).toBeTruthy();
//       expect(result.length).toEqual(2);
//     });
//   });

//   describe('addService', () => {
//     it('should add a new service', async () => {
//       const createServicesDTO: CreateServicesDTO = {
//         name: 'Test Service',
//         description: 'Test Service Description',
//         category: 'Test Category',
//         price: 100,
//       };

//       const createdService = {
//         _id: '1',
//         ...createServicesDTO,
//       };

//       jest
//         .spyOn(serviceModel, 'create')
//         .mockResolvedValueOnce(createdService as ServiceDocument);

//       const result = await service.addService(createServicesDTO);

//       expect(result).toBeDefined();
//       expect(result._id).toBeDefined();
//       expect(result.name).toEqual('Test Service');
//       expect(result.description).toEqual('Test Service Description');
//       expect(result.category).toEqual('Test Category');
//       expect(result.price).toEqual(100);
//     });
//   });

//   describe('updateService', () => {
//     it('should update a service by id', async () => {
//       const serviceId = '1';
//       const createServicesDTO: CreateServicesDTO = {
//         name: 'Updated Test Service',
//         description: 'Updated Test Service Description',
//         category: 'Updated Test Category',
//         price: 200,
//       };

//       const updatedService = {
//         _id: serviceId,
//         ...createServicesDTO,
//       };

//       jest
//         .spyOn(serviceModel, 'findByIdAndUpdate')
//         .mockResolvedValueOnce(updatedService as ServiceDocument);

//       const result = await service.updateService(
//         serviceId,
//         createServicesDTO,
//       );

//       expect(result).toBeDefined();
//       expect(result._id).toEqual(serviceId);
//       expect(result.name).toEqual('Updated Test Service');
//       expect(result.description).toEqual('Updated Test Service Description');
//       expect(result.category).toEqual('Updated Test Category');
//       expect(result.price).toEqual(200);
//     });
//   });

//   describe('deleteService', () => {
//     it('should delete a service by id', async () => {
//       const serviceId = '1';
//       const deletedService = {
//         _id: serviceId,
//         name: 'Test Service',
//         description: 'Test Service Description',
//         category: 'Test Category',
//         price: 100,
//       };

//       jest
//         .spyOn(serviceModel, 'findByIdAndDelete')
//         .mockResolvedValueOnce(deletedService as ServiceDocument);

//       const result = await service.deleteService(serviceId);

//       expect(result).toBeDefined();
//       expect(result._id).toEqual(serviceId);
//       expect(result.name).toEqual('Test Service');
//       expect(result.description).toEqual('Test Service Description');
//       expect(result.category).toEqual('Test Category');
//       expect(result.price).toEqual(100);
//     });
//   });
// });
