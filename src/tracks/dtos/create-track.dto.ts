import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTrackDto {
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
}
