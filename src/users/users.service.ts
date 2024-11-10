import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserModel as User } from './interfaces/user.model';
import { users } from 'src/constants';

@Injectable()
export class UsersService {
  findAll(): User[] {
    return users.map((user) => ({ ...user, password: undefined }));
  }

  findById(id: string): User {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return { ...user, password: undefined };
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = new User(createUserDto.login, createUserDto.password);
    users.push(newUser);
    return { ...newUser, password: undefined };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = users.find((user) => user.id === id);
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
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException();
    }
    users.splice(userIndex, 1);
  }
}
