import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Auth } from 'src/auth/deneme-decorator/auth.decorator';
import { AssignRoleDto } from './dtos/role.dto';
import { RoleIds } from 'src/role/enums/role.enum';
import { RoleService } from '../role/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth(RoleIds.Admin)
  @Post('assign')
  async assignRoleToUser(@Body() body: AssignRoleDto) {
    return this.roleService.assignRoleToUser(body);
  }
}
