import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoStatus } from './todo-status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // async createTodo(createTodoInput: CreateTodoInput): Promise<Todo> {
  //   const { text, user } = createTodoInput;
  //   const newTodo = this.todoRepository.create({
  //     text,
  //     user,
  //     createdAt: new Date().toISOString(),
  //     status: TodoStatus.PENDING,
  //   });
  //   await this.todoRepository.save(newTodo);
  //   return newTodo;
  // }

  async getTodo(id): Promise<Todo> {
    const todoFound = await this.todoRepository.findOne({ where: { id } });
    if (!todoFound) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return todoFound;
  }

  async updateTodoStatus(updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const todo = await this.getTodo(updateTodoInput.id);
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

  async deleteTodo(id): Promise<number> {
    const result = await this.todoRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return id;
  }
}
