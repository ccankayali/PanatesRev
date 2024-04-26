import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';


// JwtStrategy sınıfı, JwtStrategy sınıfı, PassportStrategy sınıfını extend eden sınıf.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "topSecret",
    });
  }

  async validate(payload) {
    const { id } = payload;

    const User = await this.userModel.findById(id);

    if (!User) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return User;
  }
}