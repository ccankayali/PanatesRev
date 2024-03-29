import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from '../users/dtos/users.dto'; // User entity'sini import ediyoruz

@Schema()
export class Comment extends Document {
    @Prop({ type: String, required: true })
    _id: string;
    @Prop({ type: 'string', ref: 'User' })
    user: string;
    

    @Prop({ required: true })
    commit_date: Date;

    @Prop({ required: true })
    commit_details: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);