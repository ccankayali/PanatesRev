import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/data/entities/role.entity';
import { AssignRoleDto } from './dtos/role.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly authService: AuthService,
  ) {}

  async assignRoleToUser(data: AssignRoleDto) {
    const role = await this.findById(data.roleId);
    const user = await this.authService.getUserById(data.userId);
    
    if (user && user.roles && Array.isArray(user.roles) && 
        !user.roles.some((userRole) => userRole.id === data.roleId)) {
      user.roles.push(role);
    }

    // Assuming you have a method to save the user in AuthService
    return this.authService.saveUser(user);
  }

  async findById(roleId: number) {
    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
