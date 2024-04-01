import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../data/entities/role.entity';
import { User } from '../data/entities/user.entity';
import { RoleIds } from './enums/role.enum';
import { AssignRoleDto } from './dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  
  async assignRoleToUser(assignRoleDto: AssignRoleDto): Promise<void> {
    const { userId, roleId } = assignRoleDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    user.roles = [...user.roles, role];
    await this.userRepository.save(user);
  }

  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async createDefaultRoles(): Promise<void> {
    const existingRoles = await this.roleRepository.find();
  
    if (existingRoles.length === 0) {
      const defaultRoles = Object.values(RoleIds).map((id) => ({
        name: Role[id],
      }));
  
      await this.roleRepository.save(defaultRoles);
    }
  }  
}