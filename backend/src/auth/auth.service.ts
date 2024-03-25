import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Provider } from './schemas/providers.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    
  ){}




  async signUp_user(signUpDto:SignUpDto):Promise<{token:String}> {

    const{name,email,password} = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password:hashedPassword,
    });


    const token = this.jwtService.sign({id:user._id})

    return {token};
  }

  async login_user(loginDto:LoginDto): Promise<{token:String}> {
    const{email,password} = loginDto;

    const user = await this.userModel.findOne({email})

    if(!user){
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    
    if(!isPasswordMatched){
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const token = this.jwtService.sign({id:user._id})
    
    return {token};
  }
  async signUp_provider(signUpDto:SignUpDto):Promise<{token:String}> {

    const{name,email,password} = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await this.userModel.create({
      name,
      email,
      password:hashedPassword,
    });
    const token = this.jwtService.sign({id:provider._id})

    return {token};
  }
  async login_provider(loginDto:LoginDto): Promise<{token:String}> {
    const{email,password} = loginDto;

    const provider = await this.userModel.findOne({email})

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
}



