import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProviderDocument = Provider & Document;

@Schema()
export class Provider {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;
}

export const ProvidersSchema = SchemaFactory.createForClass(Provider);
