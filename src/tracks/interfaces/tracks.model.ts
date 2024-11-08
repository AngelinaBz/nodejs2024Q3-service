import { IsUUID, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Track } from './tracks.interface';
import { v4 as uuidv4 } from 'uuid';

export class TrackModel implements Track {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsString()
  artistId: string | null;

  @IsUUID()
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;

  constructor(name: string, artistId: string | null, albumId: string | null, duration: number) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
