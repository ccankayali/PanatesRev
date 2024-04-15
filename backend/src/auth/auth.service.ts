import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Company } from './schemas/providers.schema';
import { LoginProviderDto } from './dto/login.company.dto';
import { SignUpProviderDto} from './dto/signup.provider.dto';
import { IdService } from './id/id_components';
import { RoleIds } from '../role/enums/role.enum';

@Injectable()
export class AuthService {
  validateUser(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private idService: IdService,

    @InjectModel(Company.name)
    private companyModel: Model<Company>,
  ) {}

  async signUp_user(signUpDto: SignUpDto): Promise<{ token: String }> {
    const { name, email, password} = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      _id: this.idService.generateId(),
      name,
      email,
      password: hashedPassword,
      roles: [RoleIds.User],
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login_user(
    LoginProviderDto: LoginProviderDto,
  ): Promise<{ token: String }> {
    const { email, password } = LoginProviderDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
  async signUp_provider(
    signupProviderDto: SignUpProviderDto,
  ): Promise<{ token: String }> {
    const { name, email, password, roles } = signupProviderDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await this.companyModel.create({
      _id: this.idService.generateId(),
      name,
      email,
      password: hashedPassword,
      roles:[RoleIds.Provider]
    });
    const token = this.jwtService.sign({ id: provider._id });

    return { token };
  }
  async login_provider(loginDto: LoginDto): Promise<{ token: String }> {
    const { email, password } = loginDto;

    const provider = await this.companyModel.findOne({ email });

    if (!provider) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, provider.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: provider._id });

    return { token };
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return await this.userModel.findById(userId);
  }

  // Kullanıcıyı token'a göre bulma şuanlık kullanıcı için yaptım provider için de yapılacak.
  async getUserByToken(token: string): Promise<User | undefined> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.id;
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Geçersiz veya süresi dolmuş token');
    }
  }
}
