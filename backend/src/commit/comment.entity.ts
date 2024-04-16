import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ type: String, required: true })
  _id: string;
  @Prop({ type: 'string', ref: 'User' })
  user: string;
  @Prop({ type: 'string', ref: 'Company' })
  company: string;
  @Prop({ type: 'string', ref: 'Service' })
  service: string;
  @Prop({ required: true })
  commit_date: Date;
  @Prop({ required: true })
  commit_details: string;
  @Prop({ type: String, required: true })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
