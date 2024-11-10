import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.albumsService.findById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    this.albumsService.delete(id);
  }
}
