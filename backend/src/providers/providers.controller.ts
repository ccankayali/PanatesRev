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
  async getExample(@CurrentUser() currentuser ) {
    return `Current user ID: ${currentuser}`;
  }
  @Get("")
  async AllProviders(){
    return this.providerService.getAllProviders()
  }
  @Get("getComment")//Tüm yorumları görüntüleme
  async findAll(): Promise<Company[]> {
    return this.providerService.getComment();
  }
  @Get("/company/comments")//şirketin hizmetlerine yapılan yorumları detaylı şekilde görüntüle
  async gettCommentForCompany(@CurrentUser() companyId: string): Promise<Comment[]> {
    return await this.commentService.getCommentForCompany(companyId)
  }
  @Get('/comments')
  async getUserComments(@CurrentUser() companyId: string) {
    return this.providerService.getUserComments(companyId);
  }
  @Post("/addToCart/:serviceId")
  async addToCart(@CurrentUser() currentuser,
  @Param('serviceId') serviceId: string,){
    return this.providerService.addToCart(currentuser,serviceId)
  }
  @Post("/removeService/:serviceId")
  async removeservice(@CurrentUser() currentuser,
  @Param('serviceId') serviceId: string,){
    return this.providerService.removeService(currentuser,serviceId)
  }
  @Get('cart')
  async getCartItems(@CurrentUser() userId): Promise<string[]> {
    return this.providerService.getCartItems(userId);
  }


  @Post('/services/:serviceId')//şirket bünyesine hizmet ekleme
  async addServiceToCompany(
    @CurrentUser() currentuser,
    @Param('serviceId') serviceId: string,
  ) {
    return this.providerService.addServiceToCompany(currentuser, serviceId);
  }
 
  
  @Get('/services')//şirketin hizmetlerini görüntüle
  async getServicesOfCompany(@CurrentUser() companyId): Promise<Service[]> {
    return this.providerService.getServicesOfCompany(companyId);
  }
  @Delete("/:companyId/:serviceId")//Company'e ait hizmeti silme.
  async deleteServicesOfCompany(@Param("companyId") companyId: string,
    @Param("serviceId") serviceId: string,) {
    return this.providerService.deleteServiceForCompany(serviceId, companyId)
  }
}
