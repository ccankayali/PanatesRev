import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;
}

export const ServicesSchema = SchemaFactory.createForClass(Service);
