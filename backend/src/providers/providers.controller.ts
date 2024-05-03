import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CommentService } from '../commit/comment.service';
import { Comment } from '../commit/comment.entity';
import { ProvidersService } from './providers.service';
import { Company } from './schemas/company.schema';
import { Service } from '../services/schemas/services.schema';
import { CurrentUser } from 'src/auth/decorators/current';
@Controller('providers')
export class ProvidersController {
  constructor(
    private readonly providerService: ProvidersService,
    private readonly commentService: CommentService,
  ) { }
  @Post()
  async creatCompany(@Body() createdCompany: Company): Promise<Company> {
    return this.providerService.createcompany(createdCompany)
  }
  @Get("current")
  async getExample(@CurrentUser() userId: string) {
    return `Current user ID: ${userId}`;
  }
  @Get("")
  async AllProviders(){
    return this.providerService.getAllProviders()
  }
  @Get("getComment")//Tüm yorumları görüntüleme
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
  @Delete("/:companyId/:serviceId")//Company'e ait hizmeti silme.
  async deleteServicesOfCompany(@Param("companyId") companyId: string,
    @Param("serviceId") serviceId: string,) {
    return this.providerService.deleteServiceForCompany(serviceId, companyId)
  }
}
