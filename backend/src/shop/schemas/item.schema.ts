import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Provider' })
  providerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  subTotalPrice: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
