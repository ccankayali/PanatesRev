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
import { RoleIds } from 'src/role/enums/role.enum';
import { Roles } from './decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup_user')
  signUp_user(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp_user(signUpDto);
  }

  @Post('/login_user')
  async login_user(@Body() loginDto: LoginDto) {
    const { token, roles } = await this.authService.login_user(loginDto);
    return { token, roles };
  }

  @Post('/signup_provider')
  signUp_provider(@Body() signUpProviderDto: SignUpProviderDto) {
    return this.authService.signUp_provider(signUpProviderDto);
  }

  @Post('/login_provider')
  async login_provider(@Body() loginProviderDto: LoginProviderDto) {
    const { token, roles } = await this.authService.login_provider(loginProviderDto);
    return { token, roles };
  }

  @Get('/get-user/:id')
  getUser(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  @Get('/get-company')
  getCompany(@CurrentUser() currentUser): Promise<Company> {
    return this.authService.getCompanyById(currentUser);
  }

  @Get('/get-user-by-token')
  async getUserByToken(@Headers('Authorization') authHeader: string): Promise<User | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing authorization token');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getUserByToken(token);
  }

  @Get('/get-company-by-token')
  async getCompanyByToken(@Headers('Authorization') authHeader: string): Promise<Company | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing authorization token');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getCompanyByToken(token);
  }

  @Get('/get-user-or-company-by-token')
  async getUserOrCompanyByToken(@Headers('Authorization') authHeader: string): Promise<User | Company | undefined> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing authorization token');
    }

    const token = authHeader.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    if (user) {
      return user;
    }

    const company = await this.authService.getCompanyByToken(token);
    if (company) {
      return company;
    }

    return undefined;
  }

  @Get('/role')
  @Roles(RoleIds.Provider)
  async getRole(@CurrentUser() currentUser) {
    return `Current user ID: ${currentUser}`;
  }
}
