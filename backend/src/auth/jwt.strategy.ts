import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { Role } from 'src/role/enums/role.enum';

// JwtStrategy sınıfı, JwtStrategy sınıfı, PassportStrategy sınıfını extend eden sınıf.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret',
    });
  }

  async validate(payload) {
    const { id, roles } = payload;

    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      // Kullanıcının JWT'den gelen rolleri doğrulama
      const validRoles = user.roles.filter((role: Role) => role.includes(role));
      if (validRoles.length === 0) {
        throw new UnauthorizedException('Unauthorized.');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized.');
    }
  }
}