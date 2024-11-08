import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsUUID()
  artistId: string | null;
}
