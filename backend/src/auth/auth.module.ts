// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user-login-signup/users.module';

@Module({
  imports: [UsersModule], // UsersModule'u import et
  controllers: [AuthController], // AuthController'ı tanımla
  providers: [AuthService], // AuthService'i sağla
})
export class AuthModule {}
