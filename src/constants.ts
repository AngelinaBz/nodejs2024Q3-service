import { UserModel } from './users/interfaces/user.model';
import { AlbumModel } from './albums/interfaces/albums.model';
import { ArtistModel } from './artists/interfaces/artist.model';
import { TrackModel } from './tracks/interfaces/tracks.model';
import { FavoritesModel } from './favorites/interfaces/favorites.model';

export const users: UserModel[] = [];
export const albums: AlbumModel[] = [];
export const artists: ArtistModel[] = [];
export const tracks: TrackModel[] = [];
export const favorites: FavoritesModel = new FavoritesModel();
