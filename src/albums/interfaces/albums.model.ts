import { IsUUID, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Album } from './albums.interface';
import { v4 as uuidv4 } from 'uuid';

export class AlbumModel implements Album {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsUUID()
  artistId: string | null;

  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
