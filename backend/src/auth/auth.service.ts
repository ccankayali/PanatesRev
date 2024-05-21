import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Company } from './schemas/providers.schema';
import { LoginProviderDto } from './dto/login.company.dto';
import { SignUpProviderDto } from './dto/signup.provider.dto';
import { IdService } from './id/id_components';
import { RoleIds } from '../role/enums/role.enum'; // Import RoleIds enum

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
    private jwtService: JwtService,
    private idService: IdService,
  ) {}

  // Validate User
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username, password }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  // Register Provider
  async signUp_provider(
    signUpProviderDto: SignUpProviderDto,
  ): Promise<{ token: string }> {
    const { name, email, password, userType, companyName } = signUpProviderDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const roles = userType === 'individual' ? [RoleIds.User] : [RoleIds.Provider] as RoleIds[]; // Cast to RoleIds[]
    const provider = await this.companyModel.create({
      _id: this.idService.generateId(),
      name,
      email,
      password: hashedPassword,
      companyName,
      roles,
    });
    const token = this.jwtService.sign({ id: provider._id, roles: provider.roles });
    return { token };
  }

  // Register User
  async signUp_user(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      _id: this.idService.generateId(),
      name,
      email,
      password: hashedPassword,
      roles: [RoleIds.User],
    });

    const token = this.jwtService.sign({ id: user._id, roles: user.roles });
    return { token };
  }

  // Login User
  async login_user(loginDto: LoginDto): Promise<{ token: string; roles: RoleIds[] }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, roles: user.roles as unknown as RoleIds[] }); // Convert to unknown first
    return { token, roles: user.roles as unknown as RoleIds[] }; // Cast to RoleIds[]
  }

  // Login Provider
  async login_provider(loginProviderDto: LoginProviderDto): Promise<{ token: string; roles: RoleIds[] }> {
    const { email, password } = loginProviderDto;
    const provider = await this.companyModel.findOne({ email });

    if (!provider) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, provider.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: provider._id, roles: provider.roles });
    return { token, roles: provider.roles as unknown as RoleIds[] }; // Convert to unknown first, then cast to RoleIds[]
  }

  // Get User by ID
  async getUserById(userId: string): Promise<User | undefined> {
    return await this.userModel.findById(userId);
  }

  // Get Company by ID
  async getCompanyById(companyId: string): Promise<Company | undefined> {
    return await this.companyModel.findById(companyId);
  }

  // Get User by Token
  async getUserByToken(token: string): Promise<User | undefined> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.id;
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Get Company by Token
  async getCompanyByToken(token: string): Promise<Company | undefined> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const companyId = decodedToken.id;
      const company = await this.companyModel.findById(companyId);
      return company;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
