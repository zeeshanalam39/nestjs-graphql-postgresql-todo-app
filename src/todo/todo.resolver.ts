import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query((returns) => [Todo])
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Query((returns) => Todo)
  async getTodo(@Args('id', { type: () => Int }) id: number): Promise<Todo> {
    return this.todoService.getTodo(id);
  }

  @Mutation((returns) => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation((returns) => Todo)
  async updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo> {
    return this.todoService.updateTodoStatus(updateTodoInput);
  }

  @Mutation((returns) => Int)
  async deleteTodo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<number> {
    return this.todoService.deleteTodo(id);
  }
}
