// commit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.entity';
import { IdService } from '../auth/id/id_components';
import { Company } from 'src/auth/schemas/providers.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        @InjectModel(Company.name)
        private readonly providersModel: Model<Company>,
        private idService: IdService,
    ) { }

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
    async getCommentsByUser(userId: string): Promise<any[]> {
        const comments = await this.commentModel.find({ user: userId }).populate('service', 'name').exec();
        return comments.map(comment => ({
            id: comment._id,
            commit_details: comment.commit_details,
            //commit_date: comment.commit_date,
            service_name: comment.service // Sadece servis adını döndürmek için
        }));
    }
    async getCommentForService(serviceId: string): Promise<any[]> {
        const comments = await this.commentModel.find({ service: serviceId }).populate("service").populate("company").exec()
        return comments.map(comment => ({
            comment: comment._id,
            commit_details: comment.commit_details,
            service: comment.service,
            company: comment.company
        }))
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

        yorum._id = this.idService.generateId()
        const createdComment = new this.commentModel(yorum);
        createdComment.company = company

        await createdComment.save();
        const user = await this.providersModel.findById(company);
        if (user) {
            const existingService = user.comment.find(id => id === yorum.service);
            if (existingService) {
                throw new Error('Bu hizmet zaten mevcut.');
            }
            user.comment.push(yorum.service) // Burada yorum.service, yorumun ilişkili olduğu hizmetin ID'sini temsil eder
            await user.save();
        }
        return createdComment;
    }
    
}
