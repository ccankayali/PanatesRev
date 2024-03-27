import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from '../users/dtos/users.dto'; // User entity'sini import ediyoruz

@Schema()
export class Commit extends Document {
    @Prop({ type: 'ObjectId', ref: 'User' })
    user: ObjectId;

    @Prop({ required: true })
    commit_date: Date;

    @Prop({ required: true })
    commit_details: string;
}

export const CommitSchema = SchemaFactory.createForClass(Commit);