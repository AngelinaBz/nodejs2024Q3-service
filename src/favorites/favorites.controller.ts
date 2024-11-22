import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FavoritesService } from './favorites.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException();
    }
    this.favoritesService.deleteArtistFromFavorites(id);
  }
}
