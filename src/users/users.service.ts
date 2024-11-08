import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users.map((user) => ({ ...user, password: undefined }));
  }

  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return { ...user, password: undefined };
  }

  create(createUserDto: CreateUserDto): User {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException();
    }
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return { ...newUser, password: undefined };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException();
    }
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return { ...user, password: undefined };
  }

  delete(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException();
    }
    this.users.splice(userIndex, 1);
  }
}
