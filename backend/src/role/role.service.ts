import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleIds } from './enums/role.enum';
import { AssignRoleDto } from './dtos/role.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async assignRoleToUser(assignRoleDto: AssignRoleDto): Promise<void> {
    const { userId, roleId } = assignRoleDto;
    const user = await this.authService.getUserById(String(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const role = RoleIds[roleId];
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    
    user.roles = [Role[role]]; // Assign an array containing the role
    await this.userService.updateUser(user._id, user);
  }

  async getRoleById(id: number): Promise<string> {
    const role = RoleIds[id];
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}