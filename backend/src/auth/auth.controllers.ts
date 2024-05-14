import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpProviderDto } from './dto/signup.provider.dto';
import { User } from './schemas/user.schema';
import { Company } from './schemas/providers.schema';
import { CurrentUser } from './decorators/current';
import { SignUpDto } from './dto/signup.dto';
import { LoginProviderDto } from './dto/login.company.dto';

// AuthController sınıfı, AuthController sınıfı, AuthService sınıfının kullanılmasını sağlayan sınıf.


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Kullanıcı kaydı
  @Post('/signup_user')
  signUp_user(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp_user(signUpDto);
  }

  //Kullanıcı girişi
  @Post('/login_user')
  login_user(@Body() loginDto: LoginDto) {
    return this.authService.login_user(loginDto);
  }

  //Firma kaydı
  @Post('/signup_provider')
  signUp_provider(@Body() SignupProviderDto: SignUpProviderDto) {
    return this.authService.signUp_provider(SignupProviderDto);
  }
  //Firma girişi
  @Post('/login_provider')
  login_provider(@Body() loginProviderDto: LoginProviderDto) {
    return this.authService.login_provider(loginProviderDto);
  }

  //Kullanıcı bilgilerini id ile getirme.
  @Get('/get-user/:id')
  getUser(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  //Firma bilgilerini id ile getirme.
  @Get('/get-company')
  getCompany(@CurrentUser() currentuser):Promise<Company> {
      return this.authService.getCompanyById(currentuser);
  }

  //Kullanıcı bilgilerini jwt ile getirme.
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

  //Firma bilgilerini jwt ile getirme.
  @Get('/get-company-by-token')
  async getCompanyByToken(
    @Headers('Authorization') authHeader: string,
  ): Promise<Company | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Geçersiz veya eksik yetki bilgisi');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getCompanyByToken(token);
  }
  @Get('/get-user-or-company-by-token')
  async getUserOrCompanyByToken(
    @Headers('Authorization') authHeader: string,
  ): Promise<User | Company | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Geçersiz veya eksik yetki bilgisi');
    }

    const token = authHeader.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (user) {
      return user; // Eğer kullanıcı varsa, kullanıcıyı döndür
    }

    const company = await this.authService.getCompanyByToken(token);
    if (company) {
      return company; // Eğer şirket varsa, şirketi döndür
    }

    // Eğer ne kullanıcı ne de şirket bulunamazsa, undefined döndür
    return undefined;
  }
}

// @UseGuards(JwtAuthGuard)
// @Post('/login_user')
// async login_user(@Request() req) {
//   return this.authService.login_user(req.user);
// }
