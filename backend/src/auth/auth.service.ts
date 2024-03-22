import { Injectable } from '@nestjs/common';
import { UserService } from '../user-login-signup/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user; // Kullanıcı verisinden şifreyi kaldırdık
      return result;
    }
    return null;
  }
}
