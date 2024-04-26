// commit.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Company } from 'src/auth/schemas/providers.schema';

@Controller('comments')
export class CommentController {
    constructor(private readonly commitService: CommentService) { }

    @Post()
    async create(@Body() createCommentDto: Comment): Promise<Comment> {
        return this.commitService.create(createCommentDto);
    }

    @Get()//tüm şirketlrin ve yorumların getirildiği yer.
    async findAll(): Promise<Comment[]> {
        return this.commitService.find();
    }
    @Get('userr/:userId')//Kullanıcının yaptığı yorumlar.hangi servis olduğu da belli oluyor.
  async getCommentsByUser(@Param('userId') userId: string) {
    return this.commitService.getCommentsByUser(userId);
  }
    @Get('user/:userId')//Kullanıcının yaptığı yorumlar.
    async findByUserId(@Param('userId') userId: string): Promise<Comment[]> {
        return this.commitService.findByUserId(userId);
    }
    @Get("/sirket/:sirketId")//ŞirketId ile yapılan yorumları getirme
    async sirketYorumlariGetir(@Param("sirketId") company: string): Promise<Comment[]> {
        return await this.commitService.getCommentForCompany(company);
    }
    @Post("/sirket/:sirketId")//ŞirketId ile yorum yapma kısmı
    async yorumYap(@Param("sirketId") company: string, @Body() yorum: Comment): Promise<Comment> {
        return await this.commitService.yorumYap(company, yorum);
    }
}
