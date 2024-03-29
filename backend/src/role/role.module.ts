import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { User } from '../data/entities/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserService } from '../users/users.service';
import { Role } from 'src/data/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User]), UsersModule],
  controllers: [RoleController],
  providers: [RoleService, UserService],
  exports: [RoleService],
})
export class RoleModule {}