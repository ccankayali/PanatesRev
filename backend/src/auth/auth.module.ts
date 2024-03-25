// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user-login-signup/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config:ConfigService) => {
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES')
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ,UsersModule], // UsersModule'u import et
  controllers: [AuthController], // AuthController'ı tanımla
  providers: [AuthService], // AuthService'i sağla
})
export class AuthModule {}
