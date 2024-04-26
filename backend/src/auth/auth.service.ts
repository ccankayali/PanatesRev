import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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


// Auth service sınıfı, kullanıcı ve firma işlemlerini yapmak için kullanılır.
@Injectable()
export class AuthService {
  validateUser(name: string, password: string) {
      throw new Error('Method not implemented.');
  }
  // AuthService sınıfı, AuthService sınıfı, User ve Company sınıflarının kullanılmasını sağlayan sınıf.
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private idService: IdService,
    
    @InjectModel(Company.name)
    private companyModel: Model<Company>
  ){}



    // Kullanıcı kaydı
  async signUp_user(signUpDto:SignUpDto):Promise<{token:String}> {

    const{name,email,password} = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      _id: this.idService.generateId(),
      name,
      email,
      password:hashedPassword,
      roles: [RoleIds.User],
    });


    const token = this.jwtService.sign({id:user._id})

    return {token};
  }

  // Kullanıcı girişi
  async login_user(LoginProviderDto: LoginProviderDto): Promise<{token:String}> {
    const{email,password} = LoginProviderDto;

    const user = await this.userModel.findOne({email})

    if(!user){
      console.log("here");
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    
    if(!isPasswordMatched){
      console.log("here1");
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log("burda");
    const token = this.jwtService.sign({id:user._id})
    
    
    return {token};
  }

  // Firma kaydı
  async signUp_provider(SignupProviderDto:SignUpProviderDto):Promise<{token:String}> {

    const{name,email,password} = SignupProviderDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await this.companyModel.create({
      _id: this.idService.generateId(),
      name,
      email,
      password:hashedPassword,
      roles: [RoleIds.Provider],
    });
    const token = this.jwtService.sign({id:provider._id})

    return {token};
  }
  // Firma girişi
  async login_provider(loginDto:LoginDto): Promise<{token:String}> {
    const{email,password} = loginDto;

    const provider = await this.companyModel.findOne({email})

    if(!provider){
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, provider.password);
    
    if(!isPasswordMatched){
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const token = this.jwtService.sign({id:provider._id})
    
    return {token};
  }

  // Kullanıcı bilgilerini id ile getirme.
  async getUserById(userId: string): Promise<User | undefined> {
    return await this.userModel.findById(userId);
  }

  // Firma bilgilerini id ile getirme.
  async getCompanyById(companyId: string): Promise<Company | undefined> {
    return await this.companyModel.findById(companyId);
  }

  // Kullanıcıyı token'a göre bulma 
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

  // Firma bilgilerini token'a göre bulma
  async getCompanyByToken(token: string): Promise<Company | undefined> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const companyId = decodedToken.id;
      const company = await this.companyModel.findById(companyId);
      return company;
    } catch (error) {
      throw new UnauthorizedException('Geçersiz veya süresi dolmuş token');
    }
  }
}