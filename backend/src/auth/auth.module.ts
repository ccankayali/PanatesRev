import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controllers';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
import { CompanySchema } from './schemas/providers.schema';
import { JwtStrategy } from './jwt.strategy';
import { IdService } from './id/id_components';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'topSecret',
        signOptions: {
          expiresIn: '3d',
        },
      }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/PanaRev'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, IdService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
