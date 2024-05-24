import {
  Controller,
  Get,
  Req,
  Post,
  Patch,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
//import { JwtAuthGuard } from './jwt-auth.guard'; // Kullanıcı kimlik doğrulaması için JWT tabanlı guard
import { UserService } from './users.service';
import { User } from './dtos/users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/users')
  async createUser(@Body() createUserDto: User): Promise<any> {
    return await this.userService.createUser(createUserDto);
  }
  //@UseGuards(JwtAuthGuard) 
  @Get()
  //bu kısım oturum açan kullanıcının bilgilerini getirmek içindir.
  async getUser(@Req() request) {
    const userId = request.user;
    return this.userService.getUsers();
  }
  @Patch(':id/update-field')
  async updataField(@Param('id') userId: string,
    @Body() body: { field: 'name' | 'password' | 'email', value: string }) {
    const { field, value } = body
    if (field !== 'name' && field !== 'password' && field !== 'email') {
      throw new BadRequestException('Geçersiz alan');
    }
    return this.userService.updateUserField(userId, field, value)
  }


}
