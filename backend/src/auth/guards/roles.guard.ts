import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/role/enums/role.enum';
import { ROLES_KEY } from '../deneme-decorator/role.decorator';

// RolesGuard sınıfı, CanActivate arayüzünü uygulayan enjekte edilebilen sınıf.
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

    // Check if the user object exists and has roles
    if (user && user.roles) {
      return requiredRoles.some((role) => user.roles.includes(role));
    }

    return false;
  }
}