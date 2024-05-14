// commit.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Company } from 'src/auth/schemas/providers.schema';
import { CurrentUser } from 'src/auth/decorators/current';

@Controller('comments')
export class CommentController {
    constructor(private readonly commitService: CommentService) { }

    @Post()
    async create(@Body() createCommentDto: Comment): Promise<Comment> {
        return this.commitService.create(createCommentDto);
    }

    @Get()//tüm şirketlrin ve yorumların getirildiği yer.
    async findAll(): Promise<Comment[]> {
        return this.commitService.findAll();
    }
    @Get('userr/:userId')//Kullanıcının yaptığı yorumlar.hangi servis olduğu da belli oluyor.
  async getCommentsByUser(@Param('userId') userId: string) {
    return this.commitService.getCommentsByUser(userId);
  }
  //servisId'ye göre o servise yapılan yorumları ve kimin yaptığı belli oluyor
  //Şirket sahibi bu API çağrısını kullanarak sistemde kayıtlı hizmetinin yorumlarını listeleyebilecektir.
    @Get('user/:serviceID')//Kullanıcının yaptığı yorumlar.
    async findByUserId(@Param('userId') serviceID: string): Promise<Comment[]> {
        return this.commitService.getCommentForService(serviceID);
    }
    @Get("/sirket/:sirketId")//ŞirketId ile yapılan yorumları getirme
    async sirketYorumlariGetir(@Param("sirketId") company: string): Promise<Comment[]> {
        return await this.commitService.getCommentForCompany(company);
    }
    @Post("/userComment")//ŞirketId ile yorum yapma kısmı
    async yorumYap(@CurrentUser() userId:string ,@Body() yorum: Comment): Promise<Comment> {
        return await this.commitService.yorumYap(userId,yorum);
    }
}
