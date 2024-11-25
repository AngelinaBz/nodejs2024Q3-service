import { IsUUID, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Artist } from './artist.interface';
import { v4 as uuidv4 } from 'uuid';

export class ArtistModel implements Artist {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}
