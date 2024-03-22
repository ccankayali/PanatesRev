import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Item } from './item.schema';

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  items: Item[];

  @Prop()
  totalPrice: number;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
