// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user-login-signup/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists!');
    }
    return this.userService.createUser(username, password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.userService.findByUsername(username);
    if (!user || user.password !== password) {
      throw new Error('Invalid username or password');
    }
    // Burada genellikle bir JWT token oluşturulur ve geri döndürülür.
    return { message: 'Login successful', token: 'example_token' };
  }
}
