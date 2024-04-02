import { Module } from '@nestjs/common';
//import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { IdService } from 'src/auth/id/id_components';
import { CompanySchema } from 'src/providers/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/PanaRev'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  providers: [RoleService, AuthService, UserService, IdService, JwtService],
  exports: [RoleService, IdService, UserService],
})
export class RoleModule {}
