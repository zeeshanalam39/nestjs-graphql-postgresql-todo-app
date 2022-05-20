import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
