// commit.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('commits')
export class CommentController {
    constructor(private readonly commitService: CommentService) { }

    @Post()
    async create(@Body() createCommentDto: Comment): Promise<Comment> {
        return this.commitService.create(createCommentDto);
    }

    @Get()
    async findAll(): Promise<Comment[]> {
        return this.commitService.find();
    }
    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<Comment[]> {
        return this.commitService.findByUserId(userId);
    }
}
