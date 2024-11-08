import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserModel as User } from './interfaces/user.model';

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
    const newUser = new User(createUserDto.login, createUserDto.password);
    this.users.push(newUser);
    return { ...newUser, password: undefined };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException();
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
