import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninResponse } from './dto/signin-response';
import { SigninUserInput } from './dto/signin-user.input';
import { SignupResponse } from './dto/signup-response';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupResponse)
  async signup(
    @Args('loginUserInput') loginUserInput: SigninUserInput,
  ): Promise<SignupResponse> {
    return this.authService.signup(loginUserInput);
  }

  @Mutation(() => SigninResponse)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('loginUserInput') loginUserInput: SigninUserInput,
    @Context() context,
  ): Promise<SigninResponse> {
    return this.authService.signin(context.user);
  }
}
