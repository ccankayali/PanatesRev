// commit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commit } from './commit.entity';

@Injectable()
export class CommitService {
    constructor(@InjectModel(Commit.name) private readonly commitModel: Model<Commit>) { }

    async create(commit: Commit): Promise<Commit> {
        const createdCommit = new this.commitModel(commit);
        return createdCommit.save();
    }
    async find(): Promise<Commit[]> {
        return this.commitModel.find().populate('user').exec()
    }

    async findAll(): Promise<Commit[]> {
        return this.commitModel.find().exec();
    }
    async findByUserId(userId: string): Promise<Commit[]> {
        return this.commitModel.find({ user: userId }).exec();
    }
}
