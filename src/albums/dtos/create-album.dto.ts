import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsUUID()
  artistId: string | null;
}
