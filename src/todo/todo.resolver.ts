import { UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/get-current-user.decorator';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { User } from 'src/users/user.entity';

@Resolver(() => Todo)
@UseGuards(JwtAuthGuard)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  // @UseGuards(JwtAuthGuard)
  async getAllTodos(@CurrentUser() user: User): Promise<Todo[]> {
    return this.todoService.getAllTodos(user);
  }

  @Query(() => Todo)
  // @UseGuards(JwtAuthGuard)
  async getTodo(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
    @Info() info,
  ): Promise<Todo> {
    const keys = info.fieldNodes[0].selectionSet.selections.map(
      (item) => item.name.value,
    );
    // console.log('❌: ', keys);
    // console.log('❌: ', info.fieldNodes[0].selectionSet);

    return this.todoService.getTodo(id, user);
  }

  @Mutation(() => Todo)
  // @UseGuards(JwtAuthGuard)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: any,
  ): Promise<Todo> {
    return this.todoService.createTodo(createTodoInput, user);
  }

  @Mutation(() => Todo)
  // @UseGuards(JwtAuthGuard)
  async updateTodo(
    @CurrentUser() user: User,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo> {
    return this.todoService.updateTodoStatus(updateTodoInput, user);
  }

  @Mutation(() => Todo)
  // @UseGuards(JwtAuthGuard)
  async deleteTodo(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    return this.todoService.deleteTodo(id, user);
  }
}
