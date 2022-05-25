import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
