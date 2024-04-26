import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CommentService } from '../commit/comment.service';
import { Comment } from '../commit/comment.entity';
import { ProvidersService } from './providers.service';
import { Company } from './schemas/company.schema';
import { Service } from '../services/schemas/services.schema';
@Controller('providers')
export class ProvidersController {
  constructor(
    private readonly providerService: ProvidersService,
    private readonly commentService: CommentService,

    //private readonly servicesService: ServicesService,
  ) { }
  @Post()
  async creatCompany(@Body() createdCompany: Company): Promise<Company> {
    return this.providerService.createcompany(createdCompany)
  }
  @Get("getComment")
  async findAll(): Promise<Company[]> {
    return this.providerService.getComment();
  }
  @Get("/:companyId/comments")//şirketin hizmetlerine yapılan yorumları detaylı şekilde görüntüle
  async gettCommentForCompany(@Param("companyId") companyId: string): Promise<Comment[]> {
    return await this.commentService.getCommentForCompany(companyId)
  }
  @Post('companies/:companyId/services/:serviceId')//şirket bünyesine hizmet ekleme
  async addServiceToCompany(
    @Param('companyId') companyId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.providerService.addServiceToCompany(companyId, serviceId);
  }
  @Get('/:companyId/services')//şirketin hizmetlerini görüntüle
  async getServicesOfCompany(@Param('companyId') companyId: string): Promise<Service[]> {
    return this.providerService.getServicesOfCompany(companyId);
  }
   /*
  @Delete('service-delete/:serviceId')
  async deleteService(@Param('serviceId') serviceId: string): Promise<Service> {
    return await this.providerService.deleteServiceForCompany(serviceId);
  }
  @Patch('service-update/:serviceId')
  async updateService(
    @Param('serviceId') serviceId: string,
    @Body() updateServiceDto: CreateServicesDTO,
  ): Promise<Service> {
    return await this.providerService.updateServiceForCompany(
      serviceId,
      updateServiceDto,
    );
  }
}*/
}
