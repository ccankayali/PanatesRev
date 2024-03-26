import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  category: string;

  @Prop({required: true})
  service_id: string;
}

export const ServicesSchema = SchemaFactory.createForClass(Service);
