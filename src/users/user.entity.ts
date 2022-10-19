import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from 'src/todo/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  @Field(() => [Todo])
  todos: Todo[];
}
