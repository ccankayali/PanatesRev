// commit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.entity';
import { IdService } from '../auth/id/id_components';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        private idService: IdService,
    ) {}

    async create(commit: Comment): Promise<any> {
        const createdCommit = await this.commentModel.create({
            ...commit,
            _id: this.idService.generateId(),
        });
        return createdCommit;
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
    async getCommentForCompany(company: string): Promise<Comment[]> {
        return await this.commentModel.find({ company }).populate('service', '-_id').exec();
    }
    async yorumYap(company: string, yorum: Comment): Promise<Comment> {
        yorum.company = company;
        yorum._id=this.idService.generateId()
        const createdComment = new this.commentModel(yorum);
        await createdComment.save();
        return createdComment;
    }
}
