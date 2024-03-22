import { Controller, Get, UseGuards, Req, Patch, Param, Body } from '@nestjs/common';
//import { JwtAuthGuard } from './jwt-auth.guard'; // Kullanıcı kimlik doğrulaması için JWT tabanlı guard
import { UserService } from './users.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    //@UseGuards(JwtAuthGuard) 
    @Get()
    //bu kısım oturum açan kullanıcının bilgilerini getirmek içindir.
    async getUser(@Req() request) {
        const userId = request.user.id;
        return this.userService.findById(userId);
    }
    @Patch(':id/update-username') // PATCH mevcut kaydı kısmen güncellemek için kullanılmaktadır.
    async updateUsername(@Param('id') userId: string, @Body() body: { username: string }) {
        const { username } = body;//güncellenecek isim
        return this.userService.updateUsername(userId, username);
    }
    @Patch(':id/update-password') // PATCH mevcut kaydı kısmen güncellemek için kullanılmaktadır.
    async updatePassword(@Param('id') userId: string, @Body() body: { password: string }) {
        const { password } = body;//güncellenecek isim
        return this.userService.updatePassword(userId, password);
    }
   
}