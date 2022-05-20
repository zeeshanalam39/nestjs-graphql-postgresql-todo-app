import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async signin(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<any> {
    return this.authService.login(loginUserInput);
  }
}
