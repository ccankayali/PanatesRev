// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controllers';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import mongoose from 'mongoose';
import { CompanySchema } from './schemas/providers.schema';
import { JwtStrategy } from './jwt.strategy';
import { IdService } from './id/id_components';




@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.registerAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => {
        return{
          secret: 'topSecret',
          signOptions: {
            expiresIn: '3d'
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    ], 
  controllers: [AuthController], // AuthController'ı tanımla
  providers: [AuthService, JwtStrategy,IdService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

