import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumModel as Album } from './interfaces/albums.model';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    Object.assign(album, updateAlbumDto);
    return album;
  }

  delete(id: string): void {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException();
    }
    this.albums.splice(albumIndex, 1);
  }
}
