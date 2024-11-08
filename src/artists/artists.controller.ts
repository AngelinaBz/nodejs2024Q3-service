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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.artistsService.findById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    this.artistsService.delete(id);
  }
}
