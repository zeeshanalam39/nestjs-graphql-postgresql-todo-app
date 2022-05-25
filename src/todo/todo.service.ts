import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoStatus } from './todo-status.enum';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(user): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user } });
  }

  async getTodo(id: string, user: User): Promise<Todo> {
    const todoFound = await this.todoRepository.findOne({
      where: { id, user },
    });
    if (!todoFound) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return todoFound;
  }

  async createTodo(createTodoInput: CreateTodoInput, user: any): Promise<Todo> {
    const { text } = createTodoInput;

    const newTodo = this.todoRepository.create({
      text,
      status: TodoStatus.PENDING,
      createdAt: new Date().toISOString(),
      user,
    });

    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async updateTodoStatus(
    updateTodoInput: UpdateTodoInput,
    user: User,
  ): Promise<Todo> {
    const todo = await this.getTodo(updateTodoInput.id, user);
    const { text, status } = updateTodoInput;
    if (text) {
      todo.text = text;
    }
    if (status) {
      todo.status = status;
    }
    await this.todoRepository.save(todo);
    return todo;
  }

  async deleteTodo(id: string, user: User): Promise<Todo> {
    const todoFound: Todo = await this.getTodo(id, user);
    const removedTodoId = todoFound.id;
    const result: Todo = await this.todoRepository.remove(todoFound);
    result.id = removedTodoId;
    return result;
    //   const result = await this.todoRepository.delete({ id, user });
    //   if (result.affected === 0) {
    //     throw new NotFoundException(`Todo with id ${id} not found.`);
    //   }
    //   return id;
  }
}
