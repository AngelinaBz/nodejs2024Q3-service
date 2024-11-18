import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistModel as Artist } from './interfaces/artist.model';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { artists, albums, tracks, favorites } from 'src/constants';

@Injectable()
export class ArtistsService {
  findAll(): Artist[] {
    return artists;
  }

  findById(id: string): Artist {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = new Artist(createArtistDto.name, createArtistDto.grammy);
    artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  delete(id: string): void {
    const artistIndex = artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException();
    }
    const relatedAlbums = albums.filter((album) => album.artistId === id);
    relatedAlbums.forEach((album) => {
      album.artistId = null;
    });
    const relatedTracks = tracks.filter((track) => track.artistId === id);
    relatedTracks.forEach((track) => {
      track.artistId = null;
    });
    artists.splice(artistIndex, 1);
    const artistIndexInFavs = favorites.artists.findIndex(
      (artist) => artist === id,
    );
    favorites.artists.splice(artistIndexInFavs, 1);
  }
}
