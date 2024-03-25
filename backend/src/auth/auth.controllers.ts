// src/auth/auth.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup_user')
  signUp_user(@Body() SignUpDto: SignUpDto): Promise<{ token: String }> {
    return this.authService.signUp_user(SignUpDto);
  }

  @Post('/login_user')
  login_user(@Body() loginDto: LoginDto): Promise<{ token: String }> {
    return this.authService.login_user(loginDto);
  }
//   @Post('/signup_provider')
//   signUp_provider(@Body() SignUpDto: SignUpDto): Promise<{ token: String }> {
//     return this.authService.signUp_provider(SignUpDto);
//   }  
//   @Post('/login_provider')
//   login_provider(@Body() loginDto: LoginDto): Promise<{ token: String }> {
//     return this.authService.login_provider(loginDto);

// }
}