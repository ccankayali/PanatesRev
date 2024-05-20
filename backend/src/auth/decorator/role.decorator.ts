import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const ROLES_KEY = 'roleIds';

export function Roles(...roleIds: string[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roleIds),
    UseGuards(AuthGuard, RolesGuard),
  );
}
