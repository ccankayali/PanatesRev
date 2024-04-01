import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Auth } from 'src/auth/deneme-decorator/auth.decorator';
import { AssignRoleDto } from './dtos/role.dto';
import { RoleIds, Role } from 'src/role/enums/role.enum';
import { RoleService } from '../role/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth(RoleIds.Admin)
  @Post('assign')
  async assignRoleToUser(@Body() body: AssignRoleDto) {
    return this.roleService.assignRoleToUser(body);
  }

  @Auth(RoleIds.Admin)
  @Post('assign-user')
  async assignUserRole(@Body() body: AssignRoleDto) {
    body.roleId = RoleIds.User;
    return this.roleService.assignRoleToUser(body);
  }

  @Auth(RoleIds.Admin)
  @Post('assign-provider')
  async assignProviderRole(@Body() body: AssignRoleDto) {
    body.roleId = RoleIds.Provider;
    return this.roleService.assignRoleToUser(body);
  }

  @Auth(RoleIds.Admin)
  @Post('assign-admin')
  async assignAdminRole(@Body() body: AssignRoleDto) {
    body.roleId = RoleIds.Admin;
    return this.roleService.assignRoleToUser(body);
  }
}