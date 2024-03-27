// commit.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitService } from './commit.service';
import { CommitController } from './commit.controller';
import { Commit, CommitSchema } from './commit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Commit.name, schema: CommitSchema }]),
  ],
  providers: [CommitService],
  controllers: [CommitController],
})
export class CommitModule {}
