import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `Todo - Protect Me`, // Todo - Protect Me,
    });
  }

  async validate(payload: any) {
    // return { userId: payload.sub, username: payload.username };
    const { username } = payload;
    const user: User = await this.usersService.getUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Todo - Why this was not working with just userId & username.
  }
}
