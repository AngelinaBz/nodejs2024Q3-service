import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { isUUID } from 'class-validator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException();
    }
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (
      !isUUID(id) ||
      !updatePasswordDto.oldPassword ||
      !updatePasswordDto.newPassword
    ) {
      throw new BadRequestException();
    }
    return this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException();
    }
    this.usersService.delete(id);
  }
}
