import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class ChangeUsernameInput {
  @Field()
  @Length(4, 20)
  @IsNotEmpty()
  username: string;
}
