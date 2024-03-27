// commit.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Commit } from './commit.entity';
import { CommitService } from './commit.service';

@Controller('commits')
export class CommitController {
    constructor(private readonly commitService: CommitService) { }

    @Post()
    async create(@Body() createCommitDto: Commit): Promise<Commit> {
        return this.commitService.create(createCommitDto);
    }

    @Get()
    async findAll(): Promise<Commit[]> {
        return this.commitService.find();
    }
    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<Commit[]> {
        return this.commitService.findByUserId(userId);
    }
}
