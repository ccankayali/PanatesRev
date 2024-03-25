import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Provider {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop()
  password: string;
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);
