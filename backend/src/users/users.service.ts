// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async createUser(username: string, password: string): Promise<User> {
    const newUser: User = { id: Date.now(), username, password };
    this.users.push(newUser);
    return newUser;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
export class UsersService {}