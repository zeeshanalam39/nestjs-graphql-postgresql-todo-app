import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangeUsernameInput } from './dto/change-username.input';
import { UserChangedResponse } from './dto/user-changed.response';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => UserChangedResponse)
  @UseGuards(JwtAuthGuard)
  async changeUsername(
    @Args('changeUsernameInput') changeUsernameInput: ChangeUsernameInput,
    @CurrentUser() user: User,
  ): Promise<UserChangedResponse> {
    console.log('❌❌❌', changeUsernameInput, user);
    return this.usersService.changeUsername(user, changeUsernameInput.username);
  }

  @Mutation(() => User)
  async changePassword() {
    return null;
  }

  // @Query(() => User)
  // async getUser(
  //   @Args('username', { type: () => String }) username: string,
  // ): Promise<User> {
  //   return this.usersService.getUser(username);
  // }

  // @Query(() => [User])
  // @UseGuards(JwtAuthGuard) // Todo - Not Working
  // async getAllUsers(): Promise<User[]> {
  //   return this.usersService.getAllUsers();
  // }
}
