import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { SigninUserInput } from './dto/signin-user.input';
import { SigninResponse } from './dto/signin-response';
import { SignupResponse } from './dto/signup-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(loginUserInput: SigninUserInput): Promise<SignupResponse> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(loginUserInput.password, salt);
    loginUserInput.password = hashedPassword;

    return this.usersService.createUser(loginUserInput);
  }

  async signin(user: User): Promise<SigninResponse> {
    const username = user.username;
    const access_token = await this.jwtService.sign({
      username,
      sub: user.id,
    });
    return {
      access_token,
      username,
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
