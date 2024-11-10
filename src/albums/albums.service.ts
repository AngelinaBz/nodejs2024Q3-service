import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumModel as Album } from './interfaces/albums.model';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { albums, tracks, favorites } from 'src/constants';

@Injectable()
export class AlbumsService {
  findAll(): Album[] {
    return albums;
  }

  findById(id: string): Album {
    const album = albums.find((album) => album.id === id);
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
    albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    Object.assign(album, updateAlbumDto);
    return album;
  }

  delete(id: string): void {
    const albumIndex = albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException();
    }
    const relatedTracks = tracks.filter((track) => track.albumId === id);
    relatedTracks.forEach((track) => {
      track.albumId = null;
    });
    albums.splice(albumIndex, 1);
    const albumIndexInFavs = favorites.albums.findIndex(
      (album) => album === id,
    );
    favorites.albums.splice(albumIndexInFavs, 1);
  }
}
