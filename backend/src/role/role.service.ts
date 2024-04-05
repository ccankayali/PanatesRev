import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, RoleIds } from './enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async assignRoleToUser(userId: string, roleId: RoleIds): Promise<void> {
    const user = await this.authService.getUserById(userId);
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

  async getRoleById(id: RoleIds): Promise<string> {
    const role = RoleIds[id];
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}