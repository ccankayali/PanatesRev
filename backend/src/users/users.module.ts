// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';

@Module({
  controllers: [UsersController],
  providers: [UserService, { provide: 'UserModel', useValue: User }],
  exports: [UserService] // UserService'i dışa aktar
})
export class UsersModule {}
