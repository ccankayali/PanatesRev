// commit.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './comment.entity';
import { IdService } from 'src/auth/id/id_components';
import { Company, CompanySchema } from 'src/auth/schemas/providers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema },{ name: Company.name, schema: CompanySchema }]),
  ],
  providers: [CommentService, IdService],
  controllers: [CommentController],
})
export class CommitModule { }
