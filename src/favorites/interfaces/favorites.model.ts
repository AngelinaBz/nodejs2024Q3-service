import { IsUUID, IsArray } from 'class-validator';
import { Favorites } from './favorites.interface';

export class FavoritesModel implements Favorites {
  @IsUUID()
  @IsArray()
  artists: string[];

  @IsUUID()
  @IsArray()
  albums: string[];

  @IsUUID()
  @IsArray()
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
