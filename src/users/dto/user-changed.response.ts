import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserChangedResponse {
  @Field()
  username: string;

  @Field()
  message: string;
}
