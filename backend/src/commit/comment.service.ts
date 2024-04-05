// commit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.entity';
import { IdService } from 'src/auth/id/id_components';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>, private readonly idService: IdService) { }

    async create(commit: Comment): Promise<any> {
        const createdCommit = new this.commentModel({
            ...commit,
            _id: this.idService.generateId()
        });
        await createdCommit.save();
        return { id: createdCommit._id, commit_details: createdCommit.commit_details, commit_date: createdCommit.commit_date }
    }
    async find(): Promise<Comment[]> {
        return this.commentModel.find().populate('user').exec()
    }
    async getCommentsByUser(userId: string): Promise<any[]> {
        const comments = await this.commentModel.find({ user: userId }).populate('service', 'name').exec();
        return comments.map(comment => ({
            id: comment._id,
            commit_details: comment.commit_details,
            commit_date: comment.commit_date,
            service_name: comment.service // Sadece servis adını döndürmek için
        }));
    }
    async findAll(): Promise<Comment[]> {
        return this.commentModel.find().exec();
    }
    async findByUserId(userId: string): Promise<Comment[]> {
        return this.commentModel.find({ user: userId }).exec();
    }
    async getCommentForCompany(company: string): Promise<Comment[]> {
    // Belirli bir şirketin yorumlarını getirir, ve bu yorumların her biri ile ilişkili servis bilgisini de içerir.
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
