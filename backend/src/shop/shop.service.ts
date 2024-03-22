import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { ItemDTO } from '../users/dtos/item.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop') private readonly shopModel: Model<ShopDocument>,
  ) {}

  async createShop(
    userId: string,
    itemDTO: ItemDTO,
    subTotalPrice: number,
    totalPrice: number,
  ): Promise<Shop> {
    const newShop = await this.shopModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice,
    });
    return newShop;
  }

  async getShop(userId: string): Promise<ShopDocument> {
    const shop = await this.shopModel.findOne({ userId });
    return shop;
  }

  async deleteShop(userId: string): Promise<Shop> {
    const deletedshop = await this.shopModel.findOneAndDelete({ userId });
    return deletedshop;
  }

  private recalculateShop(shop: ShopDocument) {
    shop.totalPrice = 0;
    shop.items.forEach((item) => {
      shop.totalPrice += item.quantity * item.price;
    });
  }

  async addItemToShop(userId: string, itemDTO: ItemDTO): Promise<Shop> {
    const { providerId, quantity, price } = itemDTO;
    const subTotalPrice = quantity * price;

    const shop = await this.getShop(userId);

    if (shop) {
      const itemIndex = shop.items.findIndex(
        (item) => item.providerId == providerId,
      );

      if (itemIndex > -1) {
        let item = shop.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        shop.items[itemIndex] = item;
        this.recalculateShop(shop);
        return shop.save();
      } else {
        shop.items.push({ ...itemDTO, subTotalPrice });
        this.recalculateShop(shop);
        return shop.save();
      }
    } else {
      const newshop = await this.createShop(
        userId,
        itemDTO,
        subTotalPrice,
        price,
      );
      return newshop;
    }
  }

  async removeItemFromShop(userId: string, providerId: string): Promise<any> {
    const shop = await this.getShop(userId);

    const itemIndex = shop.items.findIndex(
      (item) => item.providerId == providerId,
    );

    if (itemIndex > -1) {
      shop.items.splice(itemIndex, 1);
      return shop.save();
    }
  }
}
