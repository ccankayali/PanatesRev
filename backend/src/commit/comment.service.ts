// commit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.entity';
import { IdService } from 'src/id/id_component';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>, private readonly idService: IdService) { }

    async create(commit: Comment): Promise<any> {
        const createdCommit = new this.commentModel({
            ...commit,
            _id: this.idService.generateId()
        });
        await createdCommit.save();
        return { id: createdCommit._id, commit_details: createdCommit.commit_details,commit_date:createdCommit.commit_date}
    }
    async find(): Promise<Comment[]> {
        return this.commentModel.find().populate('user').exec()
    }

    async findAll(): Promise<Comment[]> {
        return this.commentModel.find().exec();
    }
    async findByUserId(userId: string): Promise<Comment[]> {
        return this.commentModel.find({ user: userId }).exec();
    }
}
