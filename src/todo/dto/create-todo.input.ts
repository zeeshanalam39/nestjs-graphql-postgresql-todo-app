import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @Length(3, 100)
  text: string;

  @Field()
  @Length(3, 50)
  user: string; // Todo - Remove this. Get user from current signed in....
}
