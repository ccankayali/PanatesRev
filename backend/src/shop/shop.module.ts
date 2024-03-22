import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './schemas/shop.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
