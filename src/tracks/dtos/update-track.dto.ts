import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
