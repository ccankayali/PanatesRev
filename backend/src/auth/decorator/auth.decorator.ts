import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roleIds: number[]) {
  return applyDecorators(
    SetMetadata('roleIds', roleIds),
    UseGuards(AuthGuard, RolesGuard),
  );
}