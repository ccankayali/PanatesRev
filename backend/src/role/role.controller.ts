import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Auth } from 'src/auth/deneme-decorator/auth.decorator';
import { AssignRoleDto } from './dtos/role.dto';
import { RoleIds, Role } from 'src/role/enums/role.enum';
import { RoleService } from '../role/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth(RoleIds.Admin)
  @Post('assign-user')
  async assignUserRole(@Request() req, @Body() body: AssignRoleDto) {
    body.roleId = RoleIds.User;
    body.userId = req.user.userId;
    return this.roleService.assignRoleToUser(body);
  }

  @Auth(RoleIds.Admin)
  @Post('assign-provider')
  async assignProviderRole(@Request() req, @Body() body: AssignRoleDto) {
    body.roleId = RoleIds.Provider;
    body.userId = req.user.userId;
    return this.roleService.assignRoleToUser(body);
  }

  @Auth(RoleIds.Admin)
  @Post('assign-admin')
  async assignAdminRole(@Request() req, @Body() body: AssignRoleDto) {
    body.roleId = RoleIds.Admin;
    body.userId = req.user.userId;
    return this.roleService.assignRoleToUser(body);
  }
}
