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
    async findCommentsByService(serviceId: string): Promise<any[]> {
        const comments = await this.commentModel.find({ service: serviceId }).populate('company', 'name').exec()
        return comments.map(comment => ({
            userId: comment._id,
            userName: comment.company?.[0]["name"],
            commit_details: comment.commit_details
        }));
    }
    async getCommentForCompany(company: string): Promise<Comment[]> {
        // Belirli bir şirketin yorumlarını getirir, ve bu yorumların her biri ile ilişkili servis bilgisini de içerir.
        return await this.commentModel.find({ company }).populate('service', 'commit').exec();
    }
    async create_comment(company: string, comment: Comment): Promise<Comment> {
        comment._id = this.idService.generateId()
        const createdComment = new this.commentModel(comment);
        createdComment.company = company
        await createdComment.save();
        const user = await this.providersModel.findById(company);
        if (user) {
            const existingService = user.comment.find(id => id === comment.service);
            if (existingService) {
                throw new Error('Bu hizmet zaten mevcut.');
            }
            user.comment.push(comment.service) // Burada yorum.service, yorumun ilişkili olduğu hizmetin ID'sini temsil eder
            await user.save();
        }
        return createdComment;
    }

}
