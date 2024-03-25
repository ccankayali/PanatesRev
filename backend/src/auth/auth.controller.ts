// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user-login-signup/users.service';
import { AuthService } from './auth.service';
import { sign } from 'crypto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: String }> {
    return this.authService.signUp(SignUpDto);
  }
}
