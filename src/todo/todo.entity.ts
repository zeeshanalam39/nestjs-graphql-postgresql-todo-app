import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from './todo-status.enum';

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field()
  status: TodoStatus;

  @Column()
  @Field()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.todos, { eager: false })
  @Field(() => User)
  user: User;
}
