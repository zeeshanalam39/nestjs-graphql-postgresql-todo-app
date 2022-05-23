import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async getUser(
    @Args('username', { type: () => String }) username: string,
  ): Promise<User> {
    return this.usersService.getUser(username);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard) // Todo - Not Working
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
