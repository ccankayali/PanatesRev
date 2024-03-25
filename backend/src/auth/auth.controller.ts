// src/auth/auth.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: String }> {
    return this.authService.signUp(SignUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: String }> {
    return this.authService.login(loginDto);
  }
}
