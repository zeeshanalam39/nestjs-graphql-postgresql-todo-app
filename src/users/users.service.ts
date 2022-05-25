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
import { UserChangedResponse } from './dto/user-changed.response';

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
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async changeUsername(
    user: User,
    newUsername: string,
  ): Promise<UserChangedResponse> {
    console.log('❌❌❌', user);

    const userFound = await this.getUser(user.username);
    const oldUsername = userFound.username;
    userFound.username = newUsername;
    try {
      await this.usersRepository.save(userFound);
      return {
        username: newUsername,
        message: `Your username has been changed to ${newUsername} from ${oldUsername}`,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async changePassword() {
    return null;
  }

  async getUser(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User ${username} not found.`);
    }
    return user;
  }

  // async getAllUsers(): Promise<User[]> {
  //   const users = await this.usersRepository.find();
  //   if (!users) {
  //     throw new NotFoundException(`Users not found.`);
  //   }
  //   return users;
  // }
}
