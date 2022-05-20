import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.usersService.getUser(username);
    if (user && (await user).password === password) {
      return user; // Todo - Remove password.
    }
    throw new UnauthorizedException();
  }

  async login(loginUserInput: LoginUserInput): Promise<any> {
    const user = this.usersService.getUser(loginUserInput.username);
    return {
      access_token: 'jwt',
      user,
    };
  }
}
