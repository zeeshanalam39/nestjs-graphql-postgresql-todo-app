import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // Todo - Do not return user object containing password. Serilization etc.
  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query((returns) => User)
  async getUser(
    @Args('username', { type: () => String }) username: string,
  ): Promise<User> {
    return this.usersService.getUser(username);
  }
}
