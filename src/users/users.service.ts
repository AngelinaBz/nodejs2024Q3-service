import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserModel as User } from './interfaces/user.model';
import { users } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });
    const { password, ...user } = newUser;
    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userById = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userById) {
      throw new NotFoundException();
    }
    if (userById.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException();
    }
    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        updatedAt: Date.now(),
        version: userById.version + 1,
      },
    });
    const { password, ...user } = newUser;
    return user;
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
