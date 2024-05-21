// commit.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Company } from 'src/auth/schemas/providers.schema';
import { CurrentUser } from 'src/auth/decorators/current';

@Controller('comments')
export class CommentController {
    constructor(private readonly commitService: CommentService) { }

    @Post("/userComment")//ŞirketId ile yorum yapma kısmı
    async createcomment(@CurrentUser() userId:string ,@Body() yorum: Comment): Promise<Comment> {
        return await this.commitService.create_comment(userId,yorum);
    }
    @Get('service/:serviceId')//company hizmet ID ait yapılan tüm yorumları kullanıcı ismi ve yorum şeklinde görebilcek.
    async getCommentsByService(@Param('serviceId') serviceId: string): Promise<Comment[]> {
        return this.commitService.findCommentsByService(serviceId);
    }
    @Get("/sirket/:sirketId")//ŞirketId ile yapılan yorumları getirme
    async sirketYorumlariGetir(@Param("sirketId") company: string): Promise<Comment[]> {
        return await this.commitService.getCommentForCompany(company);
    }
    
}
