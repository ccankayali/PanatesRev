import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoleIds } from './enums/role.enum';
import { AssignRoleDto } from './dtos/role.dto';
import { IRole } from '../role/schemas/role.schema'; // Check and correct this import
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<IRole>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async assignRoleToUser(assignRoleDto: AssignRoleDto): Promise<void> {
    const { userId, roleId } = assignRoleDto;

    // Find the user by ID
    const user = await this.authService.getUserById(String(userId)); // Convert userId to string
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find the role by ID
    const role = await this.roleModel.findOne({ id: roleId });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Add the role ID to the user's roles array
    user.roles = [...user.roles, role._id];

    // Update the user in the database - You need to implement this method in AuthService
    await this.userService.updateUser(user._id, user); // Assuming there's an updateUser method
  }

  async getRoleById(id: number): Promise<IRole> {
    // Find the role by ID
    const role = await this.roleModel.findOne({ id });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async createDefaultRoles(): Promise<void> {
    // Check if any roles exist in the database
    const existingRoles = await this.roleModel.find();
    if (existingRoles.length === 0) {
      // Create default roles if no roles exist
      const defaultRoles = Object.values(RoleIds).map((id) => ({
        id,
        name: RoleIds[id],
      }));
      await this.roleModel.insertMany(defaultRoles);
    }
  }
}
