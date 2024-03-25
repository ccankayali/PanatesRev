// src/auth/auth.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { signUpProviderDto } from './dto/signup.provider.dto';
import { LoginProviderDto } from './dto/login.company.dto';

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
  @Post('/signup_provider')
  signUp_provider(@Body() SignupProviderDto: signUpProviderDto): Promise<{ token: String }> {
    return this.authService.signUp_provider(SignupProviderDto);
  }  
  @Post('/login_provider')
  login_provider(@Body() LoginProviderDto: LoginProviderDto): Promise<{ token: String }> {
    return this.authService.login_provider(LoginProviderDto);

}
}