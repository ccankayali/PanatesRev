// src/auth/auth.controller.ts
import { Body, Controller, Get, Post,Patch,Param,UnauthorizedException,Headers, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { signUpProviderDto } from './dto/signup.provider.dto';
import { LoginProviderDto } from './dto/login.company.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './enums/role.enum';


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
  signUp_provider(@Body() SignupProviderDto: signUpProviderDto): Promise<{ token: String }> {
    return this.authService.signUp_provider(SignupProviderDto);
  }  
  @Post('/login_provider')
  login_provider(@Body() LoginProviderDto: LoginProviderDto): Promise<{ token: String }> {
    return this.authService.login_provider(LoginProviderDto);
  }

  @Get('/get-user/:id')
  getUser(@Param('id') userId: string) {
      return this.authService.getUserById(userId);
  }

  @Get('/get-user-by-token')
  async getUserByToken(@Headers('Authorization') authHeader: string): Promise<User | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Geçersiz veya eksik yetki bilgisi');
    }

    const token = authHeader.split(' ')[1];
    return this.authService.getUserByToken(token);
  }
  


}