import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Company {

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop()
  password: string;
}
export const CompanySchema = SchemaFactory.createForClass(Company);
