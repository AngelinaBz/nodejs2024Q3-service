import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Track } from './tracks.interface';
import { v4 as uuidv4 } from 'uuid';

export class TrackModel implements Track {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;

  @IsNumber()
  duration: number;

  constructor(
    name: string,
    artistId: string | null = null,
    albumId: string | null = null,
    duration: number,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
