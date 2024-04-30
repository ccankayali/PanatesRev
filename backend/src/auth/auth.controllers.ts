import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UnauthorizedException,
  Headers,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { SignUpProviderDto } from './dto/signup.provider.dto';
import { LoginProviderDto } from './dto/login.company.dto';
import { User } from './schemas/user.schema';
import { Company } from './schemas/providers.schema';
import { Role, RoleIds } from '../role/enums/role.enum';
import { Roles } from './deneme-decorator/role.decorator';
// AuthController sınıfı, AuthController sınıfı, AuthService sınıfının kullanılmasını sağlayan sınıf.


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Kullanıcı kaydı
  @Post('/signup_user')
  signUp_user(@Body() SignUpDto: SignUpDto): Promise<{ token: String }> {
    return this.authService.signUp_user(SignUpDto);
  }

  //Kullanıcı girişi
  @Post('/login_user')
  login_user(@Body() loginDto: LoginDto): Promise<{ token: String }> {
    return this.authService.login_user(loginDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/login_user')
  // async login_user(@Request() req) {
  //   return this.authService.login_user(req.user);
  // }

  //Firma kaydı
  @Post('/signup_provider')
  signUp_provider(
    @Body() SignupProviderDto: SignUpProviderDto,
  ): Promise<{ token: String }> {
    return this.authService.signUp_provider(SignupProviderDto);
  }  
  //Firma girişi
  @Post('/login_provider')
  login_provider(
    @Body() LoginProviderDto: LoginProviderDto,
  ): Promise<{ token: String }> {
    return this.authService.login_provider(LoginProviderDto);
  }

  //Kullanıcı bilgilerini id ile getirme.
  @Get('/get-user/:id')
  getUser(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  //Firma bilgilerini id ile getirme.
  @Get('/get-company/:id')
  getCompany(@Param('id') companyId: string) {
      return this.authService.getCompanyById(companyId);
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
  async getCompanyByToken(@Headers('Authorization') authHeader: string): Promise<Company | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Geçersiz veya eksik yetki bilgisi');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getCompanyByToken(token);
  }
  @Get('/get-user-or-company-by-token')
async getUserOrCompanyByToken(@Headers('Authorization') authHeader: string): Promise<User | Company | undefined> {
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
