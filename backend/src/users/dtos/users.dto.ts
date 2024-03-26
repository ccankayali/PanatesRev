import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//Geçici olarak yaptım. Can'ın ekleyince o kısım gelecektir.
@Schema()
export class User extends Document {

  @Prop({ type: String, required: true })
  _id: string;
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  
}

export const UserSchema = SchemaFactory.createForClass(User);
