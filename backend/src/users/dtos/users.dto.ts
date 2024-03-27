import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
//Geçici olarak yaptım. Can'ın ekleyince o kısım gelecektir.
@Schema()
export class User extends Document {

  @Prop({ type: 'ObjectId', ref: 'Commit' })
  commit: ObjectId;
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
  
  
}

export const UserSchema = SchemaFactory.createForClass(User);
