import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { ItemDTO } from '../users/dtos/item.dto';
import { RoleIds } from '../role/enums/role.enum';
import { Roles } from '../auth/decorator/role.decorator';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Roles(RoleIds.User)
  @Post('/')
  async addItemToShop(@Request() req, @Body() itemDTO: ItemDTO) {
    const userId = req.user.userId;
    const shop = await this.shopService.addItemToShop(userId, itemDTO);
    return shop;
  }

  @Roles(RoleIds.User)
  @Delete('/')
  async removeItemFromShop(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    const shop = await this.shopService.removeItemFromShop(userId, productId);
    if (!shop) throw new NotFoundException('Item does not exist');
    return shop;
  }

  @Roles(RoleIds.User)
  @Delete('/:id')
  async deleteShop(@Param('id') userId: string) {
    const shop = await this.shopService.deleteShop(userId);
    if (!shop) throw new NotFoundException('Shop does not exist');
    return shop;
  }
}
