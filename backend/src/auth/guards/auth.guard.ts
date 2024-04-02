import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { TokenExpiredError } from 'jsonwebtoken';
  import { AuthService } from '../auth.service';

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly authService: AuthService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        const bearerToken = request.headers.authorization.split(' ')[1];
        const payload = await this.jwtService.verifyAsync(bearerToken, {
            secret: process.env.JWT_SECRET,
        });
        request.auth = await this.authService.getUserById(payload.id);
        return true;
      } catch (error) {
        if (error instanceof TokenExpiredError)
          throw new UnauthorizedException('expired token');
        throw new UnauthorizedException('invlidToken');
      }
    }
  }