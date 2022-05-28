import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupResponse } from 'src/auth/dto/signup-response';
import { SigninUserInput } from 'src/auth/dto/signin-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: SigninUserInput): Promise<SignupResponse> {
    const { username, password } = createUserInput;
    const user = this.usersRepository.create({ username, password });
    try {
      await this.usersRepository.save(user);
      const { username } = user;
      return { username };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User ${username} not found.`);
    }
    return user;
  }
}
