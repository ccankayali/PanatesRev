import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CommentService } from 'src/commit/comment.service';
import { Comment } from 'src/commit/comment.entity';
import { ProvidersService } from './providers.service';
import { Company } from './schemas/company.schema';
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
  @Get()
  async getProvider(@Req() request) {
    const provId = request.company.id;
    return this.providerService.getProviders(provId);
  }
  @Get("getComment")
  async findAll(): Promise<Company[]> {
    return this.providerService.getComment();
  }
  //services add
  /*@Post('services-add')
  async addService(@Body() createServicesServiceDTO: CreateServicesDTO) {
    const companyId = createServicesServiceDTO.company_id;
    return this.providerService.addServiceForCompany(
      companyId,
      createServicesServiceDTO,
    );
  }
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
  @Get("/:companyId/comments")
  async gettCommentForCompany(@Param("companyId") companyId: string): Promise<Comment[]> {
    return await this.commentService.getCommentForCompany(companyId)
  }
 
}
