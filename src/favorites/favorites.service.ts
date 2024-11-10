import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albums, tracks, artists, favorites } from 'src/constants';

@Injectable()
export class FavoritesService {
  findAll() {
    return {
      artists: favorites.artists
        .map((id) => artists.find((artist) => artist.id === id))
        .filter(Boolean),
      albums: favorites.albums
        .map((id) => albums.find((album) => album.id === id))
        .filter(Boolean),
      tracks: favorites.tracks
        .map((id) => tracks.find((track) => track.id === id))
        .filter(Boolean),
    };
  }

  addTrackToFavorites(id: string): string {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException();
    }

    if (!favorites.tracks.includes(id)) {
      favorites.tracks.push(id);
      return 'Track added to favorites.';
    }
  }

  deleteTrackFromFavorites(id: string): void {
    const trackIndex = favorites.tracks.findIndex((track) => track === id);
    if (trackIndex === -1) {
      throw new NotFoundException();
    }
    favorites.tracks.splice(trackIndex, 1);
  }

  addAlbumToFavorites(id: string): string {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException();
    }

    if (!favorites.albums.includes(id)) {
      favorites.albums.push(id);
      return 'Album added to favorites.';
    }
  }

  deleteAlbumFromFavorites(id: string): void {
    const albumIndex = favorites.albums.findIndex((album) => album === id);
    if (albumIndex === -1) {
      throw new NotFoundException();
    }
    favorites.albums.splice(albumIndex, 1);
  }

  addArtistToFavorites(id: string): string {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException();
    }

    if (!favorites.artists.includes(id)) {
      favorites.artists.push(id);
      return 'Artist added to favorites.';
    }
  }

  deleteArtistFromFavorites(id: string): void {
    const artistIndex = favorites.artists.findIndex((artist) => artist === id);
    if (artistIndex === -1) {
      throw new NotFoundException();
    }
    favorites.artists.splice(artistIndex, 1);
  }
}