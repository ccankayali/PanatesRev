import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UnauthorizedException,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { SignUpProviderDto } from './dto/signup.provider.dto';
import { LoginProviderDto } from './dto/login.company.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

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

  // @UseGuards(JwtAuthGuard)
  // @Post('/login_user')
  // async login_user(@Request() req) {
  //   return this.authService.login_user(req.user);
  // }

  @Post('/signup_provider')
  signUp_provider(
    @Body() signupProviderDto: SignUpProviderDto,
  ): Promise<{ token: String }> {
    return this.authService.signUp_provider(signupProviderDto);
  }

  @Post('/login_provider')
  login_provider(
    @Body() LoginProviderDto: LoginProviderDto,
  ): Promise<{ token: String }> {
    return this.authService.login_provider(LoginProviderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/get-user/:id')
  getUser(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/get-user-by-token')
  async getUserByToken(
    @Headers('Authorization') authHeader: string,
  ): Promise<User | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Geçersiz veya eksik yetki bilgisi');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getUserByToken(token);
  }
}
