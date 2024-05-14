import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class Comment extends Document {
    @Prop({ type: String, required: true })
    _id: string;

    @Prop({ type: [String], ref: 'Company' })
    company:string
    
    @Prop({ type: [String],ref:'Service'})
    service: string;

    //@Prop({ required: true })
    //commit_date: Date;

    @Prop({ required: true })
    commit_details: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
