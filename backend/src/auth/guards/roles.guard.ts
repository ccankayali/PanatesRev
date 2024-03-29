<<<<<<< HEAD
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { UserService } from 'src/users/users.service';

  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private readonly userService: UserService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const roles = this.reflector.get<number[]>('roleIds', context.getHandler());
      if (roles.length === 0) return true;
      const request = context.switchToHttp().getRequest();
      if (!request.user.roles.some((userRole) => roles.includes(userRole.id)))
        throw new UnauthorizedException('error');
  
      return true;
    }
  }
=======
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
>>>>>>> 161027b12bc0f670b0c0e5638c5b6f5649c82190
